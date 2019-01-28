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

1. Clone the repo
2. `npm install` from the cloned folder to install dependencies for smart contracts
3. `cd client`
4. `npm install` to install the dependencies for web app
5. Open up Ganache (desktop/command line) and configure it to hostname = 127.0.0.1 and port 8545 (default unless changed) to get your local blockchain up and running.
6. Update the MNEMONIC in the `.env` file with the mnemonic from your local blockchain created by ganache
7. Add the ganache accounts to Metamask by importing the private keys.
8. `npm run dev` to run the server
9. Navigate to `http://localhost:3000` in the browser to interact with the web app.

Use `truffle test` from the Campaign folder to execute the tests \

The address in the metamask that is used for creating a campaign is the owner for that campaign. While running the tests accounts[0] is the owner.


## Code Structure

`contracts` folder contains all the logic \
`client` folder contains the front end code \
`design_pattern_decisions.md` and ` avoiding_common_attacks.md` are in the root folder.

To access the Contract on MyEtherWaller navigate to https://www.myetherwallet.com/#contracts \

Contract Address  : `0x282845238991eb6515265A4Ec71b1dB40bBFd589` \

ABI : [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"campaigns","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"minimumContribution","type":"uint256"},{"name":"imgHash","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDeployedCampaigns","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"}]