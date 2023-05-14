import React, { useState } from "react";
import { User } from "types/user";
import { Dialog } from "primereact/dialog";
import useContractWrite from "@hooks/useContractWrite";
import UserSection from "@modules/Channel/UserSection";
import { InternalCreatorForm } from "pages/creator";
import LoadingPage from "@components/LoadingPage";
import VideoContainer from "@modules/Video/Container";
import { useContractRead } from "@hooks/useContractRead";
import { VideoProps } from "types/video";

const ProfilePage = ({
  user,
  isLoading = false,
}: {
  user: User | null;
  isLoading?: boolean;
}) => {
  const [visible, setVisible] = useState(false);
  const { mutateAsync } = useContractWrite("updateChannel");

  const { data, isLoading: isVideoLoading } = useContractRead("getAllVideos");

  if (isLoading) return <LoadingPage className="!h-[200px]" size="small" />;
  if (!user?.channelName)
    return <h2 className="text-center">Channel not found</h2>;

  const {
    username,
    channelName,
    coverImage,
    profileImage,
    subscribers,
    walletId,
  } = user as User;

  const initialValues = {
    username,
    channelName,
    profileImg: profileImage,
    coverImg: coverImage,
    walletId,
  };

  const videos = data as VideoProps[];

  return (
    <div className="grid gap-4">
      {user?.username && <UserSection setVisible={setVisible} {...user} />}

      <VideoContainer
        isLoading={isVideoLoading}
        videos={videos?.filter((e) => e.owner === walletId)}
      />

      <Dialog
        header="Header"
        visible={visible}
        className="w-full lg:w-1/2 p-2"
        contentClassName="!p-0 !bg-[#111]"
        headerClassName="!bg-black !text-white"
        onHide={() => setVisible(false)}
        draggable={false}
        maximizable
      >
        <InternalCreatorForm
          className="bg-[#111] p-5"
          initialValues={initialValues}
          mutateAsyncFunc={async (valuesInArray) =>
            await mutateAsync(valuesInArray, "Profile updated successfully")
          }
          submitButton={{ title: "Update" }}
        />
      </Dialog>
    </div>
  );
};

export default ProfilePage;

// [
//   "Sarath Adhithya",
//   "SarathYT",
//   "https://ipfs.io/ipfs/QmfRkiN66XZRvrhguMPzcUfFFrgp1DjBQWs4r2mCHoiWDa",
//   "https://ipfs.io/ipfs/Qmd6NwTa8wRJ9dVio3HduAxpiPcqbo2ZbcesvxYY9xHh9E"
// ]
