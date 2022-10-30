//https://eth-goerli.alchemyapi.io/v2/wc527bDcS2V8z0jNPw-vhTuRqmxtXRmQ

require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: '0.8.14',
  networks: {
    goerli: {
      url: 'https://eth-goerli.alchemyapi.io/v2/wc527bDcS2V8z0jNPw-vhTuRqmxtXRmQ',
      accounts: ['3a6a50d2a2e8982d433871d8107250eb16cf2708943e829ec1e927bbb2acbb4b'],
    }
  }
}