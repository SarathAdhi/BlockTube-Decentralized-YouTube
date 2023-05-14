import Link from "next/link";
import { MenuItem } from "primereact/menuitem";
import React, { useRef } from "react";
import { VideoProps } from "types/video";
import { ContextMenu } from "primereact/contextmenu";
import { useAddress } from "@thirdweb-dev/react";
import { Button } from "primereact/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

type Props = {
  deleteVideo: (values: any[]) => Promise<any>;
} & VideoProps;

const VideoCard: React.FC<Props> = ({
  id,
  title,
  thumbnailUrl,
  channelName,
  profileImage,
  views,
  deleteVideo,
  owner,
}) => {
  const { asPath } = useRouter();

  const address = useAddress();
  const isOwner = address?.toLowerCase() === owner.toLowerCase();

  return (
    <Link
      href={`/video/${id.toNumber()}`}
      className="group relative grid gap-2"
    >
      {isOwner && asPath.includes("channel") && (
        <Button
          className="!absolute top-2 right-2 !opacity-0 group-hover:!opacity-100"
          severity="danger"
          icon="pi pi-trash"
          onClick={async (e) => {
            e.preventDefault();

            try {
              await deleteVideo([id]);
              toast.success("Video deleted successfully");
            } catch (error) {}
          }}
        />
      )}

      <img className="w-full rounded-lg" src={thumbnailUrl} alt={title} />

      <div className="flex gap-4">
        <img
          src={profileImage}
          className="w-10 h-10 rounded-full flex-shrink-0"
          alt={channelName}
        />

        <div className="grid gap-1">
          <h5 className="line-clamp-2 leading-tight">{title}</h5>

          <div>
            <Link
              href={`/channel/@${channelName}`}
              className="text-sm font-semibold hover:underline"
            >
              {channelName}
            </Link>

            <p className="text-sm font-semibold">{views.length} views</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
