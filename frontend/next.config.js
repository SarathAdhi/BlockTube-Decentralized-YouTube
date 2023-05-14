/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io"],
  },
  env: {
    BLOCKTUBE_CONTRACT_ADDRESS: process.env.BLOCKTUBE_CONTRACT_ADDRESS,
    ADS_CONTRACT_ADDRESS: process.env.ADS_CONTRACT_ADDRESS,
  },
};

module.exports = nextConfig;
