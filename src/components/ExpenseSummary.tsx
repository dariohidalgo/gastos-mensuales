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
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

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
  paid?: boolean;
}

interface CreditCardExpense {
  id?: string;
  date: string;
  transactionDetail: string;
  amountInPesos: number;
  amountInDollars?: number;
  installments: number;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(amount);
};

const calculateTotalCreditByMonth = (
  creditCardExpenses: CreditCardExpense[],
  selectedMonth: number,
  selectedYear: number
): number => {
  const filteredCreditCardExpenses = creditCardExpenses.flatMap((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth() + 1;
    const expenseYear = expenseDate.getFullYear();
    const monthsSinceStart =
      (selectedYear - expenseYear) * 12 + (selectedMonth - (expenseMonth + 1));

    if (monthsSinceStart >= 0 && monthsSinceStart < expense.installments) {
      return expense.amountInPesos / expense.installments;
    }

    return 0;
  });

  return filteredCreditCardExpenses.reduce((acc, amount) => acc + amount, 0);
};

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

  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<string>("Ingresos");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [currentUserName, setCurrentUserName] = useState<string>("");

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
            amount: data.amount,
            type: data.type,
            category: data.category,
            description: data.description || "",
            installments: data.installments,
            createdAt,
            userName: data.userName || "",
            paid: data.paid || false,
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserName(user.displayName || "Usuario Actual");
      } else {
        setCurrentUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "expenses"), {
        amount: parseFloat(amount),
        type,
        category,
        description,
        createdAt: new Date(date),
        userName: currentUserName,
        installments: type === "Tarjeta de Credito" ? 1 : 0,
      });

      setAmount("");
      setType("Ingresos");
      setCategory("");
      setDescription("");
      setDate("");

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
    } catch (error) {
      console.error("Error al agregar el gasto: ", error);
    }
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

  const handleCheckboxChange = async (id: string, paid: boolean) => {
    try {
      const expenseRef = doc(db, "expenses", id);
      await updateDoc(expenseRef, { paid: !paid });
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === id ? { ...expense, paid: !paid } : expense
        )
      );
    } catch (error) {
      console.error("Error updating expense: ", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Formulario para agregar nuevos gastos */}
      <form onSubmit={handleAddExpense} className="row mb-4">
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Ingresos">Ingresos</option>
            <option value="Tarjeta de Credito">Tarjeta de Crédito</option>
            <option value="Gastos">Gastos</option>
          </select>
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-primary w-100 mt-2">
            Agregar
          </button>
        </div>
      </form>

      {/* Selector de mes */}
      <div className="text-center mb-4">
        <select
          className="form-select w-auto d-inline-block"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">Seleccionar mes</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Resumen de gastos */}
      <div className="row">
        <div className="col-md-4">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Total Ingresos</div>
            <div className="card-body">
              <h5 className="card-title">{formatCurrency(totalIncome)}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Total Gastos Fijos y Tarjeta</div>
            <div className="card-body">
              <h5 className="card-title">
                {formatCurrency(totalFixed + totalCredit)}
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Lo Que Queda</div>
            <div className="card-body">
              <h5 className="card-title">
                {formatCurrency(totalIncome - (totalFixed + totalCredit))}
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de gastos */}
      <div className="row ">
        <div className="col-md-12 bg-dark">
          <h4>Lista de Gastos</h4>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Tipo</th>
                <th>Categoría</th>
                <th>Pagado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.createdAt.toLocaleDateString()}</td>
                  <td>{expense.description}</td>
                  <td>{formatCurrency(expense.amount)}</td>
                  <td>{expense.type}</td>
                  <td>{expense.category}</td>
                  <td>
                    {expense.type !== "Ingresos" && (
                      <input
                        type="checkbox"
                        checked={!!expense.paid}
                        onChange={() =>
                          handleCheckboxChange(expense.id, !!expense.paid)
                        }
                      />
                    )}
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
      </div>
    </div>
  );
};

export default ExpenseSummary;
