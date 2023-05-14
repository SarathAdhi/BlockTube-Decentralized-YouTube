import {
  useContract,
  useContractWrite as useContractWriteTW,
} from "@thirdweb-dev/react";
import { toast } from "react-hot-toast";

export default function useContractWrite(
  functionName:
    | "uploadVideo"
    | "updateVideo"
    | "createChannel"
    | "updateChannel"
    | "addSubscribe"
    | "addLikes"
    | "createManager"
    | "uploadAdVideo"
    | "addViews"
    | "deleteVideo",
  contractName: "blocktube" | "blocktubeAds" = "blocktube"
) {
  const contractAddress =
    contractName === "blocktube"
      ? process.env.BLOCKTUBE_CONTRACT_ADDRESS
      : process.env.ADS_CONTRACT_ADDRESS;

  const { contract } = useContract(contractAddress);

  const { mutateAsync: mutateAsyncTW, isLoading } = useContractWriteTW(
    contract,
    functionName
  );

  const mutateAsync = async (
    values: any[],
    successMessage?: string,
    cb?: () => void
  ) => {
    try {
      const data = await mutateAsyncTW(values);
      if (successMessage) toast.success(successMessage);
      cb?.();
      return data;
    } catch (err) {
      console.log("contract call failure :- ", err);
    }
  };

  return { mutateAsync, isLoading };
}
