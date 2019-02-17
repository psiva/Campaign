pragma solidity 0.4.24;

import './Campaign.sol';
import "./ILighthouse.sol";
contract CampaignFactory{

    ILighthouse  public myLighthouse;
    
    address[] public campaigns;
    uint private USDValue;
    bool private ok;

    
    constructor (ILighthouse _myLighthouse) public{
         myLighthouse = _myLighthouse;
    }
    /**
    @notice This function helps to create campaigns and adds to a array
    @param minimumContribution Minimum Contribution required for this campaign
    @param imgHash IPFS hash of the banner image
     */
    function createCampaign(uint minimumContribution,string imgHash, string campaignName) public {
        (USDValue,ok)=myLighthouse.peekData();
        address newCampaign = new Campaign(minimumContribution,msg.sender,imgHash, campaignName,USDValue);
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