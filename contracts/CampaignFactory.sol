pragma solidity ^0.4.22;

import './Campaign.sol';

contract CampaignFactory{
    
    address[] public campaigns;
    
    function createCampaign(uint minimumContribution,string imgHash) public {
        address newCampaign = new Campaign(minimumContribution,msg.sender,imgHash);
        campaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(address[] memory){
        return campaigns;
    }
    
}