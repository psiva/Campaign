Following are some of the design pattern decisions that were made during implementation of CrowdCoin

As part of CrowdCoin, we needed to have any user initiate creating a new Campaign. This translates to having individual Campaign contracts deployed for each campaign. In order to simplify this deployment process and have the creator of the Campaign bear the costs of deployment, have decided to use **Factory Design pattern**.

Created a CampaignFactory contract which will create Campaign contracts on demand.

In order to disable critical contract functionality during emergency, implemented **Emergency Stop** pattern. Leveraged OpenZeppelin's Pausable contract to implement this pattern. FinalizeRequest method in the Campaign contract which transfers ether to the supplier/vendor can be disabled in case of emergency.

```
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
@title Contract to implement functionality related to management of a campaign. 
@dev   Extends Pausable contract to implement Emergency Stop Pattern
@author Siva Puvvada
 */
contract Campaign is Pausable{
```
```
function finalizeRequest(uint index) 
        public onlyOwner whenNotPaused{
```

Implemented **Secure Ether Transfer** pattern by using **transfer** function instead of **call.value()**

Implemented **Access restrictions** by using modifiers to restrict access to contract functionality according to suitable criteria.

Implemented **Pull vs Push Payment** pattern. Owner creates a request to pull payments from the balance and is released after multi-sig consensus is reached.

Used require statements where required to fail early and fail loud.