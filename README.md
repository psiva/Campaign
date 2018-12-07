# CrowdCoin -  A Kickstarter Clone using Ethereum

CrowdCoin allows crowdsourcing funds for use in their projects. There are 2 different roles in this implementation

`Owner` - Creator of a project/campaign \
`Contributer/Approver` - One who contributed to a campaign and has an approving authority

When an owner needs funds to spend, he creates a request for the release of funds. Contributors can then
approve requests and requests that are approved by more than half of contributors can then be finalized
by the owner to release the funds.

## Installation

1. Clone the repo
2. `npm install` from the cloned folder to install dependencies for smart contracts
3. `cd client`
4. `npm install` to install the dependencies for web app
5. `npm run dev` to run the server