export const fetchAddress = () => {
  let ethAddress;
  if (typeof window !== "undefined" && typeof window.web3 !== "undefined" && window.web3.eth !== "undefined" && window.web3.eth.accounts.length > 0) {
    ethAddress = window.web3.eth.accounts[0]
  } else {
    ethAddress = ""
    console.log("no web3")
  }
  return ethAddress
}