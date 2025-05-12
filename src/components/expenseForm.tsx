import React from "react";
import { useNavigate } from "react-router-dom";

const ExpenseForm: React.FC = () => {
  const navigate = useNavigate();

  const goToGraph = () => {
    navigate("/gastos-grafico");
  };

  return (
    <div className="container d-flex flex-column align-items-center expense-form">
      {/* Aquí podrías tener el resto de tu formulario de gastos */}

      <div className="d-flex flex-column flex-md-row justify-content-center mt-3 gap-3 mb-4">
        <button
          className="btn btn-primary"
          style={{ width: "100%", maxWidth: "200px" }}
          onClick={() => (window.location.href = "/credit-expenses")}
        >
          Ver Gastos de Tarjeta
        </button>
        <button
          className="btn btn-info"
          style={{ width: "100%", maxWidth: "200px" }}
          onClick={goToGraph}
        >
          Ver Gráfico de Gastos
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
