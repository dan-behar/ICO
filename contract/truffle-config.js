require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { INFURA_API_KEY, MNEMONIC } = process.env; // Reemplaza con tu mnemónico

// Crea un nuevo error (por ejemplo, un error de prueba)
const err = new Error('Este es un error de prueba');

// Crea un nuevo objeto de error con un mensaje personalizado que incluye la pila de seguimiento (stack trace) del error original.
const newErr = new Error(`PollingBlockTracker - encountered an error while attempting to update latest block:\n${err.stack}`);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    sepolia: {
      provider: () => new HDWalletProvider(MNEMONIC, INFURA_API_KEY),
      network_id: "11155111",
      gasLimit: '0x7A1200', // 8000000 en decimal (ajustado a hexadecimal)
      maxPriorityFeePerGas: '0x3b9aca00',
      maxFeePerGas: '0x2540be400',
    },
  },
  compilers: {
    solc: {
      version: '0.8.0', // Replace with the Solidity version you are using
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
};

