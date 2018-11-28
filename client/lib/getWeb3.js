import Web3 from 'web3'

let web3;

//If in browser and metamask/mist is running
if(typeof window !=='undefined' && typeof window.web3 !== 'undefined'){
  web3 = new Web3(window.web3.currentProvider);
} else{
  // On server OR user is not running metamask
  const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/48b328464d254cec9f2e935c0d61b77d');
  web3 = new Web3(provider);
}

export default web3;
