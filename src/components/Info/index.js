import React from 'react';
import Chart from './Chart';

class Info extends React.PureComponent {
  convertToLPT = val => val * 0.000000000000000001;

  roundNum = num => Math.round(100 * num) / 100;

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

  render() {
    const {
      shares,
      user: { address, bondedAmount, delegateAddress, startRound, status }
    } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <h2>Eth Address: {address}</h2>
          <h3>LPT Earned: {this.roundNum(this.getSharesEarned(shares))}</h3>
          <p>LPT: {this.roundNum(this.convertToLPT(bondedAmount))}</p>
          <p>Bonded To: {delegateAddress}</p>
          <p>Start Round: {startRound}</p>
          <p>Current Status: {status}</p>
          <Chart data={this.formatRewards(shares)} />
        </div>
      </div>
    );
  }
}

export default Info;
