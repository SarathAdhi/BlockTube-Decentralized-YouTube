import { PageLayout } from "@layouts/PageLayout";
import React from "react";
import ProfilePage from "@modules/Channel";
import withAuth from "@hoc/withAuth";
import { useStore } from "@utils/store";

const ViewProfile = () => {
  const { user } = useStore();

  return (
    <PageLayout title="My Channel">
      <ProfilePage user={user} />
    </PageLayout>
  );
};

export default withAuth(
  ViewProfile,
  true,
  "Create a CREATOR account to view channel"
);

// [
//   "Sarath Adhithya",
//   "SarathYT",
//   "https://ipfs.io/ipfs/QmfRkiN66XZRvrhguMPzcUfFFrgp1DjBQWs4r2mCHoiWDa",
//   "https://ipfs.io/ipfs/Qmd6NwTa8wRJ9dVio3HduAxpiPcqbo2ZbcesvxYY9xHh9E"
// ]
