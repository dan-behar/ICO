import React, { useState, useEffect } from "react";

const AccountInfo = ({ web3, contract }) => {
  const [ethBalance, setEthBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        // Obtener la dirección de la cuenta del usuario
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];

        // Obtener el saldo de Sepolia-ETH de la cuenta del usuario
        const ethBalanceWei = await web3.eth.getBalance(userAddress);
        const ethBalanceEth = web3.utils.fromWei(ethBalanceWei, "ether");
        setEthBalance(ethBalanceEth);

        // Obtener el saldo de tokens Beharcoin del usuario
        console.log("esta es la cuenta", userAddress)
        const tokenBalanceWei = await contract.methods.balanceOf(userAddress).call();
        console.log("su valor de tokens DBA", tokenBalanceWei)
        const decimals = 10; // Decimales del token (ajusta según tu contrato)
        const tokenBalanceTokens = web3.utils.fromWei(tokenBalanceWei, "ether") / 18**decimals;
        setTokenBalance(tokenBalanceTokens);
        console.log("Valor de tokenBalance:", tokenBalanceTokens);
      } catch (error) {
        console.error("Error al obtener la información de la cuenta:", error);
      }
    };
    

    fetchAccountInfo();
  }, [web3, contract]);

  return (
    <div className="rounded p-4 shadow mt-4">
      <h2>Información de la cuenta</h2>
      <p>Dirección de la cuenta: {web3 && web3.currentProvider.selectedAddress}</p>
      <p>Saldo de Sepolia-ETH: {ethBalance} ETH</p>
      <p>Saldo de tokens BeharCoin: {parseFloat(tokenBalance).toLocaleString()} TKC</p>
    </div>
  );
};

export default AccountInfo;

