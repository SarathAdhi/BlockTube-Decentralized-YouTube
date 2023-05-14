/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    defaultNetwork: "matic",
    network: {
      hardhat: {},
      polygon_mumbai: {
        url: "https://rpc-mumbai.maticvigil.com",
        accounts: [process.env.METAMASK_PRIVATE_KEY],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
