import "@styles/globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import type { AppProps } from "next/app";
import { ThirdwebProvider, useAddress } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";
import { useContractReadVal } from "@hooks/useContractRead";
import { useEffect } from "react";
import { useStore } from "@utils/store";
import LoadingPage from "@components/LoadingPage";
import { ConnectWalletPrompt } from "@components/ConnectWalletPage";

const PageComponent = ({ Component, pageProps }: AppProps) => {
  const { setMyProfile, setMyAdProfile } = useStore();
  const address = useAddress();

  const { data: userData, isLoading } = useContractReadVal(
    "getUserProfile",
    "blocktube",
    address
  );

  const { data: adsManagerData } = useContractReadVal(
    "getManagerProfile",
    "blocktubeAds",
    address
  );

  async function setMyProfileFunc() {
    setMyProfile({ ...userData });
    setMyAdProfile({ ...adsManagerData });
  }

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      return;
    });

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key == "I") {
        e.preventDefault();
      }
    });
  }, []);

  useEffect(() => {
    if (address) setMyProfileFunc();
  }, [userData, adsManagerData]);

  if (isLoading) return <LoadingPage />;

  if (!address) return <ConnectWalletPrompt />;

  return (
    <>
      <Component {...pageProps} />

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default function App(pageProps: AppProps) {
  return (
    <ThirdwebProvider activeChain="mumbai">
      <PageComponent {...pageProps} />
    </ThirdwebProvider>
  );
}
