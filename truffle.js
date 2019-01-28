require('dotenv').config();

let HDWalletProvider = require("truffle-hdwallet-provider");
let mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
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
