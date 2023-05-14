import { BigNumber } from "ethers";

export type Manager = {
  id: string;
  companyName: string;
  profileImage: string;
  walletId: string;
};

export type AdVideo = {
  id: any;
  owner: string;
  title: string;
  bidAmount: BigNumber;
  description: string;
  videoUrl: string;
  websiteLink: string;
  category: string;
};

export type AdVideoProps = AdVideo & Manager;
