import React from "react";
import { Component } from "types/components";
import { VideoProps } from "types/video";
import VideoCard from "./Card";
import { Skeleton } from "primereact/skeleton";
import clsx from "clsx";
import useContractWrite from "@hooks/useContractWrite";

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
        : "md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5",
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
  videos: VideoProps[];
  small?: boolean;
};

const VideoContainer: React.FC<Props> = ({
  videos,
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

  if (!videos) return <></>;

  const { mutateAsync: deleteVideo } = useContractWrite("deleteVideo");

  return (
    <ContainerWrapper small={small}>
      {videos.map((video) => (
        <VideoCard key={video.uuid} deleteVideo={deleteVideo} {...video} />
      ))}
    </ContainerWrapper>
  );
};

export default VideoContainer;
