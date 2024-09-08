import React from "react";
import { useNavigate } from "react-router-dom";

const ExpenseForm: React.FC = () => {
  const navigate = useNavigate();

  const goToGraph = () => {
    navigate("/gastos-grafico");
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      {/* Aquí podrías tener el resto de tu formulario de gastos */}

      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-primary mx-2"
          style={{ width: "200px" }}
          onClick={() => (window.location.href = "/credit-expenses")}
        >
          Ver Gastos de Tarjeta
        </button>
        <button
          className="btn btn-info mx-2"
          style={{ width: "200px" }}
          onClick={goToGraph}
        >
          Ver Gráfico de Gastos
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
