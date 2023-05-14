import Input from "@components/elements/Input";
import InputFile from "@components/elements/InputFile";
import TextArea from "@components/elements/Textarea";
import Form from "@components/Form";
import { PageLayout } from "@layouts/PageLayout";
import React, { useRef, useState } from "react";
import * as y from "yup";
import { Steps } from "primereact/steps";
import { CATEGORY_OPTIONS, VIDEO_TYPES } from "@utils/constants";
import InputChips from "@components/elements/InputChips";
import useContractWrite from "@hooks/useContractWrite";
import { useRouter } from "next/router";
import withAuth from "@hoc/withAuth";
import SelectInput from "@components/elements/SelectInput";
import { uuid } from "@utils/uuid";
import { Toast } from "primereact/toast";
import { MenuItem } from "primereact/menuitem";

const initialValues = {
  title: "",
  videoUrl: "",
  thumbnailUrl: "",
  description: "",
};

const schema = y.object().shape({
  title: y
    .string()
    .max(100, "Title must be below 100 characters")
    .required("Title is required"),
  videoUrl: y.string().required("Video is required"),
  thumbnailUrl: y.string().required("Thumbnail is required"),
  description: y.string().required("Description is required"),
  tags: y.array().min(1).required("Tags is required"),
});

const UploadVideo = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoStatusSuccess, setIsVideoStatusSuccess] = useState(false);
  const toast = useRef<Toast>(null);

  const items: MenuItem[] = [
    {
      label: "Upload Video",
    },
    {
      label: "Upload Thumbnail",
      disabled: !isVideoStatusSuccess,
    },
    {
      label: "Video Details",
      disabled: !isVideoStatusSuccess,
    },
  ];

  const { mutateAsync } = useContractWrite("uploadVideo");

  return (
    <PageLayout title="Upload Video" className="flex flex-col ">
      <Form
        className="mt-5 bg-black p-2 sm:p-4 rounded-lg border"
        initialValues={initialValues}
        schema={schema}
        onSubmit={async (values) => {
          await mutateAsync(
            [
              uuid(),
              values.title,
              values.videoUrl,
              values.thumbnailUrl,
              values.description,
              values.tags,
              values.category,
            ],
            "Video Uploaded"
          );

          router.replace("/");
        }}
        submitButton={{ title: activeIndex === 2 ? "Upload" : "" }}
      >
        <Steps
          model={items}
          activeIndex={activeIndex}
          onSelect={(e) => setActiveIndex(e.index)}
          readOnly={false}
          className="!font-semibold"
        />

        {activeIndex === 0 ? (
          <InputFile
            key="video"
            accept="video/*"
            label="Upload your Video"
            name="videoUrl"
            fileType={VIDEO_TYPES}
            getFileUrl={(url) => {
              console.log({ url });
              setIsVideoStatusSuccess(true);
            }}
            maxFileSize={100000000}
            required
          />
        ) : activeIndex === 1 ? (
          <InputFile
            key="image"
            accept="image/*"
            label="Upload your Thumbnail"
            name="thumbnailUrl"
            required
          />
        ) : (
          <Form.Row>
            <Input
              label="Title"
              name="title"
              placeholder="Enter your Title"
              required
            />

            <TextArea
              label="Description"
              name="description"
              placeholder="Enter your Description"
              required
            />

            <InputChips
              label="Tags"
              name="tags"
              separator=","
              placeholder="Education, Gaming"
              required
            />

            <SelectInput
              label="Category"
              name="category"
              placeholder="Select a category"
              options={CATEGORY_OPTIONS}
            />
          </Form.Row>
        )}
      </Form>

      <Toast ref={toast} />
    </PageLayout>
  );
};

export default withAuth(UploadVideo, true);
