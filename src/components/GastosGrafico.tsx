import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
  amount: number;
  category: string;
  createdAt: Date;
}

const GastosGrafico: React.FC = () => {
  const currentMonth = (new Date().getMonth() + 1).toString();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpenses = async () => {
      const q = query(collection(db, "expenses"));
      const querySnapshot = await getDocs(q);

      const expensesData: Expense[] = querySnapshot.docs.map(
        (doc: DocumentData) => {
          const data = doc.data() as Omit<Expense, "createdAt"> & {
            createdAt: Timestamp;
          };
          const createdAt =
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate()
              : new Date();
          return {
            amount: data.amount,
            category: data.category,
            createdAt,
          };
        }
      );

      setExpenses(expensesData);
    };

    fetchExpenses();
  }, []);

  // Filtrar los gastos por mes seleccionado y excluir las categorías que contienen "ingresos" o "sueldo"
  const filteredExpenses = expenses.filter((expense) => {
    const expenseMonth = expense.createdAt.getMonth() + 1;
    return (
      expenseMonth === parseInt(selectedMonth) &&
      !expense.category.toLowerCase().includes("ingresos") &&
      !expense.category.toLowerCase().includes("sueldo")
    );
  });

  const categories = [
    ...new Set(filteredExpenses.map((expense) => expense.category)),
  ];
  const categorySums = categories.map((category) =>
    filteredExpenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Gastos por Categoría",
        data: categorySums,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Esto permite que el gráfico se ajuste a diferentes tamaños
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  // Función para el botón de "Volver"
  const handleBackClick = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Resumen de Gastos por Categoría</h2>

      <div className="text-center mb-4">
        <select
          className="form-select w-auto d-inline-block mt-4"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-12" style={{ height: "500px" }}>
          <Pie data={data} options={options} />
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleBackClick}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default GastosGrafico;
