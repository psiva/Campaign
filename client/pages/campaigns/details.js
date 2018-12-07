import React , {Component} from 'react';
import Layout from '../../components/layout';
import Campaign from '../../lib/campaign';
import { Card,Grid, GridColumn, Button, Image } from 'semantic-ui-react';
import web3 from '../../lib/getWeb3';
import ContributeForm from '../../components/contributeForm';
import {Link} from '../../routes';

class CampaignDetails extends Component{

    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log(summary);
        return {
            minimumContribution:summary[0],
            balance:summary[1],
            requestCount:summary[2],
            approversCount:summary[3],
            owner:summary[4],
            imgHash:summary[5],
            address:props.query.address
        };
    }

    renderCards(){

        const {
            balance,
            owner,
            minimumContribution,
            requestCount,
            approversCount
        } = this.props;

        const items = [
            
            {
                header: owner,
                meta: 'Address of the owner',
                description: 'Owner created this campaign and can create requests to withdraw money',
                style:{overflowWrap:'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'Minimum contribution required to become an approver',
                style:{overflowWrap:'break-word'}
            },
            {
                header: requestCount,
                meta: 'Number of requests',
                description: 'Requests try to withdraw from the contract once approved by the approvers',
                style:{overflowWrap:'break-word'}
            },
            {
                header: approversCount,
                meta: 'Number of approvers',
                description: 'Number of approvers who have donated to the campaign',
                style:{overflowWrap:'break-word'}
            },
            {
                header: web3.utils.fromWei(balance),
                meta: 'Campaign Balance(Ether)',
                description: 'Balance is how much money this campaign has left to spend',
                style:{overflowWrap:'break-word'}
            }
        ];

        return <Card.Group items={items} />;
    }
    render() {
        const imgSrc = `https://ipfs.io/ipfs/${this.props.imgHash}`;
        console.log(imgSrc);
        return <Layout>
                    <h3>Campaign Details</h3>
                    <Image src ={imgSrc} size='large' fluid></Image>
                    <Grid>
                        <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}  
                        </Grid.Column>
                        <GridColumn width={6}>
                            <ContributeForm address={this.props.address}></ContributeForm>
                        </GridColumn>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Link route={`/campaigns/${this.props.address}/requests`}>
                                  <a><Button secondary>View Requests</Button></a>
                                 </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
               </Layout>
    }
}   

export default CampaignDetails;