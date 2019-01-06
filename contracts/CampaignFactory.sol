pragma solidity ^0.4.22;

import './Campaign.sol';

contract CampaignFactory{
    
    address[] public campaigns;
    /**
    @notice This function helps to create campaigns and adds to a array
    @param minimumContribution Minimum Contribution required for this campaign
    @param imgHash IPFS hash of the banner image
     */
    function createCampaign(uint minimumContribution,string imgHash) public {
        address newCampaign = new Campaign(minimumContribution,msg.sender,imgHash);
        campaigns.push(newCampaign);
    }
    /**
    @notice Returns an array of deployed campaigns
    @dev used memory for the argument to save on gas
     */
    function getDeployedCampaigns() public view returns(address[] memory){
        return campaigns;
    }
    
}