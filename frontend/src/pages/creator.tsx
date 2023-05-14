import Input from "@components/elements/Input";
import InputFile from "@components/elements/InputFile";
import Form, { FormProps } from "@components/Form";
import useContractWrite from "@hooks/useContractWrite";
import { PageLayout } from "@layouts/PageLayout";
import { useStore } from "@utils/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as y from "yup";

const initialValues = {
  username: "",
  channelName: "",
  profileImg: "",
  coverImg: "",
};

const schema = y.object().shape({
  username: y.string().required("Username is required"),
  channelName: y.string().required("Channel Name is required"),
  profileImg: y.string().required("Profile Image is required"),
  coverImg: y.string().required("Cover Image is required"),
});

type InternalFormProps = {
  mutateAsyncFunc: (values: any[]) => Promise<void>;
  initialValues: FormProps["initialValues"];
  className?: string;
  submitButton?: FormProps["submitButton"];
};

export const InternalCreatorForm = ({
  mutateAsyncFunc,
  initialValues,
  className,
  submitButton,
}: InternalFormProps) => (
  <Form
    className={className}
    initialValues={initialValues}
    schema={schema}
    onSubmit={async (values) => {
      const valuesInArray = Object.values(values);

      console.log(valuesInArray);

      mutateAsyncFunc(valuesInArray);
    }}
    submitButton={submitButton}
  >
    <Input
      label="Username"
      name="username"
      placeholder="Enter a username"
      required
    />

    <Input
      label="Channel Name"
      name="channelName"
      placeholder="Enter a channel name"
      required
    />

    <Form.Grid>
      <InputFile
        accept="image/*"
        label="Profile Image"
        name="profileImg"
        maxFileSize={100000000}
        required
      />

      <InputFile
        accept="image/*"
        label="Cover Image"
        name="coverImg"
        maxFileSize={100000000}
        required
      />
    </Form.Grid>
  </Form>
);

const CreatorPage = () => {
  const router = useRouter();
  const { isCreator } = useStore();
  const { mutateAsync } = useContractWrite("createChannel");

  useEffect(() => {
    if (isCreator) router.replace("/channel/my");
  }, []);

  console.log({ isCreator });

  return (
    <PageLayout title="Creator">
      <InternalCreatorForm
        initialValues={initialValues}
        mutateAsyncFunc={async (valuesInArray) => {
          await mutateAsync(valuesInArray, "You are now a CREATOR");
          router.replace("/channel/my");
        }}
        submitButton={{ title: "Create" }}
      />
    </PageLayout>
  );
};

export default CreatorPage;
