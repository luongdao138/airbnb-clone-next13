"use client";

import { AiOutlineMenu } from "react-icons/ai";
import { FC } from "react";
import Avatar from "../../common/Avatar";
import { useToggle } from "@/app/utils/hooks/useToggle";
import MenuItem from "./MenuItem";
import { useAuthStore } from "@/app/zustand/authStore";
import { signOut } from "next-auth/react";
import { useRentStore } from "@/app/zustand/rentStore";

interface UserMenuProps {}

const UserMenu: FC<UserMenuProps> = ({}) => {
  const { openRentModal } = useRentStore();
  const { user, openLoginModal, openRegisterModal } = useAuthStore();
  const { state: isOpenMenu, toggle: toggleOpenMenu } = useToggle();

  const handleLogout = () => {
    signOut();
  };

  const onRent = () => {
    if (!user) return openLoginModal();

    // TODO: open rent modal
    openRentModal();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
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
            <Avatar src={user?.image || ""} />
          </div>
        </div>
      </div>

      {isOpenMenu && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <MenuItem label={"My trips"} onClick={() => {}} />
                <MenuItem label={"My favorites"} onClick={() => {}} />
                <MenuItem label={"My reservations"} onClick={() => {}} />
                <MenuItem label={"My reservations"} onClick={() => {}} />
                <MenuItem label={"Airbnb my home"} onClick={openRentModal} />
                <MenuItem label={"Logout"} onClick={handleLogout} />
              </>
            ) : (
              <>
                <MenuItem label={"Login"} onClick={openLoginModal} />
                <MenuItem label={"Register"} onClick={openRegisterModal} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
