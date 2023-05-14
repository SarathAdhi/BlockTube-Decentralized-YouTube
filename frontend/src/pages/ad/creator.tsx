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
  companyName: "",
  companyImg: "",
};

const schema = y.object().shape({
  companyName: y.string().required("Channel Name is required"),
  companyImg: y.string().required("Company Image is required"),
});

const AdCreator = () => {
  const router = useRouter();
  const { isAdManager } = useStore();
  const { mutateAsync } = useContractWrite("createManager", "blocktubeAds");

  useEffect(() => {
    if (isAdManager) router.replace("/ad");
  }, []);

  return (
    <PageLayout title="Ads Manager | Creator" isAdPage>
      <Form
        initialValues={initialValues}
        schema={schema}
        onSubmit={async (values) => {
          const valuesInArray = Object.values(values);

          console.log(valuesInArray);

          await mutateAsync(valuesInArray, "You are now a Ads Manager");
          router.replace("/ad/profile");
        }}
        submitButton={{ title: "Upload" }}
      >
        <Input
          label="Company Name"
          name="companyName"
          placeholder="Enter a company name"
          required
        />

        <InputFile
          label="Company Image"
          name="companyImg"
          accept="image/*"
          maxFileSize={100000000}
          required
        />
      </Form>
    </PageLayout>
  );
};

export default AdCreator;
