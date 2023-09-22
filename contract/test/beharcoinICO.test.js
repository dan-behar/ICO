const BeharcoinICO = artifacts.require("BeharcoinICO");

contract("BeharcoinICO", (accounts) => {
  let beharcoinICO;

  beforeEach(async () => {
    beharcoinICO = await BeharcoinICO.new(100000, 10, { from: accounts[0] });
  });

  it("should have the correct initial supply", async () => {
    const totalSupply = await beharcoinICO.totalSupply();
    assert.equal(totalSupply.toString(), "100000000000000000000000", "Initial supply is incorrect");
  });

  it("should allow the owner to set the token price", async () => {
    await beharcoinICO.setTokenPrice(20, { from: accounts[0] });
    const newPrice = await beharcoinICO.tokenPrice();
    assert.equal(newPrice.toString(), "20", "Token price was not set correctly");
  });

  // Más pruebas aquí...
});
