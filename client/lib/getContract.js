import web3 from './getWeb3';
import CampaignFactory from './contracts/CampaignFactory.json';
//0xd945a0af03b900de846c8000f31bf5a92cf40d91
//0x86fdb9ab327e701f2c0c02bdc1dd7744f3fa3531
const getContractInstance = new web3.eth.Contract(CampaignFactory.abi,'0x5b71ad2b7d4e0543e4eb70114017a948a19df870');

export default getContractInstance
