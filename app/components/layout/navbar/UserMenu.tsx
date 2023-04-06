"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { FC } from "react";
import Avatar from "../../common/Avatar";
import { useToggle } from "@/app/utils/hooks/useToggle";
import MenuItem from "./MenuItem";
import { useAuthStore } from "@/app/zustand/authStore";

interface UserMenuProps {}

const UserMenu: FC<UserMenuProps> = ({}) => {
  const authStore = useAuthStore();
  const { state: isOpenMenu, toggle: toggleOpenMenu } = useToggle();

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>

        <div
          className="p-4 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpenMenu}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpenMenu && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem label={"Login"} onClick={() => {}} />
              <MenuItem label={"Register"} onClick={authStore.openAuthModal} />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
