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

interface Expense {
  id: string;
  amount: number;
  type: 'Gastos' | 'Ingresos';
  category: string;
  description: string;
  createdAt: Date;
  paid?: boolean;
  updatedAt?: Date;
  userName: string;
  installments?: number;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(amount);
};

interface ExpenseSummaryProps {
  creditCardTotals: Record<string, number>;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ creditCardTotals }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString().padStart(2, '0')
  );
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [totalFixed, setTotalFixed] = useState<number>(0);
  const [localCreditCardTotals, setLocalCreditCardTotals] = useState<Record<string, number>>(creditCardTotals);

  // Estados para los inputs
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<string>("Gastos"); // Inicializar con "Gastos" preseleccionado
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

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

    fetchExpenses();
  }, []);

  // Actualizar totales cuando cambian los gastos o el filtro de mes/año
  useEffect(() => {
    // Filtrar gastos por mes y año
    const filtered = expenses.filter((expense) => {
      const expenseMonth = (expense.createdAt.getMonth() + 1).toString().padStart(2, '0');
      const expenseYear = expense.createdAt.getFullYear();
      return (
        expenseMonth === selectedMonth &&
        expenseYear === selectedYear
      );
    });

    // Calcular totales de ingresos y gastos fijos
    const totalIncomeForMonth = filtered
      .filter((expense) => expense.type === "Ingresos")
      .reduce((acc, expense) => acc + expense.amount, 0);

    const totalFixedForMonth = filtered
      .filter((expense) => expense.type === "Gastos")
      .reduce((acc, expense) => acc + expense.amount, 0);

    // Actualizar totales de tarjetas
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const currentYear = new Date().getFullYear();
    
    // Solo mostrar totales si estamos en el mes actual
    let totalCreditForMonth = 0;
    const filteredCreditTotals: Record<string, number> = {};
    
    if (selectedMonth === currentMonth && selectedYear === currentYear) {
      // Si estamos en el mes actual, mostrar los totales disponibles
      Object.entries(creditCardTotals).forEach(([key, value]) => {
        filteredCreditTotals[key] = value;
        totalCreditForMonth += value;
      });
    }

    // Actualizar estados
    setFilteredExpenses(filtered);
    setTotalIncome(totalIncomeForMonth);
    setTotalFixed(totalFixedForMonth);
    setTotalCredit(totalCreditForMonth);
    setLocalCreditCardTotals(filteredCreditTotals);
  }, [selectedMonth, selectedYear, expenses, creditCardTotals]);

  // Cargar gastos al inicio
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

    fetchExpenses();
  }, []);

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
    const newMonth = e.target.value.padStart(2, '0');
    console.log('Cambiando a mes:', newMonth);
    setSelectedMonth(newMonth);
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
        installments: 0,
      });

      setAmount("");
      setType("Gastos");
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

    }
  };

  const handleEdit = (id: string) => {
    const expense = expenses.find((e) => e.id === id);
    if (expense) {
      setEditingExpenseId(id);
      setAmount(expense.amount?.toString() || '0');
      setType(expense.type || 'Gastos');
      setCategory(expense.category || '');
      setDescription(expense.description || '');
      // Convertir el timestamp a fecha
      const expenseDate = expense.createdAt instanceof Date 
        ? expense.createdAt 
        : new Date(expense.createdAt || new Date());
      setDate(expenseDate.toISOString().split('T')[0]);
    }
  };

  const handleSave = async () => {
    if (!editingExpenseId || !amount) return;

    try {
      const expenseRef = doc(db, "expenses", editingExpenseId);
      const updatedExpense = {
        amount: parseFloat(amount),
        type: type as 'Gastos' | 'Ingresos',
        category,
        description,
        createdAt: date ? new Date(date) : new Date(),
        updatedAt: new Date(),
      };

      await updateDoc(expenseRef, updatedExpense);

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === editingExpenseId
            ? {
                ...expense,
                amount: updatedExpense.amount,
                type: updatedExpense.type,
                category: updatedExpense.category,
                description: updatedExpense.description,
                createdAt: updatedExpense.createdAt,
                updatedAt: updatedExpense.updatedAt
              }
            : expense
        )
      );

      // Limpiar el estado de edición
      setEditingExpenseId(null);
      setAmount("");
      setType("Gastos");
      setCategory("");
      setDescription("");
      setDate("");
    } catch (error) {

    }
  };

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
    } catch (error) {

    }
  };


  return (
    <div className="container mt-4 expense-summary">
      {/* Formulario para agregar nuevos gastos */}
      <form
        onSubmit={handleAddExpense}
        className="row justify-content-center align-items-center m-3 form-responsive"
      >
        <div className="col-12 col-md-2 mb-3 mb-md-0">
          <input
            type="number"
            className="form-control"
            placeholder="Monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="col-12 col-md-2 mb-3 mb-md-0">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Gastos">Gastos</option>
            <option value="Ingresos">Ingresos</option>
          </select>
        </div>
        <div className="col-12 col-md-2 mb-3 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-3 mb-3 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-12 col-md-2 mb-3 mb-md-0">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="col-12 col-md-1 mb-3 mb-md-0">
          <button type="submit" className="btn btn-primary w-100">
            Agregar
          </button>
        </div>
      </form>

      {/* Selectores de mes y año */}
      <div className="text-center mb-4 d-flex justify-content-center gap-3">
        <select
          className="form-select w-auto d-inline-block"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, i) => {
            const monthNum = (i + 1).toString().padStart(2, '0');
            return (
              <option key={monthNum} value={monthNum}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            );
          })}
        </select>

        <select
          className="form-select w-auto d-inline-block"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={new Date().getFullYear() + i}>
              {new Date().getFullYear() + i}
            </option>
          ))}
        </select>
      </div>
     <div>
        </div>
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card text-white bg-success">
              <div className="card-header">Total Ingresos</div>
              <div className="card-body">
                <h5 className="card-title">{formatCurrency(totalIncome)}</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-white bg-primary">
              <div className="card-header">Total Gastos Fijos</div>
              <div className="card-body">
                <h5 className="card-title">{formatCurrency(totalFixed)}</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-white bg-danger">
              <div className="card-header">Total de Tarjeta de Crédito</div>
              <div className="card-body">
                <h5 className="card-title">{formatCurrency(totalCredit)}</h5>
                
             
                <div className="mt-1">
                {Object.entries(localCreditCardTotals)
  .filter(([key]) => key.startsWith(`${selectedYear}-${selectedMonth}`))
  .map(([card, total]) => {
    const cardName = card.split('-').slice(2).join('-'); // Elimina el prefijo de fecha
    return (
      <div key={card} className="d-flex justify-content-between align-items-center">
        <small>{cardName}:</small>
        <span>{formatCurrency(total)}</span>
      </div>
    );
  })}

                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-white bg-info">
              <div className="card-header">Lo Que Queda</div>
              <div className="card-body">
                <h5 className="card-title">
                  {formatCurrency(totalIncome - totalFixed - totalCredit)}
                </h5>
              </div>
            </div>
          </div>
        </div>
    

      {/* Lista de gastos */}
      <div className="row">
        <div className="col-md-12 ">
          <h4 className="text-center my-4">Lista de Gastos</h4>
          <div className="table-responsive table-mobile">
            <table className="table table-striped table-dark table-responsive-sm">
              <thead>
                <tr className="table-dark">
                  <th>Mes</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Tipo</th>
                  <th>Monto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>
                      {editingExpenseId === expense.id ? (
                        <input
                          type="date"
                          className="form-control form-control-sm"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      ) : (
                        new Date(expense.createdAt).toLocaleString("default", { month: "long" })
                      )}
                    </td>
                    <td>
                      {editingExpenseId === expense.id ? (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      ) : (
                        expense.description
                      )}
                    </td>
                    <td>
                      {editingExpenseId === expense.id ? (
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        />
                      ) : (
                        expense.category
                      )}
                    </td>
                    <td>
                      {editingExpenseId === expense.id ? (
                        <select
                          className="form-select form-select-sm"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="Gastos">Gastos</option>
                          <option value="Ingresos">Ingresos</option>
                        </select>
                      ) : (
                        expense.type
                      )}
                    </td>
                    <td>
                      {editingExpenseId === expense.id ? (
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      ) : (
                        formatCurrency(expense.amount)
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        {editingExpenseId === expense.id ? (
                          <>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={handleSave}
                            >
                              ✅
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setEditingExpenseId(null)}
                            >
                              ❌
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => handleEdit(expense.id)}
                            >
                              ✏️
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(expense.id)}
                            >
                              🗑️
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;
