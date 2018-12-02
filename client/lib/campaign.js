import web3 from './getWeb3';
import Campaign from './contracts/Campaign.json';

//const getContractInstance = new web3.eth.Contract(CampaignFactory.abi,'0x86fdb9ab327e701f2c0c02bdc1dd7744f3fa3531');

export default (address) => {
    return new web3.eth.Contract(Campaign.abi,address);
}