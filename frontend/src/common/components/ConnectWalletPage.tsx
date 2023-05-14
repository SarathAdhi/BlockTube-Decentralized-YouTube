import { PageLayout } from "@layouts/PageLayout";
import React from "react";

export const ConnectWalletPrompt = () => {
  return (
    <PageLayout
      title="Connect Your Wallet"
      className="flex flex-col items-center justify-center"
    >
      <h3 className="text-center">Please connect your wallet.</h3>
    </PageLayout>
  );
};
