export const fetchAddress = () => {
  let ethAddress;
  if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    ethAddress = window.web3.eth.accounts[0]
  } else {
    ethAddress = "0xd8cc20b6d8a45452b94140d2c04390622ae47c92"
    console.error("no web3")
  }
  return ethAddress
}