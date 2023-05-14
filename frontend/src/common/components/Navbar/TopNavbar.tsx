import React, { useRef } from "react";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import Link from "next/link";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useRouter } from "next/router";

const TopNavbar = () => {
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  const router = useRouter();

  const menu = useRef<Menu>(null);

  const items: MenuItem[] = [
    {
      label: "My Channel",
      icon: "pi pi-user",
      command: () => router.push("/channel/my"),
    },
    {
      label: "Ad Manager",
      icon: "pi pi-users",
      command: () => router.push("/ad/profile"),
    },
    {
      label: "Sign Out",
      icon: "pi pi-upload rotate-90",
      command: () => {
        disconnect();
      },
    },
  ];

  return (
    <header className="sticky z-50 top-0 w-full bg-[#111] border-b border-b-gray-600">
      <div className="p-2 md:p-5 flex items-center justify-between">
        <Link href="/">
          <Image
            width={200}
            height={200}
            className="w-20"
            src="/logo.svg"
            alt="BlockTube Logo"
          />
        </Link>

        <div className="absolute hidden md:block left-[50%] -translate-x-1/2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText className="w-auto focus:w-96 !rounded-full !py-2 !duration-500 !transition-all" />
          </span>
        </div>

        <div className="flex items-center  gap-5">
          <button className="!block md:!hidden">
            <i className="pi pi-search" />
          </button>

          {address ? (
            <>
              <Link href="/video/upload">
                <i className="pi pi-video !text-lg" />
              </Link>

              <Button onClick={(e) => menu!.current!.toggle(e)} color="green">
                {address.slice(0, 4)}...{address.slice(-4)}
              </Button>
              <Menu className="mt-1" model={items} popup ref={menu} />
            </>
          ) : (
            <Button severity="help" onClick={connect}>
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
