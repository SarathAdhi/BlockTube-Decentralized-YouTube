import useContractWrite from "@hooks/useContractWrite";
import { useAddress } from "@thirdweb-dev/react";
import clsx from "clsx";
import { Button, ButtonProps } from "primereact/button";
import React from "react";
import { User } from "types/user";

interface Props extends ButtonProps {
  videoId: string;
  subscribers: User["subscribers"];
}

const SubscribeButton: React.FC<Props> = ({
  videoId,
  subscribers,
  children,
  onClick,
  className,
  disabled,
  ...rest
}) => {
  const address = useAddress();
  const { mutateAsync, isLoading } = useContractWrite("addSubscribe");

  const isUserAlreadySubscribed = subscribers?.some(
    (sub) => sub.toLowerCase() === address?.toLowerCase()
  );
  return (
    <Button
      onClick={async (e) => {
        if (!isUserAlreadySubscribed) {
          await mutateAsync([videoId]);
        }

        onClick?.(e);
      }}
      severity="danger"
      className={clsx("gap-2", className)}
      loading={isLoading}
      disabled={isUserAlreadySubscribed || disabled}
      {...rest}
    >
      {children
        ? children
        : isUserAlreadySubscribed
        ? "Subscribed"
        : "Subscribe"}
    </Button>
  );
};

export default SubscribeButton;
