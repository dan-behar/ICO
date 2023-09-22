import React, { useState } from "react";

const InvestmentForm = ({ onInvest }) => {
  const [investmentAmount, setInvestmentAmount] = useState("");

  const handleInvestment = () => {
    if (investmentAmount > 0) {
      onInvest(investmentAmount);
      setInvestmentAmount("");
    }
  };

  return (
    <div className="rounded p-4 shadow mt-4">
      <h2>Realizar Inversión</h2>
      <div className="form-group">
        <label htmlFor="investmentAmount">Cantidad de Sepolia-ETH a invertir:</label>
        <input
          type="number"
          className="form-control"
          id="investmentAmount"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
        />
      </div>
      <div className="mt-2">
      <button className="btn btn-primary" onClick={handleInvestment}>
        Invertir
      </button>
    </div>
    </div>
  );
};
export default InvestmentForm;
