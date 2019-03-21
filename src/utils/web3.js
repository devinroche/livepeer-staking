const fetchAddress = () => {
  let ethAddress;
  try {
    const { web3 } = window;
    const { eth } = web3;
    const { accounts } = eth;
    if (
      typeof window !== 'undefined' &&
      typeof web3 !== 'undefined' &&
      eth !== 'undefined' &&
      accounts.length > 0
    ) {
      ethAddress = accounts[0];
    } else {
      ethAddress = '';
    }
    return ethAddress;
  } catch (e) {
    return '';
  }
};

export default fetchAddress;
