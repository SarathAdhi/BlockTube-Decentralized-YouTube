import SubscribeButton from "@components/elements/SubscribeButton";
import LoadingPage from "@components/LoadingPage";
import { useContractReadVal } from "@hooks/useContractRead";
import useContractWrite from "@hooks/useContractWrite";
import { useAddress } from "@thirdweb-dev/react";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { AdVideo } from "types/ad";
import { User } from "types/user";
import { Video } from "types/video";
import {
  Player,
  ControlBar,
  BigPlayButton,
  ReplayControl,
  ForwardControl,
} from "video-react";
import "video-react/dist/video-react.css";
import AdVideoPlayer from "./AdVideoPlayer";

type Props = {
  isLoading: boolean;
  ads: AdVideo[];
};

const VideoPage: React.FC<Props & Video> = ({
  ads,
  title,
  thumbnailUrl,
  videoUrl,
  description,
  likes,
  owner,
  views,
  isLoading,
  category,
  id,
}) => {
  const address = useAddress();
  const [showDescription, setShowDescription] = useState(false);
  const [isAdSkipped, setIsAdSkipped] = useState(false);
  const [displaySkipBtn, setDisplaySkipBtn] = useState(false);
  const [isUserPaidFee, setIsUserPaidFee] = useState(false);

  const { data, isLoading: isUserProfileLoading } = useContractReadVal(
    "getUserProfile",
    "blocktube",
    owner
  );

  const { mutateAsync: addViews } = useContractWrite("addViews");
  const { mutateAsync: addLikes } = useContractWrite("addLikes");

  async function addViewsToTheVideo() {
    try {
      await addViews([id], "", () => {
        setIsUserPaidFee(true);
      });
    } catch (error) {}
  }

  useEffect(() => {
    if (id) addViewsToTheVideo();
  }, [isLoading]);

  useEffect(() => {
    if (isUserPaidFee)
      setTimeout(() => {
        setDisplaySkipBtn(true);
      }, 5000);
  }, [isUserPaidFee]);

  console.log({ displaySkipBtn });

  if (isLoading) return <LoadingPage className="!h-full flex-1" size="small" />;

  if (isUserProfileLoading)
    return <LoadingPage className="!h-full flex-1" size="small" />;

  if (!title)
    return (
      <div className="h-screen grid place-content-center">
        <h3 className="text-center">Video not found</h3>
      </div>
    );

  if (!isUserPaidFee)
    return (
      <div className="h-screen grid place-content-center">
        <p className="text-center">Waiting for transaction...</p>
      </div>
    );

  const user = data as User;

  const isUserProfile =
    address?.toLowerCase() === user?.walletId?.toLowerCase();

  const isUserLikedTheVideo = likes.some((e) => e === address);

  return (
    <div className="w-full grid place-items-center">
      <div className="bg-black w-full grid place-items-center">
        <div className="relative w-full 2xl:w-[60%]">
          {!isAdSkipped ? (
            <>
              <AdVideoPlayer {...{ category, owner, ads }} />
              <Button
                className="z-40 !absolute top-2 right-2"
                severity="info"
                onClick={() => setIsAdSkipped(true)}
                disabled={!displaySkipBtn}
              >
                Skip
              </Button>
            </>
          ) : (
            <Player poster={thumbnailUrl} src={videoUrl} aspectRatio="16:9">
              <BigPlayButton className="!hidden" />

              <ControlBar>
                <ReplayControl seconds={5} />
                <ForwardControl seconds={5} />
              </ControlBar>
            </Player>
          )}
        </div>
      </div>

      <div className="w-full 3xl:w-[60%] grid xl:grid-cols-2 gap-4 p-4 sm:py-4">
        <div className="grid gap-4">
          <h1 className="text-xl md:text-[28px]">{title}</h1>

          <div className="flex gap-4 flex-col md:flex-row items-start">
            <div className="w-full flex gap-4 items-start">
              <img
                src={user.profileImage}
                className="w-14 h-14 rounded-full flex-shrink-0"
                alt={user.channelName}
              />

              <div className="w-full flex justify-between md:justify-start gap-10">
                <Link href={`/channel/@${user.channelName}`}>
                  <h5 className="-mb-1">{user.channelName}</h5>
                  <span className="font-semibold text-gray-400">
                    {user.subscribers.length} subscribers
                  </span>
                </Link>

                {!isUserProfile && (
                  <SubscribeButton
                    videoId={id.toString()}
                    subscribers={user.subscribers}
                    severity="danger"
                    className="!rounded-full"
                    disabled={isUserProfile}
                  />
                )}
              </div>
            </div>

            <div className="p-buttonset flex h-10 rounded-full overflow-hidden">
              <Button
                severity="secondary"
                icon="pi pi-thumbs-up-fill"
                className="space-x-2 !border-r !border-black"
                tooltip="Like"
                disabled={isUserLikedTheVideo}
                tooltipOptions={{
                  position: "bottom",
                }}
                onClick={async () => {
                  await addLikes([id.toString()]);
                }}
              >
                <span>{likes.length}</span>
              </Button>

              <Button
                severity="secondary"
                icon="pi pi-thumbs-down-fill"
                className="!border-l text-lg !border-black"
                tooltip="Dislike"
                disabled={isUserLikedTheVideo}
                tooltipOptions={{
                  position: "bottom",
                }}
              />
            </div>
          </div>

          <span>{views.length} views</span>

          <div>
            <h5>Description</h5>

            <p
              onClick={() => setShowDescription(!showDescription)}
              className={clsx(
                "whitespace-pre-line",
                !showDescription && "line-clamp-2 cursor-pointer"
              )}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
