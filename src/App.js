import React, { useEffect, useState } from "react";
import Web3 from "web3";
import BeharCoin from "./BeharCoin.json";
import AccountInfo from "./components/AccountInfo";
import ClaimTokens from "./components/ClaimTokens";
import ICODetails from "./components/ICODetails";
import InvestmentForm from "./components/InvestmentForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css"


function App() {
  const [web3, setWeb3] = useState(null);
  const [userAddress, setUserAddress] = useState(null); // Agregar userAddress como estado
  const [contract, setContract] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3Instance);

          const contractAddress = "0x3928694a680C4cD6b9D41eF2fA8F19b3EBa9A30A";
          const beharcoinContract = new web3Instance.eth.Contract(
            BeharCoin.abi,
            contractAddress
          );
          setContract(beharcoinContract);

          // Obtener la dirección de la cuenta del usuario
          const accounts = await web3Instance.eth.getAccounts();
          if (accounts.length > 0) {
            setUserAddress(accounts[0]); // Establecer userAddress en el estado
          } else {
            console.warn("No se encontraron cuentas de Ethereum.");
          }
        } catch (error) {
          console.error("Usuario rechazó la conexión.", error);
        }
      } else {
        console.log("No se encontró un proveedor Ethereum.");
      }
    };
    initWeb3();
  }, []);

  const handleInvestment = async (amount) => {
    if (!web3 || !contract) {
      console.error("Web3 y/o el contrato no están disponibles.");
      return;
    }

    try {
      // Obtener la dirección de la cuenta del usuario
      const userAddress = await getCurrentUserAddress();

      // Convertir la cantidad de inversión a wei (la unidad más pequeña de ether)
      const investmentAmountWei = web3.utils.toWei(amount.toString(), "ether");

      // Enviar la inversión al contrato inteligente
      await contract.methods.buyTokens().send({
        from: userAddress,
        value: investmentAmountWei,
      });

      console.log(`Inversión exitosa de ${amount} Sepolia-ETH.`);
    } catch (error) {
      console.error("Error al realizar la inversión:", error);
    }
  };

  const getCurrentUserAddress = async () => {
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        return accounts[0];
      }
    }
    throw new Error("No se pudo obtener la dirección del usuario.");
  };

  return (
    <div className="container-fluid">
      {/* Título que abarca todo el ancho */}
      <div className="bg-primary text-white p-4 text-center">
        <h1>Interacción con Contrato Inteligente</h1>
      </div>
  
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <ICODetails web3={web3} contract={contract} />
          </div>
          <div className="col-md-6">
            <AccountInfo web3={web3} contract={contract} setTokenBalance={setTokenBalance} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <ClaimTokens contract={contract} web3={web3} userAddress={userAddress} />
          </div>
          <div className="col-md-6">
            <InvestmentForm onInvest={handleInvestment} />
          </div>
        </div>
      </div>
    </div>
  );
  }

export default App;




