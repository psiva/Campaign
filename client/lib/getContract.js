import web3 from "./getWeb3";
import CampaignFactory from "./contracts/CampaignFactory.json";
import getAssist from "./blocknative";
//0xd945a0af03b900de846c8000f31bf5a92cf40d91
//0x86fdb9ab327e701f2c0c02bdc1dd7744f3fa3531
//0x5b71ad2b7d4e0543e4eb70114017a948a19df870
//0x77d86c3aa1ef85ef3fc572e2e1058c14a15528b3
//0x282845238991eb6515265A4Ec71b1dB40bBFd589
let contractInstance;

function getContractInstance() {
  if (contractInstance) {
    return contractInstance;
  } else {
    const contract = new web3.eth.Contract(
      CampaignFactory.abi,
      "0x2d79994914b4aa0953db07923834c02caa015745"
    );
    //console.log(contract);
    contractInstance = getAssist().Contract(contract);

    return contractInstance;
  }
}

// const getContractInstance = new web3.eth.Contract(
//   CampaignFactory.abi,
//   "0x282845238991eb6515265A4Ec71b1dB40bBFd589"
// );
//const myDecoratedContract = getAssist().Contract(getContractInstance);
export default getContractInstance;
