import {
  useContract,
  useContractRead as useContractReadTW,
} from "@thirdweb-dev/react";

export function useContractRead(
  functionName:
    | "getAllVideos"
    | "getUserProfile"
    | "getVideo"
    | "getChannel"
    | "getManagerProfile"
    | "getAdVideosByAddress"
    | "getAllAdVideos"
    | "getAllVideoCids",
  contractName: "blocktube" | "blocktubeAds" = "blocktube"
) {
  const contractAddress =
    contractName === "blocktube"
      ? process.env.BLOCKTUBE_CONTRACT_ADDRESS
      : process.env.ADS_CONTRACT_ADDRESS;

  const { contract } = useContract(contractAddress);

  return useContractReadTW(contract, functionName);
}

export function useContractReadVal(
  functionName:
    | "getAllVideos"
    | "getUserProfile"
    | "getVideo"
    | "getChannel"
    | "getManagerProfile"
    | "getAdVideosByAddress"
    | "getAllAdVideos"
    | "getAllVideoCids",
  contractName: "blocktube" | "blocktubeAds" = "blocktube",
  value: any
) {
  const contractAddress =
    contractName === "blocktube"
      ? process.env.BLOCKTUBE_CONTRACT_ADDRESS
      : process.env.ADS_CONTRACT_ADDRESS;

  const { contract } = useContract(contractAddress);

  return useContractReadTW(contract, functionName, value);
}
