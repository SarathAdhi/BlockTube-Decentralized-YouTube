import SubscribeButton from "@components/elements/SubscribeButton";
import useContractWrite from "@hooks/useContractWrite";
import { useAddress } from "@thirdweb-dev/react";
import { Button } from "primereact/button";
import React from "react";
import { User } from "types/user";

type Props = {
  setVisible: (visible: boolean) => void;
};

const UserSection: React.FC<Props & User> = ({
  username,
  channelName,
  coverImage,
  profileImage,
  subscribers,
  walletId,
  setVisible,
  id,
}) => {
  const address = useAddress();

  const isUserProfile = address?.toLowerCase() === walletId?.toLowerCase();

  const isUserAlreadySubscribed = subscribers?.some(
    (sub) => sub.toLowerCase() === address?.toLowerCase()
  );

  return (
    <div className="bg-black relative grid rounded-lg overflow-hidden">
      <img
        src={coverImage}
        className="w-full h-60 object-cover"
        alt={`Cover Image | ${channelName}`}
      />

      <div className="p-4 w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-5">
          {profileImage ? (
            <img
              src={profileImage}
              className="w-24 h-24 rounded-full object-cover"
              alt={`Profile Image | ${channelName}`}
            />
          ) : (
            <span className="w-24 h-24 rounded-full bg-gray-700" />
          )}

          <div className="text-center md:text-left">
            <h2>{channelName}</h2>

            {channelName && (
              <label className="text-gray-400 font-semibold">
                {subscribers.length} subscribers
              </label>
            )}
          </div>
        </div>

        <SubscribeButton
          videoId={id.toString()}
          subscribers={subscribers}
          severity="danger"
          disabled={isUserProfile || isUserAlreadySubscribed}
        >
          {isUserAlreadySubscribed
            ? "Subscribed"
            : isUserProfile
            ? `${subscribers.length} Subscribers`
            : "Subscribe"}
        </SubscribeButton>

        <button
          className="!absolute top-2 right-2 w-10 h-10 bg-gray-500 p-3 rounded-full"
          onClick={() => setVisible(true)}
        >
          <i className="pi pi-pencil !text-lg" />
        </button>
      </div>
    </div>
  );
};

export default UserSection;
