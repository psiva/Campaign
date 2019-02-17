var CampaignFactory = artifacts.require("./CampaignFactory.sol");

module.exports = function(deployer) {
  var address = '0x9aED5cA00A44682cDC488b7778728a728717f7e3';
  deployer.deploy(CampaignFactory,address);
};
