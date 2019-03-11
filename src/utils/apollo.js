import { withData } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'

const config = {
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/adamsoffer/livepeer-canary',
  })
}

export default withData(config)