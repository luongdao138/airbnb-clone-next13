"use client";

import Image from "next/image";
import { FC } from "react";
import { useRouter } from "next/navigation";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  const router = useRouter();

  return (
    <Image
      alt="app-logo"
      className="hidden md:block cursor-pointer"
      height={100}
      width={100}
      src="/images/logo.png"
    />
  );
};

export default Logo;
