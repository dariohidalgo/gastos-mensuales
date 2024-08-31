import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  DocumentData,
  Timestamp,
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

// Función para calcular el total de la tarjeta de crédito por mes
const calculateTotalCreditByMonth = (
  creditCardExpenses: CreditCardExpense[],
  selectedMonth: string,
  selectedYear: number
): number => {
  const filteredCreditCardExpenses = creditCardExpenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const expenseMonth = expenseDate.getMonth() + 1; // Obtener mes de 1-12
    const expenseYear = expenseDate.getFullYear();

    const monthsSinceExpense =
      (selectedYear - expenseYear) * 12 +
      (parseInt(selectedMonth) - expenseMonth);

    return monthsSinceExpense >= 0 && monthsSinceExpense < expense.installments;
  });

  const totalCreditForMonth = filteredCreditCardExpenses.reduce(
    (acc, expense) => acc + expense.amountInPesos / expense.installments,
    0
  );

  return totalCreditForMonth;
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

  // Estados para los nuevos gastos
  const [newExpenseType, setNewExpenseType] = useState<string>("Gastos");
  const [newExpenseCategory, setNewExpenseCategory] = useState<string>("");
  const [newExpenseAmount, setNewExpenseAmount] = useState<number>(0);
  const [newExpenseDescription, setNewExpenseDescription] =
    useState<string>("");

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
        const expenseMonth = expense.createdAt.getMonth() + 1; // Mes de 1-12
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
        selectedMonth,
        selectedYear
      );

      setFilteredExpenses(filtered);
      setTotalIncome(totalIncomeForMonth);
      setTotalCredit(totalCreditForMonth);
      setTotalFixed(totalFixedForMonth);
    } else {
      setFilteredExpenses(expenses);
      setTotalCredit(0); // Resetear si no hay mes seleccionado
    }
  }, [selectedMonth, selectedYear, expenses, creditCardExpenses]);

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newExpenseAmount <= 0 || newExpenseCategory === "") {
      alert("Por favor ingrese un monto y una categoría válidos.");
      return;
    }

    try {
      await addDoc(collection(db, "expenses"), {
        amount: newExpenseAmount,
        type: newExpenseType,
        category: newExpenseCategory,
        description: newExpenseDescription,
        createdAt: new Date(),
        userName: "Usuario Actual", // Reemplazar con el nombre de usuario actual si es necesario
      });

      setNewExpenseAmount(0);
      setNewExpenseCategory("");
      setNewExpenseDescription("");

      // Refetch expenses after adding new one
      const q = query(collection(db, "expenses"));
      const querySnapshot = await getDocs(q);
      const updatedExpenses: Expense[] = querySnapshot.docs.map(
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
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error("Error al agregar el gasto: ", error);
    }
  };

  // **Función para eliminar un gasto**
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este gasto?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "expenses", id));
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
      setFilteredExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el documento: ", error);
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
              <p className="card-text">${totalIncome.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Deuda total de tarjeta de crédito</h5>
              <p className="card-text">${totalCredit.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Gastos fijos totales</h5>
              <p className="card-text">${totalFixed.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Monto restante</h5>
              <p className="card-text">
                ${(totalIncome - totalCredit - totalFixed).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario para agregar nuevos gastos */}
      <form onSubmit={handleAddExpense} className="mb-4">
        <div className="row">
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Monto"
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(parseFloat(e.target.value))}
              required
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={newExpenseType}
              onChange={(e) => setNewExpenseType(e.target.value)}
              required
            >
              <option value="Gastos">Gastos</option>
              <option value="Ingresos">Ingresos</option>
              <option value="Tarjeta de Credito">Tarjeta de Crédito</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Categoría"
              value={newExpenseCategory}
              onChange={(e) => setNewExpenseCategory(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Descripción (opcional)"
              value={newExpenseDescription}
              onChange={(e) => setNewExpenseDescription(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" type="submit">
              Agregar Gasto
            </button>
          </div>
        </div>
      </form>

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
              <td>${expense.amount.toFixed(2)}</td>
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
