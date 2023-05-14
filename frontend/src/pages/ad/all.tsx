import { useContractRead } from "@hooks/useContractRead";
import { PageLayout } from "@layouts/PageLayout";
import AdContainer from "@modules/Ad/Container";
import React from "react";

const AllAds = () => {
  const { data, isLoading } = useContractRead("getAllAdVideos", "blocktubeAds");

  return (
    <PageLayout title="" className="space-y-4" isAdPage>
      <h2>My Ads</h2>

      <AdContainer isLoading={isLoading} ads={data} />
    </PageLayout>
  );
};

export default AllAds;
