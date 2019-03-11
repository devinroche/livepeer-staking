import React from 'react'
// import withData from '../utils/apollo';
import 'isomorphic-unfetch'
// import { Query } from 'react-apollo'
import livepeer from './utils/livepeer';
import './App.css'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      loading: true,
      user: {
        address: '',
        bondedAmount: 0,
        delegateAddress: "0x000",
        startRound: 0,
        status: "Not Active"
      }
    }
  }

  async componentDidMount() {
    const user = await livepeer();
    this.setState({ user, loading: false });
  }

  render() {
    const { loading, user: { address, bondedAmount, delegateAddress, startRound, status }} = this.state
    if (loading)
      return <h1>Loading</h1>

    return (
      // <Query query={ query } fetchPolicy={ 'cache-and-network' }>
      //   {({ loading, data: {delegator: {id, shares}}}) => {
      //     return (
            <div className="App">
              <div className="App-header">
                <h1>Eth Address: {address}</h1>
                <p>LPT: { bondedAmount * 0.000000000000000001 }</p>
                <p>Bonded To: {delegateAddress}</p>
                <p>Start Round: {startRound}</p>
                <p>Current Status: {status}</p>
              </div>
            </div>
          // )
        // }}
    //   </Query>
    );
  }
}

// const query = gql`
//   query {
//     delegator(first: 1, id: "0xd8cc20b6d8a45452b94140d2c04390622ae47c92") {
//       id
//       shares {
//         rewardTokens
//       }
//     }
//   }
// `

// export default withData(App)
export default App
