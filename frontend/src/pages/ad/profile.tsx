import withAuth from "@hoc/withAuth";
import { useContractReadVal } from "@hooks/useContractRead";
import { PageLayout } from "@layouts/PageLayout";
import AdContainer from "@modules/Ad/Container";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";

const ViewAdsProfile = () => {
  const address = useAddress();

  const { data, isLoading } = useContractReadVal(
    "getAdVideosByAddress",
    "blocktubeAds",
    address
  );

  console.log({ data });

  return (
    <PageLayout title="" className="space-y-4" isAdPage>
      <h2>All Ads</h2>

      <AdContainer isLoading={isLoading} ads={data} />
    </PageLayout>
  );
};

export default withAuth(ViewAdsProfile, false, "", true);
