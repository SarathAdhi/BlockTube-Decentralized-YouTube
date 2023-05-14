import { ConnectWalletPrompt } from "@components/ConnectWalletPage";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import { useStore } from "@utils/store";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const withAuth = (
  Component: React.FC,
  checkCreator = false,
  message1 = "You need CREATOR account to upload video",
  checkAdManager = false,
  message2 = "You need to create a Ads Manager account"
) =>
  function PageProp({ ...pageProps }) {
    const address = useAddress();
    const { isCreator, isAdManager } = useStore();
    const router = useRouter();

    if (router.isReady && checkCreator && !isCreator && address) {
      router.replace("/creator");
      toast.error(message1);
    }

    if (router.isReady && checkAdManager && !isAdManager && address) {
      router.replace("/ad/creator");
      toast.error(message2);
    }

    if (!!address) return <Component {...pageProps} />;
    else return <ConnectWalletPrompt />;
  };

withAuth.displayName = "withAuth";
export default withAuth;
