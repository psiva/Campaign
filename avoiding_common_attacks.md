Following are some of the measures taken to avoid common attacks

**Re-entrancy**

`finalizeRequest` function in the `Campaign.sol` is the only place where there is an external call. I have avoided using `call.value()` and used safer transfer method to transfer value and also performed all the internal work (state changes) before transfering value to the receiver.
```
function finalizeRequest(uint index) 
        public onlyOwner whenNotPaused{
        Request storage request = requests[index];
        require(request.approvalCount>(approversCount.div(2)));
        require(!request.isComplete);
        request.isComplete = true;
        address receiver = request.recipient;
        receiver.transfer(request.value);
        emit RequestFinalized(request.recipient,request.value);
}
```
**Integer Overflow and Underflow**

I have used [SafeMath][https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol] library from OpenZeppelin in the `Campaign.sol` to avoid the Integer overflow and Underflow attacks. SafeMath library reverts any function on error to prevent an overflow/underflow.

**DelegateCall vulnerability**
Avoided using delegatecall and ensured the libraries I used do not carry this risk to prevent hacks similar Parity Multi-Sig wallet hack.

**Contract Ownership**


