import web3 from './getWeb3';
import CampaignFactory from './contracts/CampaignFactory.json';
//0xd945a0af03b900de846c8000f31bf5a92cf40d91
const getContractInstance = new web3.eth.Contract(CampaignFactory.abi,'0x86fdb9ab327e701f2c0c02bdc1dd7744f3fa3531');

export default getContractInstance
