import { useContractReadVal } from "@hooks/useContractRead";
import { PageLayout } from "@layouts/PageLayout";
import ProfilePage from "@modules/Channel";
import { useStore } from "@utils/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ViewChannel = () => {
  const { user } = useStore();

  const router = useRouter();
  const name = `${router.query?.id}`.split("@")[1];

  const { data, isLoading } = useContractReadVal(
    "getChannel",
    "blocktube",
    name
  );

  console.log({ data });

  useEffect(() => {
    if (name === user?.channelName) router.replace("/channel/my");
  }, [name]);

  return (
    <PageLayout title="Channel">
      <ProfilePage user={data} isLoading={isLoading} />
    </PageLayout>
  );
};

export default ViewChannel;
