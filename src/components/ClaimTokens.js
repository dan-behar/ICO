import React, { useState, useEffect } from 'react';
import web3 from 'web3';

function ClaimTokens({ contract, userAddress }) {
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    if (contract && userAddress) {
      // Realiza una llamada al contrato para obtener el saldo de DBA
      contract.methods.balanceOf(userAddress).call()
        .then(balance => {
          const decimals = 18;
          const rawTokenBalance = web3.utils.fromWei(balance, 'ether');
          const tokenBalance = Math.round(rawTokenBalance * 10**decimals) / 10**decimals; // Convertir y redondear
          setTokenBalance(tokenBalance);

          // Agrega un console.log para mostrar el saldo en la consola
          console.log('Saldo de tokens Beharcoin en el contrato:', tokenBalance, 'DBA');
        })
        .catch(error => {
          console.error('Error al obtener el saldo de DBA:', error);
        });
    }
  }, [contract, userAddress]);

  async function handleClaimTokens() {
    if (contract) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); // Solicita acceso a las cuentas
        const fromAddress = accounts[0]; // La primera cuenta es la que se utilizará
  
        // Especifica el límite de gas personalizado aquí (en Wei)
        const gasLimitCustom = '8000000'; // Por ejemplo, un límite de gas de 8,000,000
  
        await contract.methods.claimTokens().send({ from: fromAddress, gas: gasLimitCustom });
        alert("Tokens reclamados con éxito.");
      } catch (error) {
        console.error(error);
        alert("Error al reclamar tokens.");
      }
    } else {
      alert("Contrato no cargado. Asegúrate de estar conectado a la red correcta.");
    }
  }

  return (
    <div className="rounded p-4 shadow mt-4">
      <h2>Reclamar Tokens</h2>
      <p>Saldo de tokens Tukicoin en el contrato: {tokenBalance} DBA</p>
      <button className="btn btn-success" onClick={handleClaimTokens}>
        Reclamar Tokens
      </button>
    </div>
  );
};

export default ClaimTokens;
