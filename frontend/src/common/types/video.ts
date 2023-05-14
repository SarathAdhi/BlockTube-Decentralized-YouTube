import { User } from "./user";

export type Video = {
  uuid: string;
  id: any;
  owner: string;
  description: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  views: string[];
  likes: string[];
  dislikes: string[];
  category: string;
};

export type VideoProps = Video & User;
