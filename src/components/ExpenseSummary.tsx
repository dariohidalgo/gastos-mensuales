import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  getDocs,

  Timestamp,
  deleteDoc,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
// import dayjs from 'dayjs'; // No parece estrictamente necesario si usamos Date nativo

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { useNavigate } from "react-router-dom";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

// --- Helper Function (copiada de CreditCardExpenseForm) ---
// Calcula la fecha de inicio de la primera cuota (1ro del mes siguiente a la compra)
const firstInstallmentDate = (date: Date): Date => {
  // Asegurarse que 'date' sea un objeto Date válido
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    // Retornar una fecha inválida o lanzar un error para manejarlo después
    return new Date(NaN);
  }
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
};

// Interfaz para Gastos Fijos / Ingresos
interface Expense {
  id: string;
  amount: number;
  type: 'Gastos' | 'Ingresos';
  category: string;
  description: string;
  createdAt: Date; // Fecha del Gasto/Ingreso Fijo
  paid?: boolean;
  updatedAt?: Date;
  userName: string;
  installments?: number; // Probablemente no aplica a gastos fijos/ingresos
}

// Interfaz para Gastos de Tarjeta de Crédito (basada en CreditCardExpenseForm)
interface CreditCardExpense {
  id: string;
  date: string | Date; // Fecha de COMPRA (puede ser string 'YYYY-MM-DD' o Date)
  transactionDetail: string;
  amountInPesos: number;
  amountInDollars?: number;
  installments: number; // Total de cuotas
  // No necesitamos remainingInstallments ni isSelected aquí
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Interfaces para los datos de los gráficos
interface ChartDataset {
  label?: string;
  data: number[];
  borderColor?: string;
  backgroundColor: string | string[];
  tension?: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartsState {
  monthlyExpenses: ChartData;
  categoryDistribution: ChartData;
  incomeVsExpenses: ChartData;
  creditCardTrends: ChartData;
}

// --- Componente Principal (ExpenseSummary) ---
const ExpenseSummary: React.FC = () => {
  const navigate = useNavigate();
  const isDarkMode = document.body.classList.contains('dark-mode');

  // --- Estados ---
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString()); // Mes 1-12 como string
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [expenses, setExpenses] = useState<Expense[]>([]); // Gastos fijos/ingresos
  const [allCreditCardExpenses, setAllCreditCardExpenses] = useState<CreditCardExpense[]>([]); // TODOS los gastos de tarjeta
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]); // Para la tabla principal (fijos/ingresos)

  // Totales calculados
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalFixed, setTotalFixed] = useState<number>(0);
  const [totalCredit, setTotalCredit] = useState<number>(0); // Total tarjeta calculado localmente

  // Estados para el formulario de agregar (sin cambios)
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<string>("Gastos");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>(""); // Fecha para el nuevo gasto fijo/ingreso
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);

  // Actualizar el estado de los gráficos con las interfaces correctas
  const [chartData, setChartData] = useState<ChartsState>({
    monthlyExpenses: {
      labels: [],
      datasets: [{
        label: '',
        data: [],
        borderColor: '',
        backgroundColor: '',
        tension: 0
      }]
    },
    categoryDistribution: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: []
      }]
    },
    incomeVsExpenses: {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: []
      }]
    },
    creditCardTrends: {
      labels: [],
      datasets: [{
        label: '',
        data: [],
        backgroundColor: ''
      }]
    }
  });

  // --- useEffect para cargar datos iniciales ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Gastos Fijos / Ingresos ("expenses")
        const expensesQuery = query(collection(db, "expenses"));
        const expensesSnapshot = await getDocs(expensesQuery);
        const expensesData: Expense[] = expensesSnapshot.docs.map(docSnapshot => {
          const data = docSnapshot.data();
          // Convertir Timestamp a Date para createdAt
          const createdAt = data.createdAt instanceof Timestamp
                              ? data.createdAt.toDate()
                              : (data.createdAt ? new Date(data.createdAt) : new Date()); // Fallback por si acaso
          if (isNaN(createdAt.getTime())) {
             console.warn(`Expense ${docSnapshot.id} tiene fecha createdAt inválida:`, data.createdAt);
          }
          return {
            id: docSnapshot.id,
            amount: Number(data.amount) || 0,
            type: data.type || 'Gastos',
            category: data.category || '',
            description: data.description || '',
            createdAt: !isNaN(createdAt.getTime()) ? createdAt : new Date(0), // Usar fecha válida o epoch si falla
            userName: data.userName || '',
            paid: data.paid || false,
          } as Expense;
        });
        setExpenses(expensesData);

        // 2. Fetch Gastos de Tarjeta de Crédito ("creditCardExpenses")
        const creditExpensesQuery = query(collection(db, "creditCardExpenses")); // Nombre de colección de CreditExpenses
        const creditExpensesSnapshot = await getDocs(creditExpensesQuery);
        const creditExpensesData: CreditCardExpense[] = creditExpensesSnapshot.docs.map(docSnapshot => {
          const data = docSnapshot.data();
          // La fecha de compra 'date' en CreditExpenses puede ser string 'YYYY-MM-DD'
          // La convertiremos a Date al usarla en el cálculo.
          return {
            id: docSnapshot.id,
            date: data.date, // Mantener como viene (string o lo que sea) por ahora
            transactionDetail: data.transactionDetail || '',
            amountInPesos: Number(data.amountInPesos) || 0,
            amountInDollars: Number(data.amountInDollars) || 0,
            installments: Number(data.installments) || 1, // Default a 1 si no existe o es 0
          } as CreditCardExpense;
        });
        setAllCreditCardExpenses(creditExpensesData);

      } catch (error) {
        console.error("Error fetching data:", error);
        // Aquí podrías poner un estado de error para mostrar al usuario
      }
    };

    fetchData();
  }, []); // Se ejecuta solo al montar


  // --- useEffect para calcular TODOS los totales ---
  useEffect(() => {
    const numericMonth = parseInt(selectedMonth, 10);
    const year = selectedYear; // Ya es número

    // --- 1. Calcular Total Ingresos y Total Gastos Fijos (del mes/año seleccionado) ---
    let currentMonthIncome = 0;
    let currentMonthFixed = 0;
    const filteredFixedForTable: Expense[] = [];

    expenses.forEach((expense) => {
      // Asegurar que createdAt sea una fecha válida
      if (!(expense.createdAt instanceof Date) || isNaN(expense.createdAt.getTime())) {
        // Saltar o loguear si la fecha no es válida
        // console.warn("Skipping expense due to invalid createdAt:", expense.id);
        return;
      }
      const expenseMonth = expense.createdAt.getMonth() + 1;
      const expenseYear = expense.createdAt.getFullYear();

      if (expenseMonth === numericMonth && expenseYear === year) {
        filteredFixedForTable.push(expense); // Añadir a la lista para la tabla
        if (expense.type === "Ingresos") {
          currentMonthIncome += expense.amount || 0;
        } else if (expense.type === "Gastos") {
          currentMonthFixed += expense.amount || 0;
        }
      }
    });

    setFilteredExpenses(filteredFixedForTable); // Actualiza la tabla principal
    setTotalIncome(currentMonthIncome);
    setTotalFixed(currentMonthFixed);

    // --- 2. Calcular Total Tarjeta de Crédito (del mes/año seleccionado) ---
    let calculatedCreditTotal = 0;

    allCreditCardExpenses.forEach((ccExpense) => {
      // Validar datos necesarios
      if (!ccExpense.date || !ccExpense.amountInPesos || !ccExpense.installments) {
          // console.warn("Skipping credit card expense due to missing data:", ccExpense.id);
          return; // Saltar si faltan datos cruciales
      }

      // Parsear la fecha de COMPRA (viene como 'YYYY-MM-DD' o similar)
      // Añadir 'T00:00:00' para evitar problemas de zona horaria al parsear solo fecha
      const purchaseDate = new Date(ccExpense.date + 'T00:00:00');
      if (isNaN(purchaseDate.getTime())) {
         console.warn("Invalid purchase date for credit expense:", ccExpense.id, ccExpense.date);
         return; // Saltar si la fecha de compra no es válida
      }

      const installmentsCount = ccExpense.installments || 1; // Asegurar al menos 1 cuota
      const installmentAmount = (ccExpense.amountInPesos || 0) / installmentsCount;

      // Calcular la fecha de inicio de la primera cuota (1ro del mes siguiente)
      const firstInstallmentStartDate = firstInstallmentDate(purchaseDate);
       if (isNaN(firstInstallmentStartDate.getTime())) {
         console.warn("Could not calculate first installment date for:", ccExpense.id);
         return; // Saltar si no se pudo calcular la fecha de inicio
       }

      // Calcular cuántos meses han pasado desde el inicio de las cuotas hasta el mes/año seleccionado
      const monthsSinceStart =
        (year - firstInstallmentStartDate.getFullYear()) * 12 +
        (numericMonth - (firstInstallmentStartDate.getMonth() + 1));

      // Comprobar si el mes/año seleccionado cae DENTRO del período de pago de cuotas
      if (monthsSinceStart >= 0 && monthsSinceStart < installmentsCount) {
        // Si cae dentro, sumar el monto de UNA cuota al total del mes
        calculatedCreditTotal += installmentAmount;
      }
    });

    setTotalCredit(calculatedCreditTotal); // Actualizar el estado con el total de tarjeta calculado

  }, [selectedMonth, selectedYear, expenses, allCreditCardExpenses]); // Dependencias

  // Función para preparar datos de gráficos
  const prepareChartData = () => {
    // Datos para el gráfico de gastos mensuales
    const monthlyTotals = Array(12).fill(0);
    
    // Calcular gastos mensuales del año seleccionado
    expenses.forEach((expense) => {
      if (expense.type === 'Gastos' && expense.createdAt.getFullYear() === selectedYear) {
        const month = expense.createdAt.getMonth();
        monthlyTotals[month] += expense.amount;
      }
    });

    // Agregar gastos de tarjeta de crédito
    allCreditCardExpenses.forEach((ccExpense) => {
      const purchaseDate = new Date(ccExpense.date + 'T00:00:00');
      if (!isNaN(purchaseDate.getTime()) && purchaseDate.getFullYear() === selectedYear) {
        const installmentAmount = ccExpense.amountInPesos / ccExpense.installments;
        const firstInstallmentMonth = firstInstallmentDate(purchaseDate).getMonth();
        
        // Distribuir el monto de las cuotas en los meses correspondientes
        for (let i = 0; i < ccExpense.installments && i + firstInstallmentMonth < 12; i++) {
          monthlyTotals[i + firstInstallmentMonth] += installmentAmount;
        }
      }
    });

    const monthlyExpensesData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      datasets: [{
        label: 'Gastos Mensuales',
        data: monthlyTotals,
        borderColor: '#0071e3',
        backgroundColor: isDarkMode ? 'rgba(0, 113, 227, 0.3)' : 'rgba(0, 113, 227, 0.1)',
        tension: 0.4,
        fill: true,
      }],
    };

    // Datos para la distribución por categorías
    const categories = [...new Set(expenses
      .filter(exp => exp.type === 'Gastos')
      .map(exp => exp.category))]
      .filter(cat => cat); // Filtrar categorías vacías

    const categoryData = categories.map(cat => 
      expenses
        .filter(exp => exp.type === 'Gastos' && exp.category === cat)
        .reduce((sum, exp) => sum + exp.amount, 0)
    );

    const categoryDistributionData = {
      labels: categories,
      
      datasets: [{
        data: categoryData,
      
        backgroundColor: [
          isDarkMode ? '#42d77d' : '#34c759', // Verde más brillante en modo oscuro
          isDarkMode ? '#6a69ff' : '#5856d6', // Púrpura más brillante
          isDarkMode ? '#ff4f45' : '#ff3b30', // Rojo más brillante
          isDarkMode ? '#0086ff' : '#0071e3', // Azul más brillante
          isDarkMode ? '#ffaa33' : '#ff9500', // Naranja más brillante
          isDarkMode ? '#ff4477' : '#ff2d55', // Rosa más brillante
          isDarkMode ? '#66d4ff' : '#5ac8fa', // Celeste más brillante
          isDarkMode ? '#1a8fff' : '#007aff', // Azul claro más brillante
        ],
      }],
    };

    // Datos para ingresos vs gastos
    const incomeVsExpensesData = {
      labels: ['Ingresos', 'Gastos Fijos', 'Tarjeta de Crédito'],
      datasets: [{
        data: [totalIncome, totalFixed, totalCredit],
        backgroundColor: [
          isDarkMode ? '#42d77d' : '#34c759',
          isDarkMode ? '#0086ff' : '#0071e3',
          isDarkMode ? '#ff4f45' : '#ff3b30'
        ],
      }],
    };

    // Datos para tendencias de tarjeta de crédito
    const creditMonthlyTotals = Array(6).fill(0);
    const currentMonth = new Date().getMonth();
    
    allCreditCardExpenses.forEach((ccExpense) => {
      const purchaseDate = new Date(ccExpense.date + 'T00:00:00');
      if (!isNaN(purchaseDate.getTime())) {
        const monthIndex = purchaseDate.getMonth();
        const monthDiff = monthIndex - currentMonth + 6;
        if (monthDiff >= 0 && monthDiff < 6) {
          creditMonthlyTotals[monthDiff] += ccExpense.amountInPesos;
        }
      }
    });

    const creditCardTrendsData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'].slice(-6),
      datasets: [{
        label: 'Gastos con Tarjeta',
        data: creditMonthlyTotals,
        backgroundColor: isDarkMode ? 'rgba(255, 79, 69, 0.6)' : 'rgba(255, 59, 48, 0.5)',
      }],
    };

    setChartData({
      monthlyExpenses: monthlyExpensesData,
      categoryDistribution: categoryDistributionData,
      incomeVsExpenses: incomeVsExpensesData,
      creditCardTrends: creditCardTrendsData,
    });
  };

  // Actualizar datos de gráficos cuando cambien los datos relevantes o el modo oscuro
  useEffect(() => {
    prepareChartData();
  }, [expenses, allCreditCardExpenses, totalIncome, totalFixed, totalCredit, selectedYear, isDarkMode]);

  // --- Handlers (sin cambios significativos, asegurar recarga de datos si es necesario) ---

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
  };

  // Handler para añadir GASTO/INGRESO FIJO
  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
        alert("Por favor, selecciona una fecha.");
        return;
    }
    try {
      // Crear el objeto de gasto con los datos del formulario
      const newExpense = {
        amount: parseFloat(amount) || 0,
        type: type as 'Gastos' | 'Ingresos',
        category,
        description,
        createdAt: new Date(date + 'T00:00:00'),
        userName: currentUserName,
        paid: false,
      };

      // Agregar el documento a Firestore
      const docRef = await addDoc(collection(db, "expenses"), newExpense);
      
      // Crear el objeto de gasto con el ID generado
      const addedExpense: Expense = {
        id: docRef.id,
        ...newExpense
      };

      // Actualizar el estado local inmediatamente con el nuevo gasto
      setExpenses(prevExpenses => [...prevExpenses, addedExpense]);

      // Limpiar formulario
      setAmount("");
      setType("Gastos");
      setCategory("");
      setDescription("");
      setDate("");

      // No es necesario volver a cargar todos los gastos desde Firestore
      // ya que actualizamos el estado local directamente
      // Esto hará que el useEffect de filtrado se ejecute automáticamente

    } catch (error) {
      console.error("Error adding expense: ", error);
      alert("Error al agregar el gasto.");
    }
  };

   const handleEdit = (expenseToEdit: Expense) => { // Recibe el objeto expense
    setEditingExpenseId(expenseToEdit.id);
    setAmount(expenseToEdit.amount?.toString() ?? '');
    setType(expenseToEdit.type ?? 'Gastos');
    setCategory(expenseToEdit.category ?? '');
    setDescription(expenseToEdit.description ?? '');
    // Formatear fecha para el input type="date" (YYYY-MM-DD)
    if (expenseToEdit.createdAt instanceof Date && !isNaN(expenseToEdit.createdAt.getTime())) {
        const yyyy = expenseToEdit.createdAt.getFullYear();
        const mm = (expenseToEdit.createdAt.getMonth() + 1).toString().padStart(2, '0');
        const dd = expenseToEdit.createdAt.getDate().toString().padStart(2, '0');
        setDate(`${yyyy}-${mm}-${dd}`);
    } else {
        setDate(''); // Limpiar si la fecha es inválida
    }
  };

  const handleSave = async () => {
    if (!editingExpenseId || !date) {
        alert("Faltan datos o la fecha es inválida para guardar.");
        return;
    }

    try {
      const expenseRef = doc(db, "expenses", editingExpenseId);
      const updatedData = {
        amount: parseFloat(amount) || 0,
        type: type as 'Gastos' | 'Ingresos',
        category,
        description,
        createdAt: new Date(date + 'T00:00:00'), // Guardar como Date/Timestamp
        updatedAt: new Date(), // Marcar fecha de actualización
      };

      await updateDoc(expenseRef, updatedData);

      // Actualizar el estado local 'expenses' para reflejar el cambio inmediatamente
      setExpenses(prevExpenses =>
        prevExpenses.map(exp =>
          exp.id === editingExpenseId
            ? { ...exp, ...updatedData, createdAt: updatedData.createdAt } // Asegurar que la fecha se actualice bien
            : exp
        )
      );

      // Limpiar estado de edición
      setEditingExpenseId(null);
      setAmount("");
      setType("Gastos");
      setCategory("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Error al guardar los cambios.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este gasto/ingreso?")) return;

    try {
      await deleteDoc(doc(db, "expenses", id));
      // Actualizar estado local para remover el item
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
      // El useEffect se encargará de recalcular
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Error al eliminar el gasto.");
    }
  };

  const handleCreditCardClick = () => {
    navigate("/credit-expenses");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserName(user?.displayName || user?.email || "Usuario");
    });
    return () => unsubscribe();
  }, []);

  // Configuración común para los gráficos
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#ffffff' : '#000000',
          font: {
            size: 12
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode ? 'rgba(215, 208, 208, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#ffffff' : '#ffff',
        }
      },
      y: {
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: isDarkMode ? '#90cdf4' : '#ffff',
        }
      }
    }
  };

  // --- JSX (Render) ---
  return (
    <div className=" mt-10">
      {/* --- Selectores de Mes y Año --- */}
      <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
    <div>
      <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Mes
      </label>
      <select
        id="month-select"
        value={selectedMonth}
        onChange={handleMonthChange}
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-white px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={(i + 1).toString()}>
            {new Date(0, i).toLocaleString("es-ES", { month: "long" })}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        Año
      </label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={handleYearChange}
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      >
        {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>

  </div>
</div>


      {/* --- Tarjetas de Resumen --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
  {/* Ingresos */}
  <div className="bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100 p-4 rounded-xl shadow-md">
    <h5 className="text-sm font-semibold mb-2">Ingresos Totales</h5>
    <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
  </div>

  {/* Gastos Fijos */}
  <div className="bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100 p-4 rounded-xl shadow-md">
    <h5 className="text-sm font-semibold mb-2">Gastos Fijos</h5>
    <p className="text-2xl font-bold">{formatCurrency(totalFixed)}</p>
  </div>

  {/* Tarjeta de Crédito */}
  <div
    className="bg-red-100 dark:bg-red-800 text-red-900 dark:text-red-100 p-4 rounded-xl shadow-md cursor-pointer hover:scale-[1.02] transition"
    onClick={handleCreditCardClick}
    role="button"
    aria-label="Ver detalle de gastos de tarjeta"
  >
    <h5 className="text-sm font-semibold mb-2">Tarjeta de Crédito</h5>
    <p className="text-2xl font-bold">{formatCurrency(totalCredit)}</p>
  </div>

  {/* Balance del Mes */}
  <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white p-4 rounded-xl shadow-md">
    <h5 className="text-sm font-semibold mb-2">Balance del Mes</h5>
    <p className="text-2xl font-bold">
      {formatCurrency(totalIncome - totalFixed - totalCredit)}
    </p>
  </div>
</div>


      {/* --- Formulario para agregar Gasto/Ingreso FIJO --- */}
      <form
  onSubmit={editingExpenseId ? (e) => { e.preventDefault(); handleSave(); } : handleAddExpense}
  className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl my-6"
>
  <div className="col-span-1">
    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Monto</label>
    <input
      id="amount"
      type="number"
      step="0.01"
      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      placeholder="0.00"
      value={amount}
      onChange={e => setAmount(e.target.value)}
      required
    />
  </div>

  <div className="col-span-1">
    <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Tipo</label>
    <select
      id="type"
      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      value={type}
      onChange={e => setType(e.target.value)}
    >
      <option value="Gastos">Gasto</option>
      <option value="Ingresos">Ingreso</option>
    </select>
  </div>

  <div className="col-span-1">
    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Categoría</label>
    <input
      id="category"
      type="text"
      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      placeholder="Categoría"
      value={category}
      onChange={e => setCategory(e.target.value)}
    />
  </div>

  <div className="col-span-1 md:col-span-2">
    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Descripción</label>
    <input
      id="description"
      type="text"
      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      placeholder="Descripción"
      value={description}
      onChange={e => setDescription(e.target.value)}
    />
  </div>

  <div className="col-span-1">
    <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Fecha</label>
    <input
      id="date"
      type="date"
      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
      value={date}
      onChange={e => setDate(e.target.value)}
      required
    />
  </div>

  <div className="col-span-1 flex items-end gap-2">
    <button
      type="submit"
      className="w-70 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition"
    >
      {editingExpenseId ? '💾 Guardar' : '✅ Agregar'}
    </button>
    {editingExpenseId && (
      <button
        type="button"
        className="w-70 bg-yellow-400  text-white font-semibold px-4 py-2 rounded-md shadow-sm transition"
        onClick={() => {
          setEditingExpenseId(null);
          setAmount("");
          setType("Gastos");
          setCategory("");
          setDescription("");
          setDate("");
        }}
      >
       ❌ Cancelar
      </button>
    )}
  </div>
</form>


      {/* --- Lista de Gastos --- */}
      <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-6">
  <h4 className="text-lg mx-auto justify-center flex font-semibold text-white dark:text-white mb-4">Movimientos del Mes</h4>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {filteredExpenses.length > 0 ? (
      filteredExpenses
        .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
        .map((expense) => (
          <div key={expense.id} className="bg-gray-50 dark:bg-gray-700 rounded-xl shadow p-4 flex flex-col gap-2 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400 dark:text-gray-300">{expense.createdAt.toLocaleDateString()}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${expense.type === 'Ingresos' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{expense.type}</span>
            </div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-100">{expense.category}</div>
            <div className="text-xs text-gray-500 dark:text-gray-300 mb-2">{expense.description}</div>
            <div className="text-lg font-bold text-white dark:text-white">${expense.amount ? expense.amount.toFixed(2) : '0.00'}</div>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium px-3 py-1 rounded-md transition"
                onClick={() => handleDelete(expense.id)}
              >
                🗑️
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded-md transition"
                onClick={() => handleEdit(expense)}
              >
                ✏️
              </button>
            </div>
          </div>
        ))
    ) : (
      <div className="col-span-full text-center text-sm text-gray-500 dark:text-gray-400 py-6">
        No hay movimientos registrados este mes.
      </div>
    )}
  </div>
</div>

      {/* Sección de Gráficos */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
  {/* Gráfico: Gastos Mensuales */}
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
    <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">Gastos Mensuales</h5>
    <div className="relative h-64">
      <Line
        data={chartData.monthlyExpenses}
        options={{
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
            legend: {
              display: false,
            }
          }
        }}
      />
    </div>
  </div>

  {/* Gráfico: Distribución por Categorías */}
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
    <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">Distribución por Categorías</h5>
    <div className="relative h-64">
      <Doughnut
        data={chartData.categoryDistribution}
        options={{
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
            legend: {
              position: 'right' as const,
              labels: {
                color: isDarkMode ? '#ffff' : '#ffff',
                padding: 20,
              }
            }
          }
        }}
      />
    </div>
  </div>

  {/* Gráfico: Ingresos vs Gastos */}
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
    <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">Ingresos vs Gastos</h5>
    <div className="relative h-64">
      <Pie
        data={chartData.incomeVsExpenses}
        options={{
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
            legend: {
              position: 'bottom' as const,
              labels: {
                color: isDarkMode ? '#ffff' : '#ffff',
                padding: 5,
              }
            }
          }
        }}
      />
    </div>
  </div>

  {/* Gráfico: Tendencias Tarjeta de Crédito */}
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
    <h5 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">Tendencias Tarjeta de Crédito</h5>
    <div className="relative h-64">
      <Bar
        data={chartData.creditCardTrends}
        options={{
          ...chartOptions,
          plugins: {
            ...chartOptions.plugins,
            legend: {
              display: false,
            }
          }
        }}
      />
    </div>
  </div>
</div>

        </div>
      
  
  );
};

export default ExpenseSummary;