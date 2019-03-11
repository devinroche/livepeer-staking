import LivepeerSDK from '@livepeer/sdk'
import {fetchAddress} from './web3';

const livepeer = async () => {
  const ethAddress = fetchAddress()
  console.info("ETH ADDRESS: ", ethAddress)
  const sdk = await LivepeerSDK()
	const { rpc } = sdk
  const user = await rpc.getDelegator(ethAddress);
  console.log(user)
	return user;
}

export default livepeer;
