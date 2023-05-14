import VideoContainer from "common/modules/Video/Container";
import { useContractRead } from "@hooks/useContractRead";
import { PageLayout } from "@layouts/PageLayout";

export default function Home() {
  const { data, isLoading } = useContractRead("getAllVideos");

  console.log({ data });
  return (
    <PageLayout title="Home">
      <VideoContainer isLoading={isLoading} videos={data} />
    </PageLayout>
  );
}
