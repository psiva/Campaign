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

`npm uninstall truffle`
`npm install -g truffle@4.1.14`

I used solidity v0.4.24. Please ensure your solc is v0.4.24

## Installation

1. Clone the repo
2. Open up Ganache (desktop/command line) and configure it to hostname = 127.0.0.1 and port 8545 (default unless changed) to get your local blockchain up and running.
3. Create a `.env` file in the Camaign folder/directory and create a key value pair with `MNEMONIC = Replace this text with your mnemonic from Metamask/Ganache`. Update 'Replace this text with your mnemonic from Metamask/Ganache' with the mnemonic from your local installation of Ganache.
2. `npm install` from the cloned folder to install dependencies for smart contracts
3. `cd client`
4. `npm install` to install the dependencies for web app
5. `npm run dev` to run the server


## Code Structure

`contracts` folder contains all the logic
`client` folder contains the front end code
`design_pattern_decisions.md` and ` avoiding_common_attacks.md` are in the root folder.