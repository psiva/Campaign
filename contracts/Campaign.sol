pragma solidity ^0.4.3;

import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
@title Contract to implement functionality related to management of a campaign. 
@dev   Extends Pausable contract to implement Emergency Stop Pattern
@author Siva Puvvada
 */
contract Campaign is Pausable{

    using SafeMath for uint;
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool isComplete;
        mapping(address=>bool) approvals;
        uint approvalCount;
    }
    
    address public owner;
    string public imageHash;
    uint public minimumContribution;
    uint public approversCount;
    mapping(address=>bool) public approvers;
    Request[] public requests;
    
    event RequestCreated(string description,uint value, address recipient);
    event RequestFinalized(address recipient,uint value);

    /**
    @dev Modifier to check if the sender is the owner of the contract
     */
    modifier onlyOwner{
        require(owner == msg.sender);
        _;
    }
    
    /**
    @notice Constructor
    @param minimumAmount Minimum Contribution required for this campaign
    @param creator Owner of the campaign
     */
    constructor(uint minimumAmount, address creator, string imgHash) public {
        owner = creator;
        minimumContribution = minimumAmount;
        imageHash = imgHash;
    }
    
    /**
    @notice This function allows a user to contribute to a campaign if he is contributing a minimum amount
           as defined by the owner of the campaign
    @author Siva Puvvada
     */
    function contribute() payable public {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount = approversCount.add(1);
    }
    
    /**
    @notice Allows contract's owner to create a request for release of funds to a recipient
    @param description Description of the request
    @param value Amount required for this request
    @param recipient Vendor who provides goods/services in return of funds
     */
    function createRequest(string memory description, uint value, address recipient) 
        public onlyOwner 
    {
        Request memory request = Request({
            description:description,
            value:value,
            recipient:recipient,
            isComplete:false,
            approvalCount:0
        });
        
        requests.push(request);
        emit RequestCreated(request.description,request.value,request.recipient);
    }
    
    /**
    @notice Allows a contributor to the campaign approve a request created by the owner
    @param index Index of the request in the request array that contributor wants to approve
     */
    function approveRequest(uint index) public {

        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender]=true;
        request.approvalCount = (request.approvalCount).add(1);
    }
    
    /**
    @notice Allows the owner to finalize the request if the more than 50% contributors approve the 
            request and release the funds to the recipient defined in the request
    @dev    using whenNotPaused modifier from Pausable contract for implementing emergency stop pattern
            performing contract related work before calling transfer to prevent reentrancy attacks
    @param index Index of the request in the request array that needs to be finalized
     */
    function finalizeRequest(uint index) 
        public onlyOwner whenNotPaused{
        Request storage request = requests[index];
        require(request.approvalCount>(approversCount/2));
        require(!request.isComplete);
        request.isComplete = true;
        address receiver = request.recipient;
        receiver.transfer(request.value);
        emit RequestFinalized(request.recipient,request.value);
    }

    /**
    @notice Publishes the summary of the campaign
    @return Minimum Contribution, Balance, Number of requests, Number of approvers and Owner's address
     */
    function getSummary() public view returns(uint,uint,uint,uint,address,string) {
        return(
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            owner,
            imageHash
        );
    }

    /**
    @notice Returns the number of requests
    @dev As Solidity does not return the entire array, getting the count to make individual calls 
         for retrieving the details of the requests
    @return Number of requests created for a particular campaign
     */
    function getRequestCount() public view returns(uint){
        return requests.length;
    }
}