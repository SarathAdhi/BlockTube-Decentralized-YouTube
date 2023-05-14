import { Manager } from "types/ad";
import { User } from "types/user";
import { create } from "zustand";

type UseStore = {
  user: User | null;
  isCreator: boolean;
  setMyProfile: (user: User, cb?: () => void) => void;

  adAccount: Manager | null;
  isAdManager: boolean;
  setMyAdProfile: (user: Manager, cb?: () => void) => void;
};

export const useStore = create<UseStore>((set) => ({
  user: null,
  isCreator: false,
  setMyProfile: ({ ...rest }, cb) => {
    if (rest && rest.username) {
      set({ user: { ...rest }, isCreator: rest.channelName !== "" });
    }

    cb?.();
  },

  adAccount: null,
  isAdManager: false,
  setMyAdProfile: ({ ...rest }, cb) => {
    if (rest && rest.companyName) {
      set({ adAccount: { ...rest }, isAdManager: rest.companyName !== "" });
    }

    cb?.();
  },
}));
