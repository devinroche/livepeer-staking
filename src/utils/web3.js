export const fetchAddress = () => {
  let ethAddress = "0xd8cc20b6d8a45452b94140d2c04390622ae47c92";
  if (typeof window !== "undefined" && typeof window.web3 !== "undefined" && window.web3.eth !== "undefined") {
    ethAddress = window.web3.eth.accounts[0]
  } else {
    ethAddress = "0xd8cc20b6d8a45452b94140d2c04390622ae47c92"
    console.log("no web3")
  }
  return ethAddress
}