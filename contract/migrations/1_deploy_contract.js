const BeharCoin = artifacts.require("BeharCoin");

module.exports = function (deployer) {
  const initialSupply = 10000;
  const tokenPrice = 1.0;

  deployer.deploy(BeharCoin, initialSupply, tokenPrice);
};
