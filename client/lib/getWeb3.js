import Portis from "@portis/web3";
import Web3 from "web3";
//import getConfig from "next/config";

let web3;

//If in browser
/** if(typeof window!=='undefined'){
  const portis = new Portis('', 'rinkeby');
  web3 = new Web3(portis.provider);
  console.log('Using Portis');
}**/

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //If in browser and metamask/mist is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // On server OR user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/48b328464d254cec9f2e935c0d61b77d"
  );
  web3 = new Web3(provider);
}
export default web3;
