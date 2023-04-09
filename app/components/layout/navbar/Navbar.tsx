"use client";

import { FC } from "react";
import { useElementSize } from "usehooks-ts";
import Container from "../../common/Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const [ref, size] = useElementSize();

  return (
    <>
      <div ref={ref} className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b">
          <Container>
            <div className="flex items-center justify-between gap-3 md:gap-0">
              <Logo />
              <Search />
              <UserMenu />
            </div>
          </Container>
        </div>

        <Categories />
      </div>

      <div style={{ height: size.height }}></div>
    </>
  );
};

export default Navbar;
