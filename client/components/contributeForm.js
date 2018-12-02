import React, {Component} from 'react';
import {Form, Button, Input, Message } from 'semantic-ui-react';
import Campaign from '../lib/campaign';
import web3 from '../lib/getWeb3';
import {Router} from '../routes';
class ContributeForm extends Component {

    state ={
        value:'',
        errorMessage:'',
        loading:false
    }

    onSubmit = async(event) =>{
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        this.setState({loading:true, errorMessage:''});
        try{
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from:accounts[0],
                value:web3.utils.toWei(this.state.value,'ether')
            });
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        }catch(err){
            this.setState({errorMessage:err.message});
        }
        this.setState({loading:false});
        this.setState({value:''});
    }

    render(){
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event=>this.setState({value:event.target.value})}
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header='Error' content={this.state.errorMessage}/>
                <Button primary loading={this.state.loading}>Contribute</Button>
            </Form>
        );

    }
}

export default ContributeForm;