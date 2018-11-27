pragma solidity ^0.4.3;

contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool isComplete;
        mapping(address=>bool) approvals;
        uint approvalCount;
    }
    
    address public owner;
    uint public minimumContribution;
    uint public approversCount;
    mapping(address=>bool) public approvers;
    Request[] public requests;
    
    event RequestFinalized(address recipient,uint value);

    modifier onlyOwner{
        require(owner == msg.sender);
        _;
    }
    
    constructor(uint minimumAmount, address creator) public {
        owner = creator;
        minimumContribution = minimumAmount;
    }
    
    function contribute() payable public {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
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
    }
    
    function approveRequest(uint index) public {
        
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender]=true;
        request.approvalCount++;
        
    }
    
    function finalizeRequest(uint index) public onlyOwner{
        Request storage request = requests[index];
        require(request.approvalCount>(approversCount/2));
        require(!request.isComplete);
        request.isComplete = true;
        emit RequestFinalized(request.recipient,request.value);
        address receiver = request.recipient;
        receiver.transfer(request.value);
    }
}