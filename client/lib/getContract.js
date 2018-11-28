import web3 from './getWeb3';
import CampaignFactory from './contracts/CampaignFactory.json';

const getContractInstance = new web3.eth.Contract(CampaignFactory.abi,'0xd945a0af03b900de846c8000f31bf5a92cf40d91');

export default getContractInstance
