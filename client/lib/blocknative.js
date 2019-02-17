import assist from "./assist";
import getWeb3 from "./getWeb3";
let assistInstance;

function getAssist() {
  console.log({getWeb3})
  const bncAssistConfig = {
    dappId: "Enter DappID",
    networkId: "4",
    web3:getWeb3,
    messages: {
      txConfirmed: function(data) {
        console.log(data.contract.methodName);
        if (data.contract.methodName === "createCampaign") {
          return "Congratulations! You created a campaign";
        } else if (data.contract.methodName === "contribute") {
          return "Congratulations! You successfully contributed to the campaign";
        }
      }
    }
  };
  if (assistInstance) {
    return assistInstance;
  } else {
    return assist.init(bncAssistConfig);
  }
}

export default getAssist;
