import LivepeerSDK from '@livepeer/sdk'

const livepeer = async (ethAddress) => {
  const sdk = await LivepeerSDK()
	const { rpc } = sdk
  const user = await rpc.getDelegator(ethAddress);
  console.log(user)
	return user;
}

export default livepeer;
