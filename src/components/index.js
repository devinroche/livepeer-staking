import React from 'react';
import 'isomorphic-unfetch';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import livepeer from '../utils/livepeer';
import { setAddress, getAddress } from '../utils/localStore';
import './App.css';
import fetchAddress from '../utils/web3';
import Info from './Info';

const query = gql`
  query User($address: String!) {
    delegator(first: 1, id: $address) {
      shares {
        rewardTokens
        round {
          timestamp
        }
      }
    }
  }
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      load: true,
      user: {}
    };
  }

  componentDidMount() {
    window.addEventListener('load', async () => {
      let address = getAddress();
      if (address === null) {
        address = await fetchAddress();
        setAddress(address);
      }
      if (address.length === 0) {
        // eslint-disable-next-line
        address = prompt(
          'Please Enter Metamask Wallet (or wallet used for staking)'
        ).toLowerCase();
        setAddress(address);
      }

      const user = await livepeer(address);
      this.setState({ user, load: false });
    });
  }

  convertToLPT = val => val * 0.000000000000000001;

  roundNum = num => Math.round(100 * num) / 100;

  render() {
    const { load } = this.state;

    if (load) return <h1>Loading</h1>;

    const {
      user: { address }
    } = this.state;

    return (
      <Query query={query} variables={{ address }}>
        {({ loading, error, data }) => {
          if (error) return <h1>error fetching data</h1>;

          if (loading) return <h1>Loading</h1>;

          if (data) {
            const {
              delegator: { shares }
            } = data;
            const { user } = this.state;

            return <Info user={user} shares={shares} />;
          }
        }}
      </Query>
    );
  }
}

export default App;
