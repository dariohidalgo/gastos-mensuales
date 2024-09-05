import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
}

const CreditCardExpenseForm: React.FC<CreditCardExpenseFormProps> = ({
  onTotalsUpdate,
}) => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>("");
  const [transactionDetail, setTransactionDetail] = useState<string>("");
  const [amountInPesos, setAmountInPesos] = useState<string>("");
  const [amountInDollars, setAmountInDollars] = useState<string>("");
  const [installments, setInstallments] = useState<number>(1);

  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [monthFilter, setMonthFilter] = useState<number>(currentMonthIndex + 1);
  const [yearFilter, setYearFilter] = useState<number>(currentYear);

  const [expenses, setExpenses] = useState<CreditCardExpense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<CreditCardExpense[]>(
    []
  );

  useEffect(() => {
    const fetchExpenses = async () => {
      const q = query(collection(db, "creditCardExpenses"));
      const querySnapshot = await getDocs(q);

      const expensesData: CreditCardExpense[] = querySnapshot.docs.map(
        (doc) => {
          const data = doc.data() as CreditCardExpense;
          return {
            id: doc.id,
            ...data,
          };
        }
      );

      setExpenses(expensesData);
      setFilteredExpenses(expensesData);
    };

    fetchExpenses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
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

      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      setFilteredExpenses((prevFiltered) => [...prevFiltered, newExpense]);

      setDate("");
      setTransactionDetail("");
      setAmountInPesos("");
      setAmountInDollars("");
      setInstallments(1);
    } catch (error) {
      console.error("Error al agregar el gasto: ", error);
    }
  };

  useEffect(() => {
    if (monthFilter && yearFilter) {
      const filtered = expenses.flatMap((expense) => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = expenseDate.getMonth() + 1;
        const expenseYear = expenseDate.getFullYear();

        const selectedMonthIndex = monthFilter;
        const selectedYear = yearFilter;

        if (isNaN(selectedMonthIndex) || isNaN(expenseMonth)) {
          console.error("Error: Mes seleccionado o índice de mes es NaN");
          return [];
        }

        const monthsSinceStart =
          (selectedYear - expenseYear) * 12 +
          (selectedMonthIndex - (expenseMonth + 1));

        if (monthsSinceStart >= 0 && monthsSinceStart < expense.installments) {
          const remainingInstallments = expense.installments - monthsSinceStart;
          return {
            ...expense,
            remainingInstallments,
          };
        } else {
          return [];
        }
      });

      setFilteredExpenses(filtered);
    } else {
      setFilteredExpenses(expenses);
    }

    const monthlyTotals: Record<string, number> = {};
    expenses.forEach((expense) => {
      const expenseDate = new Date(expense.date);
      const amountPerInstallment = expense.amountInPesos / expense.installments;

      for (let i = 0; i < expense.installments; i++) {
        const currentInstallmentMonth = (expenseDate.getMonth() + i + 1) % 12;
        const currentInstallmentYear =
          expenseDate.getFullYear() +
          Math.floor((expenseDate.getMonth() + i + 1) / 12);

        const monthYear = `${currentInstallmentYear}-${(
          currentInstallmentMonth || 12
        )
          .toString()
          .padStart(2, "0")}`;

        if (!monthlyTotals[monthYear]) {
          monthlyTotals[monthYear] = 0;
        }
        monthlyTotals[monthYear] += amountPerInstallment;
      }
    });

    onTotalsUpdate(monthlyTotals);
  }, [monthFilter, yearFilter, expenses]);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;

    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este gasto?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "creditCardExpenses", id));
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
      setFilteredExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el gasto: ", error);
    }
  };

  // Calcular total para el mes filtrado
  const totalForMonth = filteredExpenses.reduce(
    (acc, expense) => acc + expense.amountInPesos / expense.installments,
    0
  );

  return (
    <div className="container">
      <form
        className="row justify-content-center align-items-center m-3"
        onSubmit={handleSubmit}
      >
        <div className="col-md-2">
          <label className="mb-2" htmlFor="date">
            Fecha:
          </label>
          <input
            className="form-control"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="mb-2" htmlFor="transactionDetail">
            Detalle de Transacción:
          </label>
          <input
            className="form-control"
            type="text"
            id="transactionDetail"
            placeholder="Detalle"
            value={transactionDetail}
            onChange={(e) => setTransactionDetail(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label className="mb-2" htmlFor="amountInPesos">
            Monto en Pesos:
          </label>
          <input
            className="form-control"
            type="number"
            id="amountInPesos"
            placeholder="Pesos"
            value={amountInPesos}
            onChange={(e) => setAmountInPesos(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label className="mb-2" htmlFor="amountInDollars">
            Monto en Dólares:
          </label>
          <input
            className="form-control"
            type="number"
            id="amountInDollars"
            placeholder="Dólares"
            value={amountInDollars}
            onChange={(e) => setAmountInDollars(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <label className="mb-2" htmlFor="installments">
            Cuotas:
          </label>
          <input
            className="form-control"
            type="number"
            id="installments"
            min="1"
            value={installments}
            onChange={(e) => setInstallments(parseInt(e.target.value))}
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
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/expenses")}
          >
            Volver
          </button>
        </div>
      </form>

      {/* Filtro de Mes y Año */}
      <div className="row mb-4 d-flex justify-content-center">
        <div className="col-md-2 text-center">
          <label htmlFor="monthFilter" className="form-label">
            Filtrar por mes:
          </label>
          <select
            id="monthFilter"
            className="form-select"
            value={monthFilter}
            onChange={(e) => setMonthFilter(parseInt(e.target.value))}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("es-ES", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2 text-center">
          <label htmlFor="yearFilter" className="form-label">
            Filtrar por año:
          </label>
          <select
            id="yearFilter"
            className="form-select"
            value={yearFilter}
            onChange={(e) => setYearFilter(parseInt(e.target.value))}
          >
            <option value={currentYear}>{currentYear}</option>
            <option value={currentYear + 1}>{currentYear + 1}</option>
          </select>
        </div>
      </div>

      {/* Tabla de gastos */}
      <h3 className="mb-3">
        Gastos de Tarjeta de Crédito -{" "}
        {new Date(0, monthFilter - 1).toLocaleString("es-ES", {
          month: "long",
        })}{" "}
        {yearFilter}
      </h3>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Detalle</th>
            <th>Monto (Pesos)</th>
            <th>Monto (Dólares)</th>
            <th>Cuotas Restantes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => {
            const amountPerInstallment =
              expense.amountInPesos / expense.installments;
            const amountPerInstallmentDollar = expense.amountInDollars
              ? expense.amountInDollars / expense.installments
              : 0;

            return (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.transactionDetail}</td>
                <td>${amountPerInstallment.toFixed(2)}</td>
                <td>${amountPerInstallmentDollar.toFixed(2)}</td>
                <td>{expense.installments}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(expense.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mostrar total para el mes seleccionado */}
      <div className="d-flex justify-content-end">
        <h4>
          Total a pagar en{" "}
          {new Date(0, monthFilter - 1).toLocaleString("es-ES", {
            month: "long",
          })}{" "}
          {yearFilter}: ${totalForMonth.toFixed(2)}
        </h4>
      </div>
    </div>
  );
};

export default CreditCardExpenseForm;
