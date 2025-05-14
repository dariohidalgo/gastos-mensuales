import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  doc,
  writeBatch,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import dayjs from "dayjs";

import { CreditCardExpense } from "../types/types";

interface CreditCardExpenseFormProps {}

interface ExpenseFormState {
  date: string;
  transactionDetail: string;
  amountInPesos: string;
  amountInDollars: string;
  installments: number;
}

const firstInstallmentDate = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

const CreditCardExpenseForm: React.FC<CreditCardExpenseFormProps> = React.memo(
  () => {
    const navigate = useNavigate();
    const today = new Date();
    const isDarkMode = document.body.classList.contains('dark-mode');

    const [formState, setFormState] = useState<ExpenseFormState>({
      date: "",
      transactionDetail: "",
      amountInPesos: "",
      amountInDollars: "",
      installments: 1,
    });

    const [monthFilter, setMonthFilter] = useState(today.getMonth() + 1);
    const [yearFilter, setYearFilter] = useState(today.getFullYear());
    const [expenses, setExpenses] = useState<CreditCardExpense[]>([]);
    const [filteredExpenses, setFilteredExpenses] = useState<CreditCardExpense[]>(
      []
    );
    const [creditCardTotals, setCreditCardTotals] = useState<Record<string, number>>({});
    const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loadingSync, setLoadingSync] = useState(false);

    const fetchExpenses = useCallback(async () => {
      try {
        const q = query(collection(db, "creditCardExpenses"));
        const snap = await getDocs(q);

        const data: CreditCardExpense[] = snap.docs.map(
          (d: QueryDocumentSnapshot) => ({
            id: d.id,
            ...(d.data() as Omit<CreditCardExpense, "id">),
          })
        );

        setExpenses(data);
        setFilteredExpenses(data);
      } catch (error) {

      }
    }, []);

    useEffect(() => {
      fetchExpenses();
    }, [fetchExpenses]);

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const {
            date,
            transactionDetail,
            amountInPesos,
            amountInDollars,
            installments,
          } = formState;

          const docRef = await addDoc(collection(db, "creditCardExpenses"), {
            date,
            transactionDetail,
            amountInPesos: parseFloat(amountInPesos),
            amountInDollars: parseFloat(amountInDollars) || 0,
            installments,
          });

          const newExpense: CreditCardExpense = {
            id: docRef.id,
            date,
            transactionDetail,
            amountInPesos: parseFloat(amountInPesos),
            amountInDollars: parseFloat(amountInDollars) || 0,
            installments,
          };

          setExpenses((prev) => [...prev, newExpense]);
          setFormState({
            date: "",
            transactionDetail: "",
            amountInPesos: "",
            amountInDollars: "",
            installments: 1,
          });
        } catch (err) {

        }
      },
      [formState]
    );

    const handleSync = useCallback(async () => {
      setLoadingSync(true);
      try {
        const res = await fetch(
          "https://us-central1-gastos-66dbe.cloudfunctions.net/syncCreditCardEmailsHTTP"
        );
        alert(await res.text());
      } catch (err) {
        alert("Error al sincronizar: " + err);
      } finally {
        setLoadingSync(false);
      }
    }, []);

    const searchedExpenses = useMemo(() => {
      return filteredExpenses.filter(
        (exp) =>
          typeof exp?.transactionDetail === "string" &&
          exp.transactionDetail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [filteredExpenses, searchTerm]);

    useEffect(() => {
      const filtered = expenses.flatMap((exp) => {
        const parsedDate = dayjs(exp.date);

        if (!parsedDate.isValid()) {
          return [];
        }

        const start = firstInstallmentDate(parsedDate.toDate());
        const monthsSinceStart =
          (yearFilter - start.getFullYear()) * 12 +
          (monthFilter - (start.getMonth() + 1));

        if (monthsSinceStart >= 0 && monthsSinceStart < exp.installments) {
          return {
            ...exp,
            remainingInstallments: exp.installments - monthsSinceStart,
          };
        }
        return [];
      });

      setFilteredExpenses(filtered);
    }, [expenses, yearFilter, monthFilter]);

    // Calcular totales cuando cambian los gastos filtrados
    useEffect(() => {
      if (!filteredExpenses.length) return;

      const totals: Record<string, number> = {};
      
      filteredExpenses.forEach((exp) => {
        if (!exp?.transactionDetail) return;

        // Extraer el tipo de tarjeta del detalle
        const detail = exp.transactionDetail.toUpperCase();
        let creditCard = 'OTRA';

        if (detail.includes('VISA')) creditCard = 'VISA';
        else if (detail.includes('MASTER')) creditCard = 'MASTERCARD';
        else if (detail.includes('AMEX') || detail.includes('AMERICAN')) creditCard = 'AMEX';
        
        const perInstall = exp.amountInPesos / exp.installments;
        totals[creditCard] = (totals[creditCard] || 0) + perInstall;
      });

      // Actualizar estados y guardar
      setCreditCardTotals(totals);

      localStorage.setItem("creditCardTotals", JSON.stringify(totals));
    }, [filteredExpenses]);

    /* ─────────────   Eliminar gasto ───────────── */
    const handleDelete = async (id?: string) => {
      if (!id) return;
      if (!window.confirm("¿Eliminar este gasto?")) return;

      try {
        await deleteDoc(doc(db, "creditCardExpenses", id));
        setExpenses((prev) => prev.filter((e) => e.id !== id));
      } catch (err) {

      }
    };

    const handleMultiDelete = async () => {
      if (selectedExpenses.length === 0) return;

      const confirmDelete = window.confirm(
        `¿Estás seguro de eliminar ${selectedExpenses.length} gasto(s) de tarjeta de crédito?`
      );
      if (!confirmDelete) return;

      try {
        const batch = writeBatch(db);
        selectedExpenses.forEach((id) => {
          const docRef = doc(db, "creditCardExpenses", id);
          batch.delete(docRef);
        });

        await batch.commit();

        // Eliminar gastos seleccionados del estado
        setExpenses((prev) =>
          prev.filter((e) => !selectedExpenses.includes(e.id!))
        );

        // Limpiar selección
        setSelectedExpenses([]);
      } catch (error) {

      }
    };

    const handleSelectAllExpenses = () => {
      if (selectedExpenses.length === filteredExpenses.length) {
        // Si todos están seleccionados, deseleccionar todos
        setSelectedExpenses([]);
      } else {
        // Seleccionar todos los IDs de gastos
        setSelectedExpenses(filteredExpenses.map((e) => e.id!));
      }
    };

    const handleSelectExpense = (id: string) => {
      setSelectedExpenses((prev) =>
        prev.includes(id)
          ? prev.filter((selectedId) => selectedId !== id)
          : [...prev, id]
      );
    };

    /* ─────────────   Manejadores de cambio de formulario ───────────── */
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [id]: id === "installments" ? parseInt(value) : value,
      }));
    };

    /* ─────────────   Cálculo total para vista ───────────── */
    // const totalForMonth = searchedExpenses.reduce(
    //   (sum, e) => sum + e.amountInPesos / e.installments,
    //   0
    // );

    /* ────────────────────  Render  ──────────────────── */
    return (
      <div className={`container credit-card-expense-form ${isDarkMode ? 'dark-mode' : ''}`}>
        {/* ---------------  Formulario alta --------------- */}
        <form
  onSubmit={handleSubmit}
  className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl my-6"
>
  <div className="col-span-1">
    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      Fecha
    </label>
    <input
      id="date"
      type="date"
      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      value={formState.date}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="col-span-2">
    <label htmlFor="transactionDetail" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      Detalle
    </label>
    <input
      id="transactionDetail"
      type="text"
      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      value={formState.transactionDetail}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="col-span-1">
    <label htmlFor="amountInPesos" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      Pesos
    </label>
    <input
      id="amountInPesos"
      type="number"
      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      value={formState.amountInPesos}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="col-span-1">
    <label htmlFor="amountInDollars" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      Dólares
    </label>
    <input
      id="amountInDollars"
      type="number"
      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      value={formState.amountInDollars}
      onChange={handleInputChange}
    />
  </div>

  <div className="col-span-1 ">
    <label htmlFor="installments" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
      Cuotas
    </label>
    <input
      id="installments"
      type="number"
      min={1}
      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      value={formState.installments}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="w-full max-w-6xl mx-auto">
      <div className="w-full flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition"
        >
          Agregar
        </button>

        <button
          type="button"
          className={`bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition ${loadingSync ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={handleSync}
          disabled={loadingSync}
        >
          {loadingSync ? 'Sincronizando…' : 'Sincronizar Gmail'}
        </button>

        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition"
          onClick={() => navigate("/expenses")}
        >
          Volver
        </button>
      </div>
    </div>

</form>


        {/* ---------------  Filtros --------------- */}
        <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

    {/* Mes */}
    <div>
      <label htmlFor="month" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Mes</label>
      <select
        id="month"
        value={monthFilter}
        onChange={(e) => setMonthFilter(parseInt(e.target.value))}
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("es-ES", { month: "long" })}
          </option>
        ))}
      </select>
    </div>

    {/* Año */}
    <div>
      <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Año</label>
      <select
        id="year"
        value={yearFilter}
        onChange={(e) => setYearFilter(parseInt(e.target.value))}
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      >
        <option value={today.getFullYear()}>{today.getFullYear()}</option>
        <option value={today.getFullYear() + 1}>{today.getFullYear() + 1}</option>
      </select>
    </div>

    {/* Buscar */}
    <div>
      <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Buscar</label>
      <input
        id="search"
        type="text"
        placeholder="Buscar por detalle"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      />
    </div>

  </div>
</div>


        {/* ---------------  Tabla --------------- */}
        <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6 overflow-x-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
  <div>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
      Gastos de Tarjeta de Crédito -{" "}
      {new Date(0, monthFilter - 1).toLocaleString("es-ES", { month: "long" })}{" "}
      {yearFilter}
    </h3>
    {selectedExpenses.length > 0 && (
      <button
        className="mt-2 lg:mt-0 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
        onClick={handleMultiDelete}
      >
        Eliminar {selectedExpenses.length} Seleccionado(s)
      </button>
    )}
  </div>

  {/* Totales compactos */}
  {Object.keys(creditCardTotals).length > 0 && (
    <div className="flex flex-wrap gap-2">
      {Object.entries(creditCardTotals).map(([card, total]) => (
        <div key={card} className="bg-gray-800 text-white px-4 py-2 rounded-md shadow text-sm">
          <div className="text-xs text-gray-300">{card}</div>
          <div className="text-green-400 font-semibold">
            {new Intl.NumberFormat('es-AR', {
              style: 'currency',
              currency: 'ARS',
            }).format(total)}
          </div>
        </div>
      ))}
    </div>
  )}
</div>


  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
    <thead className="bg-gray-100 dark:bg-gray-700">
      <tr>
        <th className="px-4 py-2">
          <input
            type="checkbox"
            checked={selectedExpenses.length === filteredExpenses.length}
            onChange={handleSelectAllExpenses}
          />
        </th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Detalle</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Fecha</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Monto (ARS)</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Monto (USD)</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Cuotas Restantes</th>
        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Acciones</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
      {searchedExpenses.map((e) => {
        const perInstall = e.amountInPesos / e.installments;
        const perInstallUsd = e.amountInDollars ? e.amountInDollars / e.installments : 0;
        const remainingText =
          e.remainingInstallments === 1
            ? "1 última cuota"
            : e.remainingInstallments ?? e.installments;

        return (
          <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <td className="px-4 py-2">
              <input
                type="checkbox"
                checked={selectedExpenses.includes(e.id!)}
                onChange={() => handleSelectExpense(e.id!)}
              />
            </td>
            <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{e.transactionDetail}</td>
            <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{e.date}</td>
            <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">${perInstall.toFixed(2)}</td>
            <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">${perInstallUsd.toFixed(2)}</td>
            <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">{remainingText}</td>
            <td className="px-4 py-2">
              <button
                className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-md transition"
                onClick={() => handleDelete(e.id)}
              >
                🗑️
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  
  </table>
</div>

      </div>
    );
  }
);

export default CreditCardExpenseForm;
