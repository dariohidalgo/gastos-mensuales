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

interface CreditCardExpenseFormProps {
  onTotalsUpdate: (totals: Record<string, number>) => void;
}

interface CreditCardExpense {
  id?: string;
  date: string;
  transactionDetail: string;
  amountInPesos: number;
  amountInDollars?: number;
  installments: number;
  remainingInstallments?: number;
  isSelected?: boolean;
}

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
  ({ onTotalsUpdate }) => {
    const navigate = useNavigate();
    const today = new Date();

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
      onTotalsUpdate(totals);
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
    // Aseguramos que totalForMonth esté disponible como prop
    return (
      <div className="container credit-card-expense-form">
        {/* ---------------  Formulario alta --------------- */}
        <form
          className="row justify-content-center align-items-center m-3 form-responsive"
          onSubmit={handleSubmit}
        >
          {/* ... inputs clásicos ... */}
          <div className="col-md-2">
            <label className="mb-2" htmlFor="date">
              Fecha:
            </label>
            <input
              id="date"
              className="form-control"
              type="date"
              value={formState.date}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="mb-2" htmlFor="transactionDetail">
              Detalle:
            </label>
            <input
              id="transactionDetail"
              className="form-control"
              value={formState.transactionDetail}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="mb-2" htmlFor="amountInPesos">
              Pesos:
            </label>
            <input
              id="amountInPesos"
              className="form-control"
              type="number"
              value={formState.amountInPesos}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="mb-2" htmlFor="amountInDollars">
              Dólares:
            </label>
            <input
              id="amountInDollars"
              className="form-control"
              type="number"
              value={formState.amountInDollars}
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-2">
            <label className="mb-2" htmlFor="installments">
              Cuotas:
            </label>
            <input
              id="installments"
              className="form-control"
              type="number"
              min={1}
              value={formState.installments}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-2 d-flex justify-content-center mt-3">
            <button className="btn btn-success btn-lg" type="submit">
              Enviar
            </button>
          </div>
          <div className="col-md-2 d-flex justify-content-center mt-3">
            <button
              className="btn btn-warning btn-lg"
              type="button"
              onClick={handleSync}
              disabled={loadingSync}
            >
              {loadingSync ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sincronizando…
                </>
              ) : (
                "Forzar desde Gmail"
              )}
            </button>
          </div>

          <div className="col-md-2 d-flex justify-content-center mt-3">
            <button
              className="btn btn-primary btn-lg"
              type="button"
              onClick={() => navigate("/expenses")}
            >
              Volver
            </button>
          </div>
        </form>

        {/* ---------------  Filtros --------------- */}
        <div className="row mb-4 justify-content-center">
          <div className="col-md-2 text-center">
            <label htmlFor="month" className="form-label">
              Mes:
            </label>
            <select
              id="month"
              className="form-select"
              value={monthFilter}
              onChange={(e) => setMonthFilter(parseInt(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("es-ES", { month: "long" })}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2 text-center">
            <label htmlFor="year" className="form-label">
              Año:
            </label>
            <select
              id="year"
              className="form-select"
              value={yearFilter}
              onChange={(e) => setYearFilter(parseInt(e.target.value))}
            >
              <option value={today.getFullYear()}>{today.getFullYear()}</option>
              <option value={today.getFullYear() + 1}>
                {today.getFullYear() + 1}
              </option>
            </select>
          </div>

          <div className="col-md-3 text-center">
            <label htmlFor="search" className="form-label">
              Buscar:
            </label>
            <input
              id="search"
              type="text"
              className="form-control"
              placeholder="Buscar por detalle"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* ---------------  Tabla --------------- */}

        <div className="d-flex justify-content-center align-items-center mb-3 gap-5">
          <h3 className="mb-0">
            Gastos de Tarjeta de Crédito -{" "}
            {new Date(0, monthFilter - 1).toLocaleString("es-ES", {
              month: "long",
            })}{" "}
            {yearFilter}
          </h3>
          {selectedExpenses.length > 0 && (
            <button className="btn btn-danger " onClick={handleMultiDelete}>
              Eliminar {selectedExpenses.length} Seleccionados
            </button>
          )}
        </div>

        <table className="table table-striped table-dark table-responsive-sm">
          <thead>
            <tr className="table-dark">
              <th>
                <input
                  type="checkbox"
                  checked={selectedExpenses.length === filteredExpenses.length}
                  onChange={handleSelectAllExpenses}
                />
              </th>
              <th>Detalle</th>
              <th className="d-none d-md-table-cell">Fecha</th>
              <th>Monto (ARS)</th>
              <th className="d-none d-md-table-cell">Monto (USD)</th>
              <th>Cuotas Restantes</th>
            </tr>
          </thead>
          <tbody>
            {searchedExpenses.map((e) => {
              const perInstall = e.amountInPesos / e.installments;
              const perInstallUsd = e.amountInDollars
                ? e.amountInDollars / e.installments
                : 0;

              const remainingText =
                e.remainingInstallments === 1
                  ? "1 última cuota"
                  : e.remainingInstallments ?? e.installments;

              return (
                <tr key={e.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedExpenses.includes(e.id!)}
                      onChange={() => handleSelectExpense(e.id!)}
                    />
                  </td>
                  <td>{e.date}</td>
                  <td>{e.transactionDetail}</td>
                  <td>${perInstall.toFixed(2)}</td>
                  <td>${perInstallUsd.toFixed(2)}</td>
                  <td>{remainingText}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(e.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7} className="p-3">
                <h4 className="mb-3">Totales por Tarjeta</h4>
                <div className="row">
                  {Object.entries(creditCardTotals).map(([card, total]) => (
                    <div key={card} className="col-md-3 mb-3">
                      <div className="card bg-dark text-white">
                        <div className="card-body">
                          <h5 className="card-title">{card}</h5>
                          <p className="card-text mb-0">
                            {new Intl.NumberFormat('es-AR', {
                              style: 'currency',
                              currency: 'ARS'
                            }).format(total)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

        {/* ---------------  Total mes --------------- */}
        {/* <div className="d-flex justify-content-center">
          <h4>
            Total a pagar en{" "}
            {new Date(0, monthFilter - 1).toLocaleString("es-ES", {
              month: "long",
            })}{" "}
            {yearFilter}: ${totalForMonth.toFixed(2)}
          </h4>
        </div> */}
      </div>
    );
  }
);

export default CreditCardExpenseForm;
