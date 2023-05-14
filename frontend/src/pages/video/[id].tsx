import { useContractRead, useContractReadVal } from "@hooks/useContractRead";
import { PageLayout } from "@layouts/PageLayout";
import React from "react";
import VideoPage from "@modules/Video/Page";
import { useRouter } from "next/router";

const ViewVideo = () => {
  const router = useRouter();
  const id = router.query?.id;

  const { data, isLoading } = useContractReadVal("getVideo", "blocktube", id);
  const { data: ads, isLoading: isAdsLoading } = useContractRead(
    "getAllAdVideos",
    "blocktubeAds"
  );

  return (
    <PageLayout title="Video" className="flex flex-col !p-0">
      <VideoPage isLoading={isLoading && isAdsLoading} ads={ads} {...data} />
    </PageLayout>
  );
};

export default ViewVideo;
