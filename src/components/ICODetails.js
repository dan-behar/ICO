import React, { useState, useEffect } from "react";
import Web3 from "web3";

const ICODetails = ({ contract }) => {
  const [icoData, setIcoData] = useState({
    timeRemaining: 0,
    tokensSold: 0,
    ethReceived: 0,
  });

  useEffect(() => {
    const fetchICOData = async () => {
      try {
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
          const userAddress = accounts[0];
          console.log(userAddress)

          // Obtener la información actualizada de la ICO desde el contrato
          const icoEndTime = await contract.methods.endTime().call();
          const tokensSold = await contract.methods.totalSupply().call();

          // Calcular el tiempo restante en la ICO
          const currentTime = Math.floor(Date.now() / 1000);
          const timeRemaining = parseInt(icoEndTime) - parseInt(currentTime);

          // Calcular la cantidad de Sepolia-ETH recibidos por el usuario
          const ethReceivedWei = await web3.eth.getBalance(contract.options.address);
          const ethReceived = web3.utils.fromWei(ethReceivedWei, "ether");

          setIcoData({
            timeRemaining,
            tokensSold,
            ethReceived,
          });
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la ICO:", error);
      }
    };

    fetchICOData();
  }, [contract]);

  return (
    <div className="rounded p-4 shadow mt-4">
      <h2>Detalles de la ICO</h2>
      <p>Tiempo restante en la ICO: {icoData.timeRemaining} segundos</p>
      <p>Cantidad de tokens vendidos: {icoData.tokensSold} DBA</p>
      <p>Cantidad de Sepolia-ETH recibidos: {icoData.ethReceived} ETH</p>
    </div>
  );
};

export default ICODetails;
