import React, { Component } from "react";
import getContract from "../lib/getContract";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/layout";
import { Link } from "../routes";
import getWeb3 from "../lib/getWeb3";
import getAssist from "../lib/blocknative";
import { type } from "os";

class CampaignIndex extends Component {
  // static async getInitialProps() {
  //   //const campaignContract = getContract();
  //   const campaigns = await getContract()
  //     .methods.getDeployedCampaigns()
  //     .call();
  //   return { campaigns: campaigns };
  // }
  state = {
    campaigns: []
  };

  componentDidMount = async () => {
    if (typeof window !== "undefined") {
      this.onboardUser();
      const campaigns = await getContract()
        .methods.getDeployedCampaigns()
        .call();
      console.log({campaigns});
      this.setState({ campaigns });
    }
  };

  onboardUser = () => {
    if (typeof window === undefined) {
      return;
    }
    try {
      getAssist().onboard();
    } catch (error) {
      console.log(error.msg);
    }
  };

  renderCampaigns() {
    const items = this.state.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
                labelPosition="left"
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
