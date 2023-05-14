import { useContractReadVal } from "@hooks/useContractRead";
import { ethers } from "ethers";
import Link from "next/link";
import React from "react";
import { AdVideo } from "types/ad";

type Props = {
  owner: string;
  ads: AdVideo[];
  category: string;
};

const AdVideoPlayer: React.FC<Props> = ({ owner, ads = [], category }) => {
  const { data: adOwnerProfile, isLoading: isAdOwnerProfileLoading } =
    useContractReadVal("getManagerProfile", "blocktubeAds", owner);

  if (isAdOwnerProfileLoading) return <></>;

  const _ads = (ads as AdVideo[]).map((e) => ({
    ...e,
    bidAmount: parseFloat(ethers.utils.formatEther(e.bidAmount)),
  }));

  const sortedAds = _ads?.sort((a, b) => b.bidAmount - a.bidAmount);

  const categoryAds = sortedAds?.filter((e) => e.category === category);
  const selectedAd = categoryAds[0];

  console.log({ adOwnerProfile });
  return (
    <>
      <video autoPlay muted>
        <source src={selectedAd?.videoUrl} />
      </video>

      <div className="py-2 px-4 absolute bottom-2 left-2 bg-[#111] backdrop-blur-lg rounded-md flex items-center gap-2">
        <img
          src={adOwnerProfile?.companyImg}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p>{selectedAd.title}</p>

          <Link className="text-blue-500" href={selectedAd.websiteLink}>
            {selectedAd.websiteLink}
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdVideoPlayer;
