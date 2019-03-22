import React from 'react';
import axios from 'axios';
import fetchAddress from '../utils/web3';
import Info from './Info';
import Header from './Header';
import { setAddress, getAddress } from '../utils/localStore';
import './App.css';

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
      let address = await getAddress();
      if (address === null) {
        address = await fetchAddress();
        setAddress(address);
      }
      if (address.length === 0 || address === 'false' || address === false) {
        // eslint-disable-next-line
        address = prompt(
          'Please Enter Metamask Wallet (or wallet used for staking)'
        ).toLowerCase();
        setAddress(address);
      }

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/${address}`
      );
      this.setState({ user: data, load: false });
    });
  }

  render() {
    const { load } = this.state;

    if (load) return <h1>LOADING</h1>;

    const { user } = this.state;
    user.shares.reverse();

    return (
      <div className="App">
        <Header />
        <Info user={user} />;
      </div>
    );
  }
}

export default App;
