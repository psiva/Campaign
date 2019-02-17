# KroudCoin -  A Kickstarter Clone using Ethereum

KroudCoin allows crowdsourcing funds for use in their projects. There are 2 different roles in this implementation

`Owner` - Creator of a project/campaign \
`Contributer/Approver` - One who contributed to a campaign and has an approving authority

When an owner needs funds to spend, he creates a request for the release of funds. Contributors can then
approve requests and requests that are approved by more than half of contributors can then be finalized
by the owner to release the funds.

## Pre-requisites

Ensure you have Truffle(v4) , Ganache , nodejs(V10+) and NPM installed on the machine. I have tested this with Truffle version 4.1.14 and Google Chrome with Metamask extension installed in it. 

If you have truffle 5.0, please use truffle v 4.1.14

`npm uninstall truffle` \
`npm install -g truffle@4.1.14`

I used solidity v0.4.24. Please ensure your solc is v0.4.24

## Installation
```sh
$ git clone https://github.com/psiva/Campaign.git
$ cd Campaign
$ npm install
$ cd client
$ npm install
$ cd .. 
$ ganache-cli
$ truffle migrate --reset
$ cd client
$ npm run dev
```

1. Open up Ganache (desktop/command line) and configure it to hostname = 127.0.0.1 and port 8545 (default unless changed) to get your local blockchain up and running.
2. Execute `cd ..` and then`truffle test` and other `truffle` commands from within the Campaign directory
3. Update the MNEMONIC in the `.env` file with the mnemonic from the metamask. This is required if you wish to deploy the contract to Rinkeby testnet.
4. Ensure you select Rinkeby testnet in the Metamask
5. Navigate to `http://localhost:3000` in the browser to interact with the web app.
6. Use Rinkeby accounts to interact with the app

If you would like to use Ganache, update the contract address in `/Campaign/client/lib/getContract.js` with the contract address in the ganache and use ganache in the metamask.

Use `truffle test` from the Campaign folder to execute the tests
```sh
Using network 'development'.

  Contract: Campaign
    ✓ deploys a factory and a campaign
    ✓ marks caller as campaign owner (85ms)
    ✓ allows people to contribute money and marks them as approvers (108ms)
    ✓ requires a minimum contribution (65ms)
    ✓ allows a owner to create a payment request (148ms)
    ✓ process requests for payment (598ms)
    ✓ returns campaign summary (170ms)


  7 passing (2s)
```
The address in the metamask that is used for creating a campaign is the owner for that campaign. While running the tests accounts[0] is the owner.


## Code Structure

`contracts` folder contains all the logic \
`client` folder contains the front end code \
`design_pattern_decisions.md` and ` avoiding_common_attacks.md` are in the root folder.

To access the Contract on MyEtherWaller navigate to https://www.myetherwallet.com/#contracts 

Contract Address  : `0x282845238991eb6515265A4Ec71b1dB40bBFd589` 

ABI :
``` sh
[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"campaigns","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"minimumContribution","type":"uint256"},{"name":"imgHash","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDeployedCampaigns","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"}]
```