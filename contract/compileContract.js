const fs = require('fs');
const solc = require('solc');

// Lee el contrato Solidity desde el archivo
const contratoSource = fs.readFileSync('BeharCoin.sol', 'utf8');

// Compila el contrato
const input = {
  language: 'Solidity',
  sources: {
    'BeharCoin.sol': { 
      content: contratoSource,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['abi'],
      },
    },
  },
};

const contratoCompilado = JSON.parse(solc.compile(JSON.stringify(input)));


if (contratoCompilado.errors) {
  contratoCompilado.errors.forEach((error) => {
    console.error(error.formattedMessage);
  });
  process.exit(1); // Sale con código de error si hay errores de compilación
}

// Obtiene el ABI del contrato
const abi = contratoCompilado.contracts['BeharCoin.sol']['BeharCoin'].abi;

// Guarda el ABI en un archivo JSON
fs.writeFileSync('BeharCoin.json', JSON.stringify(abi, null, 2));

console.log('Contrato compilado y ABI guardado en BeharCoin.json');
