import AdsNavbar from "@components/Navbar/AdsNavbar";
import TopNavbar from "@components/Navbar/TopNavbar";
import clsx from "clsx";
import Head from "next/head";
import React from "react";
import { Component } from "types/components";

type Props = {
  title: string;
  isAdPage?: boolean;
};

export const PageLayout: React.FC<Props & Component> = ({
  title,
  isAdPage,
  className,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="w-full min-h-screen flex flex-col">
        {isAdPage ? <AdsNavbar /> : <TopNavbar />}

        <div className={clsx("w-full p-3 md:p-5 flex-1", className)}>
          {children}
        </div>
      </main>
    </>
  );
};
