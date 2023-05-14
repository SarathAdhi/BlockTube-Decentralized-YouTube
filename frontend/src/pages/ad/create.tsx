import Input from "@components/elements/Input";
import InputFile from "@components/elements/InputFile";
import TextArea from "@components/elements/Textarea";
import Form from "@components/Form";
import { PageLayout } from "@layouts/PageLayout";
import React, { useState } from "react";
import * as y from "yup";
import { Steps } from "primereact/steps";
import { CATEGORY_OPTIONS, VIDEO_TYPES } from "@utils/constants";
import useContractWrite from "@hooks/useContractWrite";
import { useRouter } from "next/router";
import withAuth from "@hoc/withAuth";
import SelectInput from "@components/elements/SelectInput";

const initialValues = {
  title: "",
  websiteLink: "",
  videoUrl: "",
  description: "",
  category: "",
};

const schema = y.object().shape({
  title: y
    .string()
    .max(100, "Title must be below 100 characters")
    .required("Title is required"),
  websiteLink: y.string().required("Website Link is required"),
  videoUrl: y.string().required("Video is required"),
  description: y.string().required("Description is required"),
  category: y.string().required("Category is required"),
});

const items = [
  {
    label: "Upload Video",
  },
  {
    label: "Video Details",
  },
];

const CreateAds = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const { mutateAsync } = useContractWrite("uploadAdVideo", "blocktubeAds");

  return (
    <PageLayout title="Upload Video" className="flex flex-col " isAdPage>
      <Form
        className="mt-5 bg-black p-2 sm:p-4 rounded-lg"
        initialValues={initialValues}
        schema={schema}
        onSubmit={async (values) => {
          await mutateAsync(
            [
              values.title,
              values.websiteLink,
              values.videoUrl,
              values.description,
              values.category,
            ],
            "Video Uploaded"
          );

          router.replace("/ad/profile");
        }}
        submitButton={{ title: activeIndex === 1 ? "Upload" : "" }}
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
            maxFileSize={100000000}
            required
          />
        ) : (
          <Form.Row>
            <Input
              label="Title"
              name="title"
              placeholder="Enter your title"
              required
            />

            <Input
              label="Website Link"
              name="websiteLink"
              placeholder="Enter your website link"
              required
            />

            <TextArea
              label="Description"
              name="description"
              placeholder="Enter your Description"
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
    </PageLayout>
  );
};

export default withAuth(CreateAds, false, "", true);
