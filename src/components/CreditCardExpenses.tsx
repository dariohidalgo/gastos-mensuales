import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const CreditCardExpenseForm: React.FC = () => {
  const [date, setDate] = useState<string>("");
  const [transactionDetail, setTransactionDetail] = useState<string>("");
  const [amountInPesos, setAmountInPesos] = useState<string>("");
  const [amountInDollars, setAmountInDollars] = useState<string>("");

  // Cálculo automático del impuesto para mostrar
  const calculatedTax =
    parseFloat(amountInPesos || "0") > 0
      ? parseFloat(amountInPesos) * 0.21
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "creditCardExpenses"), {
        date,
        transactionDetail,
        amountInPesos: parseFloat(amountInPesos),
        amountInDollars: parseFloat(amountInDollars || "0"),
        tax: calculatedTax,
      });

      // Resetear el formulario
      setDate("");
      setTransactionDetail("");
      setAmountInPesos("");
      setAmountInDollars("");
    } catch (error) {
      console.error("Error al agregar el gasto: ", error);
    }
  };

  return (
    <div className="container">
      <form
        className="row justify-content-center align-items-center m-3"
        onSubmit={handleSubmit}
      >
        <div className="col-md-2">
          <label className="mb-2" htmlFor="date">Fecha:</label>
          <input
            className="form-control"
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <label className="mb-2" htmlFor="transactionDetail">Detalle:</label>
          <input
            className="form-control"
            type="text"
            id="transactionDetail"
            placeholder="Detalle"
            value={transactionDetail}
            onChange={(e) => setTransactionDetail(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label className="mb-2" htmlFor="amountInPesos">Pesos:</label>
          <input
            className="form-control"
            type="number"
            id="amountInPesos"
            value={amountInPesos}
            onChange={(e) => setAmountInPesos(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2">
          <label className="mb-2" htmlFor="amountInDollars">Dólares:</label>
          <input
            className="form-control"
            type="number"
            id="amountInDollars"
            value={amountInDollars}
            onChange={(e) => setAmountInDollars(e.target.value)}
          />
        </div>

        <div className="col-md-2 d-flex justify-content-center mt-3">
          <button className="btn btn-success btn-lg" type="submit">
            Enviar
          </button>
        </div>
      </form>

      {/* Mostrar el impuesto calculado */}
      {calculatedTax > 0 && (
        <div className="mt-3">
          <h5>Impuesto Calculado: ${calculatedTax.toFixed(2)}</h5>
        </div>
      )}
    </div>
  );
};

export default CreditCardExpenseForm;
