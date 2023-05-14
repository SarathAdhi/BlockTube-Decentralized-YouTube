import React from "react";
import { Component } from "types/components";
import AdCard from "./Card";
import { Skeleton } from "primereact/skeleton";
import clsx from "clsx";
import { AdVideo } from "types/ad";
import { ethers } from "ethers";

const ContainerWrapper: React.FC<Component & { small: boolean }> = ({
  className,
  children,
  small = false,
}) => (
  <div
    className={clsx(
      "grid grid-cols-1 gap-5",
      small
        ? "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6"
        : "md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5",
      className
    )}
  >
    {children}
  </div>
);

const VideoLoadingSkeleton = () => (
  <div className="grid gap-5">
    <Skeleton className="!w-full !h-60" borderRadius="16px"></Skeleton>
    <div className="flex items-start gap-3">
      <Skeleton shape="circle" size="3rem" className="flex-shrink-0"></Skeleton>

      <div className="w-full grid gap-2">
        <Skeleton className="!w-full"></Skeleton>
        <Skeleton className="!w-40"></Skeleton>
      </div>
    </div>
  </div>
);

type Props = {
  isLoading?: boolean;
  ads: AdVideo[];
  small?: boolean;
};

const AdContainer: React.FC<Props> = ({
  ads = [],
  isLoading,
  small = false,
}) => {
  if (isLoading)
    return (
      <ContainerWrapper small={small}>
        {[...Array(6)].map((_, i) => (
          <VideoLoadingSkeleton key={i} />
        ))}
      </ContainerWrapper>
    );

  if (!ads) return <></>;

  const _ads = ads.map((e) => ({
    ...e,
    bidAmount: parseFloat(ethers.utils.formatEther(e.bidAmount)),
  }));

  const sortedAds = _ads?.sort((a, b) => a.bidAmount - b.bidAmount);

  console.log({ sortedAds });

  return (
    <ContainerWrapper small={small}>
      {ads.map((video) => (
        <AdCard key={video.id.toString()} {...video} />
      ))}
    </ContainerWrapper>
  );
};

export default AdContainer;
