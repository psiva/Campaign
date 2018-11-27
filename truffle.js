module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      gas: 2000000,
      network_id: "*" // Match any network id
    },
    rinkeby:{
      provider: function() {
        return new HDWalletProvider(mnemonic,"https://rinkeby.infura.io/v3/48b328464d254cec9f2e935c0d61b77d");
    },
    network_id:3
    }
  }
}
