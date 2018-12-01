import React, { Component } from "react";
import Layout from "../../components/layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import getContract from '../../lib/getContract';
import getWeb3 from '../../lib/getWeb3';
class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage :'',
    loading:false
  };

   onSubmit = async(event) =>{
     event.preventDefault();
     this.setState({loading:true,errorMessage:''});

     try{
        const accounts = await getWeb3.eth.getAccounts();
        await getContract.methods
               .createCampaign(this.state.minimumContribution)
               .send({from:accounts[0]});
     } catch(err){
        console.log(err);
        this.setState({errorMessage:err.message});
     }
     this.setState({loading:false});
   }

  render() {
    return (
      <Layout>
        <h3> Create new Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Something went wrong" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>Create</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
