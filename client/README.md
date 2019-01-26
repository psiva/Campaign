# Next.js client

This is the frontend client for our dapp. It is built with Next.js.

## Pages

There are three pages:

- `index.js` — This the homepage. Displays the list of campaigns and a button to create a new campaign
- `campaigns\new.js` — This displays a page to create a new campaign. Uses IPFS to upload the campaign banner image
- `campaigns\details.js` — This page displays the details of a campaign including the number of requests created, banner image , minimum contribution required and other details. It also allows to drill down into the list of requests created for this campaign.
- `campaigns\requests\index.js` — This page displays the list of requests created for a particular campaign
- `campaigns\requests\new.js` — This page allows to create a new request


## The `lib` folder

### `contracts`

A symlink to the `build/contracts` located in the Truffle project is placed here so that the Next.js app can refer to the build artifacts from the parent Truffle project.


### `getWeb3.js`

This is a function for actually getting the Web3 object. Unfortunately, this file is not as straight-forward as I would have liked it. Your best bet at understanding this is to read the comments I have written in the file. You probably don't need to change anything in this file.

### `getContract.js`

This function returns the contract instance of the CampaignFactory contract deployed in Rinkeby

### `ipfs.js`

This creates and returns a IPFS object with a connection details for the IPFS Infura node.
