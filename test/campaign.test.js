const Campaign = artifacts.require("../contracts/Campaign.sol");
const CampaignFactory = artifacts.require("../contracts/CampaignFactory.sol");

let campaign;
let factory;
let campaignAddress;


contract("Campaign", function(accounts){

    /**
     * Setting up and getting a reference to a campaign before each 
     * test
     */

    beforeEach(async () =>{
        factory = await CampaignFactory.deployed();
        await factory.createCampaign('100',{from:accounts[0]},'','');
        [campaignAddress] = await factory.getDeployedCampaigns({from:accounts[0]});
        campaign = Campaign.at(campaignAddress);
    })
    
    /**
     * This test checks if the factory and campaign contracts can be successfully 
     * deployed
     */
    it("deploys a factory and a campaign", async function() {
        assert.ok(factory.address);
        assert.ok(campaign.address);
    });

    /**
     * Checks if the address that deployed the contract is being assigned 
     * as the owner. Truffle uses accounts[0] as the account to deploy
     */
    it('marks caller as campaign owner', async ()=>{
        const owner = await campaign.owner();
        assert.equal(accounts[0], owner);
    });
    /**
     * Tests if the contract allows people to contribute to the
     * campaign and marks them as approvers
     */
    it('allows people to contribute money and marks them as approvers',async()=>{
        await campaign.contribute({from:accounts[1],value:'200'});
        const isContributor = await campaign.approvers(accounts[1]);
        assert(isContributor);
    });

    /**
     * Checks if the contract fails if minimum contribution is not met
     * and passes if it does.
     */
    it('requires a minimum contribution', async ()=>{
        try{
            await campaign.contribute({from:accounts[2],value:'99'});
            assert(false);
        }catch(err){
            assert(err);
        }
    });

    /**
     * Test if the owner is able to create a payment request
     */
    it('allows a owner to create a payment request', async ()=>{
        await campaign.createRequest('buy panels','100',accounts[3],{from:accounts[0]});
        const request= await campaign.requests(0);
        assert.equal('buy panels',request[0]);
    });
    
    /**
     * End to end test to process a campaign, approve and finalize a payment
     */
    it('process requests for payment', async()=>{
        await campaign.contribute({from:accounts[6],value:web3.toWei('5','ether')});
        await campaign.createRequest('buy motherboards',web3.toWei('1','ether'),accounts[9],{from:accounts[0]});
        await campaign.approveRequest(1,{from:accounts[6]});
        await campaign.approveRequest(1,{from:accounts[1]});    
        await campaign.finalizeRequest(1,{from:accounts[0]});
        let balance = await web3.eth.getBalance(accounts[9]);
        balance = web3.fromWei(balance,'ether');
        balance = parseFloat(balance);
        assert(balance > 100);
    });

      /**
     * Test if Campaign Summary is returned correctly
     */
    it('returns campaign summary', async()=>{    
        const summary = await campaign.getSummary();
        console.log({summary});
        let balance = await web3.eth.getBalance(accounts[9]);
        balance = web3.fromWei(balance,'ether');
        balance = parseFloat(balance);
        assert('100',summary[0]);
        assert(balance>100);
    });
})