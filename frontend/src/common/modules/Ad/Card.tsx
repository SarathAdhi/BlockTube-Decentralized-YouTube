import Link from "next/link";
import React, { useState } from "react";
import { Tag } from "primereact/tag";
import { AdVideo } from "types/ad";
import { Button } from "primereact/button";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import Form from "@components/Form";
import InputNumber from "@components/elements/InputNumber";
import * as y from "yup";
import { ethers } from "ethers";

const schema = y.object().shape({
  amt: y.number().required("Amount is required"),
});

type Props = {} & AdVideo;

const AdCard: React.FC<Props> = ({
  id,
  title,
  bidAmount,
  category,
  videoUrl,
  websiteLink,
  owner,
}) => {
  const [showBidOption, setShowBidOption] = useState(false);

  const address = useAddress();
  const isOwner = address?.toLowerCase() === owner.toLowerCase();

  const { contract } = useContract(process.env.ADS_CONTRACT_ADDRESS!);

  return (
    <div className="grid gap-2">
      <div className="relative">
        <video className="rounded-md" controls>
          <source src={videoUrl} />
        </video>

        <Tag
          value={category}
          severity="info"
          className="absolute top-2 right-2"
        />
      </div>

      <div className="grid gap-2 place-items-start">
        <h4 className="line-clamp-2">{title}</h4>

        <p className="w-full text-sm font-bold text-gray-500 truncate">
          {owner}
        </p>

        <div className="w-full flex justify-between">
          <Link href={websiteLink} target="_blank" className="hover:underline">
            Visit <i className="pi pi-external-link ml-1" />
          </Link>

          <div>
            <p className="text-base font-semibold">
              {bidAmount.toString()} MATIC
            </p>
          </div>
        </div>

        {isOwner && (
          <Button
            className="w-full !mt-2"
            severity="success"
            onClick={() => setShowBidOption(!showBidOption)}
          >
            BID to this Ad
          </Button>
        )}

        {showBidOption && (
          <div className="w-full mt-2">
            <Form
              className="!gap-2"
              schema={schema}
              initialValues={{
                amt: "",
              }}
              onSubmit={async (values) => {
                await contract?.call("bidAd", id.toString(), {
                  value: ethers.utils.parseUnits(`${values.amt}`),
                });
              }}
              submitButton={{ title: "BID" }}
            >
              <InputNumber
                name="amt"
                suffix=" MATIC"
                showButtons
                buttonLayout="horizontal"
                step={0.05}
                decrementButtonClassName="p-button-danger"
                incrementButtonClassName="p-button-success"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
              />
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdCard;
