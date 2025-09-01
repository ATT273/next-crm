"use client";
import Link from "next/link";
import { logOut } from "@/app/(auth)/authenticate/actions";
import { getLocalUser } from "@/utils/session";
import UserControlPanel from "./user-controlpanel";
import { CogIcon } from "../icons/cog";
import { User as UserIcon } from "@/components/icons/user";
import { Logout } from "@/components/icons/logout";
import { useEffect, useState } from "react";
import { MENU } from "@/constants";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

const menus = MENU;

const Sidebar = () => {
  const [localUser, setLocalUser] = useState(null);
  useEffect(() => {
    const _localUser = getLocalUser();
    setLocalUser(_localUser);
  }, []);
  return (
    <div className="flex flex-col justify-between md:w-[15rem] h-dvh shadow-md absolute top-0 left-0 z-10 p-3">
      <ul className="p-2">
        {menus.map((menu) => (
          <Link href={menu.href} key={menu.title}>
            <li className="p-2 font-semibold rounded-sm hover:bg-slate-200">
              {menu.title}
            </li>
          </Link>
        ))}
      </ul>
      <div className="w-full flex justify-between items-center">
        <UserControlPanel user={localUser} />
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light" className="hover:bg-transparent">
              <CogIcon className="size-7 hover:animate-[spin_2s]" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem
              href="/profile"
              key="profile"
              startContent={<UserIcon className="size-7" />}
            >
              <p className="font-semibold">Profile</p>
            </DropdownItem>
            <DropdownItem
              key="logout"
              onClick={() => logOut()}
              startContent={<Logout className="size-7" />}
            >
              <p className="font-semibold">Logout</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Sidebar;
