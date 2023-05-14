import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Component } from "types/components";
import clsx from "clsx";

type Props = {
  size?: "small" | "large";
};

const LoadingPage: React.FC<Props & Component> = ({
  className,
  size = "large",
}) => {
  return (
    <div
      className={clsx(
        "w-full h-screen flex items-center justify-center bg-[#111]",
        className
      )}
    >
      <ProgressSpinner
        className={size === "small" ? "!w-10 !h-10" : "!w-20 !h-20"}
        strokeWidth="4"
        animationDuration=".5s"
      />
    </div>
  );
};

export default LoadingPage;
