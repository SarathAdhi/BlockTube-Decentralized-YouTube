import VideoContainer from "common/modules/Video/Container";
import { useContractRead } from "@hooks/useContractRead";
import { PageLayout } from "@layouts/PageLayout";
import { VideoProps } from "types/video";
import { useRouter } from "next/router";

export default function Home() {
  const { query } = useRouter();

  const { data, isLoading } = useContractRead("getAllVideos");

  const videos = (data ? data : []) as VideoProps[];

  const filteredVideos = videos.filter((e) =>
    query?.q ? e.title.toLowerCase().includes(`${query?.q}`.toLowerCase()) : e
  );

  console.log({ filteredVideos, q: query?.q });

  return (
    <PageLayout title="Home">
      <VideoContainer isLoading={isLoading} videos={filteredVideos} />
    </PageLayout>
  );
}
