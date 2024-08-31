import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  DocumentData,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Interfaz para los gastos
interface Expense {
  id: string;
  amount: number;
  type: string;
  category: string;
  description?: string;
  installments: number;
  createdAt: Date;
  userName: string;
}

interface CreditCardExpense {
  id?: string;
  date: string;
  transactionDetail: string;
  amountInPesos: number;
  amountInDollars?: number;
  installments: number;
}

// **Revisión de la función de cálculo**
const calculateTotalCreditByMonth = (
  creditCardExpenses: CreditCardExpense[],
  selectedMonth: number,
  selectedYear: number
): number => {
  // Filtrar gastos de tarjeta de crédito según el mes y año seleccionados
  const filteredCreditCardExpenses = creditCardExpenses.flatMap((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth() + 1;
    const expenseYear = expenseDate.getFullYear();

    // Calcular las cuotas que pertenecen al mes seleccionado
    const monthsSinceStart =
      (selectedYear - expenseYear) * 12 + (selectedMonth - (expenseMonth + 1));

    if (monthsSinceStart >= 0 && monthsSinceStart < expense.installments) {
      return expense.amountInPesos / expense.installments;
    }

    return 0;
  });

  // Sumar todos los gastos filtrados para el mes seleccionado
  return filteredCreditCardExpenses.reduce((acc, amount) => acc + amount, 0);
};

// Componente principal
const ExpenseSummary: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [creditCardExpenses, setCreditCardExpenses] = useState<
    CreditCardExpense[]
  >([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [totalFixed, setTotalFixed] = useState<number>(0);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const fetchExpenses = async () => {
      const q = query(collection(db, "expenses"));
      const querySnapshot = await getDocs(q);

      const expensesData: Expense[] = querySnapshot.docs.map(
        (doc: DocumentData) => {
          const data = doc.data() as Omit<Expense, "id" | "createdAt"> & {
            createdAt: Timestamp;
          };
          const createdAt =
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : new Date();
          return {
            id: doc.id,
            ...data,
            createdAt,
          };
        }
      );

      setExpenses(expensesData);
    };

    const fetchCreditCardExpenses = async () => {
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

      setCreditCardExpenses(expensesData);
    };

    fetchExpenses();
    fetchCreditCardExpenses();
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const filtered = expenses.filter((expense) => {
        const expenseMonth = expense.createdAt.getMonth() + 1;
        const expenseYear = expense.createdAt.getFullYear();
        return (
          expenseMonth === parseInt(selectedMonth) &&
          expenseYear === new Date().getFullYear()
        );
      });

      const totalIncomeForMonth = filtered
        .filter((expense) => expense.type === "Ingresos")
        .reduce((acc, expense) => acc + expense.amount, 0);

      const totalFixedForMonth = filtered
        .filter((expense) => expense.type === "Gastos")
        .reduce((acc, expense) => acc + expense.amount, 0);

      // Ajuste para el cálculo del total del crédito
      const totalCreditForMonth = calculateTotalCreditByMonth(
        creditCardExpenses,
        parseInt(selectedMonth),
        selectedYear
      );

      setFilteredExpenses(filtered);
      setTotalIncome(totalIncomeForMonth);
      setTotalCredit(totalCreditForMonth);
      setTotalFixed(totalFixedForMonth);
    } else {
      setFilteredExpenses(expenses);
    }
  }, [selectedMonth, selectedYear, expenses, creditCardExpenses]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "expenses", id));
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4 d-flex justify-content-center">
        <div className="col-md-3 text-center">
          <label htmlFor="monthFilter" className="form-label">
            Filtrar por mes:
          </label>
          <select
            id="monthFilter"
            className="form-select"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="">Todos los meses</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total de Ingresos</h5>
              <p className="card-text">
                ${totalIncome.toLocaleString("es-ES")}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Deuda total de tarjeta de crédito</h5>
              <p className="card-text">
                ${totalCredit.toLocaleString("es-ES")}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gastos fijos totales</h5>
              <p className="card-text">${totalFixed.toLocaleString("es-ES")}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Monto restante</h5>
              <p className="card-text">
                $
                {(totalIncome - totalCredit - totalFixed).toLocaleString(
                  "es-ES"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="mb-3">Todas las transacciones:</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Cuotas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense, index) => (
            <tr key={index}>
              <td>
                {expense.type === "Tarjeta de Credito"
                  ? "Tarjeta de crédito"
                  : expense.type === "Gastos"
                  ? "Gasto"
                  : "Ingreso"}
              </td>
              <td>${expense.amount.toLocaleString("es-ES")}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>{expense.createdAt.toLocaleDateString()}</td>
              <td>{expense.userName}</td>
              <td>
                {expense.type === "Tarjeta de Credito"
                  ? expense.installments
                  : "-"}
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(expense.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseSummary;
