import React ,{Component}  from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../lib/getWeb3';
import Campaign from '../lib/campaign';
class RequestRow extends Component{

    onApprove = async()=>{
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(this.props.address);
        await campaign.methods.approveRequest(this.props.id).send({
            from:accounts[0]
        });
    };

    onFinalize = async()=>{
        const accounts = await web3.eth.getAccounts();
        const campaign = Campaign(this.props.address);
        await campaign.methods.finalizeRequest(this.props.id).send({
            from:accounts[0]
        });
    }
   
    render(){
        const {Row,Cell} = Table;
        const {id,request,approversCount} = this.props;
        const readyToFinalize = request.approvalCount > approversCount/2;
        return <Row disabled={request.isComplete} positive={readyToFinalize && !request.isComplete}>
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value,"ether")}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell>{request.approvalCount}/{approversCount}</Cell>
            <Cell>
                {request.isComplete ? null: (
                <Button color="green" basic onClick={this.onApprove}>
                 Approve
                </Button>
                )}
            </Cell>
            <Cell>
                {request.isComplete ? null: (
                <Button color="teal" basic onClick={this.onFinalize}>
                Finalize
                </Button>
                )}
            </Cell>
        </Row>
    }
}

export default RequestRow;