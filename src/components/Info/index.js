import React from 'react';
import moment from 'moment';
import Chart from './Chart';
import ButtonRow from './ButtonRow';
import './Info.css';

class Info extends React.PureComponent {
  state = {
    activeBtn: 2,
    data: [],
    graphData: [],
    lptData: [],
    rangedLPT: []
  };

  async componentDidMount() {
    const {
      user: { shares }
    } = this.props;

    await this.formatLPT(shares);
    this.setRange(this.oneWeek());
  }

  roundNum = (num, d) => Math.round(d * num) / d;

  oneWeek = () => moment().subtract(14, 'days');

  oneMonth = () => moment().subtract(1, 'months');

  threeMonths = () => moment().subtract(3, 'months');

  oneYear = () => moment().subtract(1, 'year');

  setRange = startDate => {
    const { data, lptData } = this.state;
    const rangedData = data.filter(el =>
      moment(el.x).isBetween(startDate, moment())
    );

    const rangedLPT = lptData.filter(el =>
      moment(el.x).isBetween(startDate, moment())
    );

    this.setState({
      graphData: rangedData,
      rangedLPT
    });
  };

  formatLPT = data => {
    const format = data.map(el => {
      return {
        y: el.rewardUSD,
        x: new Date(el.timestamp)
      };
    });

    const formatLPT = data.map(el => {
      return {
        y: el.convertedReward,
        x: new Date(el.timestamp)
      };
    });

    this.setState({
      graphData: format,
      data: format,
      lptData: formatLPT,
      rangedLPT: formatLPT
    });
  };

  renderChange = totalRewardsUSD => {
    const { graphData, rangedLPT } = this.state;
    const {
      user: { totalUSD }
    } = this.props;

    const sumArr = graphData.reduce((acc, curr) => acc + curr.y, 0);
    const sumLpt = rangedLPT.reduce((acc, curr) => acc + curr.y, 0);

    const decreaseValue = sumArr + totalUSD - totalUSD;
    const changeUSDPercent = (decreaseValue / totalUSD) * 100;

    return (
      <p className={totalRewardsUSD > 0 ? 'green' : 'red'}>
        {totalRewardsUSD > 0 ? '+' : '-'}${this.roundNum(sumArr, 100)} (
        {this.roundNum(changeUSDPercent, 100)}%) [{this.roundNum(sumLpt, 100)}{' '}
        LPT]
      </p>
    );
  };

  calculateRange = btn => {
    let range;
    switch (btn) {
      case 2:
        range = this.oneWeek();
        break;
      case 3:
        range = this.oneMonth();
        break;
      case 4:
        range = this.threeMonths();
        break;
      default:
        range = this.oneYear();
        break;
    }
    return range;
  };

  buttonClick = btn => {
    const range = this.calculateRange(btn);
    this.setRange(range);
    this.setState({ activeBtn: btn });
  };

  render() {
    const {
      user: { address, totalLPT, totalUSD, totalRewardsLPT, totalRewardsUSD }
    } = this.props;
    const { activeBtn, graphData } = this.state;

    const usd = this.roundNum(totalUSD, 100);
    const lpt = this.roundNum(totalLPT, 100);

    return (
      <div className="content">
        <h3>Address: {address}</h3>
        <h2>
          ${usd} ({lpt} LPT)
        </h2>
        {this.renderChange(totalRewardsUSD, totalRewardsLPT, activeBtn)}
        <ButtonRow buttonClick={this.buttonClick} active={activeBtn} />
        <Chart data={graphData} />
      </div>
    );
  }
}

export default Info;
