import React from 'react';
import axios from 'axios';
import Chart from './Chart';
import ButtonRow from './ButtonRow';
import './Info.css';

class Info extends React.PureComponent {
  state = {
    price: 0,
    activeBtn: 1
  };

  async componentDidMount() {
    const { data } = await axios.get(
      'https://api.nomics.com/v1/prices?key=9cdcefd0aa99cf5067a3b18bf76dbfcb'
    );
    // eslint-disable-next-line
    const price = data.filter(curr => curr.currency === 'LPT')[0].price;
    this.setState({ price });
  }

  convertToLPT = val => val * 0.000000000000000001;

  roundNum = num => Math.round(100 * num) / 100;

  largeRound = num => Math.round(10000 * num) / 10000;

  getSharesEarned = shares => {
    return shares.reduce((prev, curr) => {
      return prev + curr.rewardTokens * 0.000000000000000001;
    }, 0);
  };

  formatRewards = rewards => {
    return rewards.map(r => ({
      y: this.convertToLPT(r.rewardTokens),
      x: new Date(r.round.timestamp * 1000)
    }));
  };

  buttonClick = btn => this.setState({ activeBtn: btn });

  render() {
    const {
      shares,
      user: { address, bondedAmount }
    } = this.props;
    const { price, activeBtn } = this.state;

    const totalLPT = this.roundNum(
      this.convertToLPT(bondedAmount) + this.getSharesEarned(shares)
    );
    const usd = this.roundNum(totalLPT * price);

    let changeLPT;

    if (shares.length === 0) changeLPT = 0;
    else if (shares.length === 1)
      changeLPT = this.convertToLPT(shares[0].rewardTokens);
    else
      changeLPT =
        this.convertToLPT(shares[0].rewardTokens) -
        this.convertToLPT(shares[1].rewardTokens);

    const changeUSD = this.largeRound(changeLPT * price);
    return (
      <div className="content">
        <h3>Address: {address}</h3>
        <h2>
          ${usd} ({totalLPT} LPT)
        </h2>
        <p className={changeUSD > 0 ? 'green' : 'red'}>
          {changeUSD > 0 ? '+' : '-'}
          {changeUSD} ({this.largeRound(changeLPT)} LPT)
        </p>
        <ButtonRow buttonClick={this.buttonClick} active={activeBtn} />
        <Chart data={this.formatRewards(shares)} />
      </div>
    );
  }
}

export default Info;
