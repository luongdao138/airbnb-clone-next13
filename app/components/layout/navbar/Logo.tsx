"use client";

import Image from "next/image";
import { FC } from "react";
import Link from "next/link";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <Link href="/">
      <Image
        alt="app-logo"
        className="hidden md:block cursor-pointer"
        height={100}
        width={100}
        src="/images/logo.png"
      />
    </Link>
  );
};

export default Logo;
