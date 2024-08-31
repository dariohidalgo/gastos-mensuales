import React from "react";

const ExpenseForm: React.FC = () => {
  return (
    <div className="container d-flex justify-content-center">
      {/* Aquí podrías tener el resto de tu formulario de gastos */}
      <div className=" justify-content-md-end mt-3">
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/credit-expenses")}
        >
          Ver Gastos de Tarjeta
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
