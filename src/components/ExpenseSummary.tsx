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

  // Estados para los inputs
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
            userName: data.userName || "", // Asegúrate de incluir userName
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
        userName: currentUserName, // Usa el nombre del usuario actual
        installments: type === "Tarjeta de Credito" ? 1 : 0,
      });

      // Limpiar los inputs después de agregar el gasto
      setAmount("");
      setType("Ingresos");
      setCategory("");
      setDescription("");
      setDate("");

      // Actualizar la lista de gastos después de agregar un nuevo gasto
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
            required
          />
        </div>
        <div className="col-md-2">
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
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary">
            Agregar Gasto
          </button>
        </div>
      </form>

      {/* Select para filtrar por mes */}
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

      {/* Resumen de gastos */}
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

      {/* Tabla de transacciones */}
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
              <td>
                {expense.userName ? expense.userName : "Usuario Desconocido"}
              </td>
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
