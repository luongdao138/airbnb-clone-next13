"use client";

import Image from "next/image";
import { FC, forwardRef, ImgHTMLAttributes } from "react";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Avatar: FC<AvatarProps> = forwardRef<HTMLImageElement, AvatarProps>(
  ({ placeholder, src, ...props }, ref) => {
    return (
      <Image
        {...props}
        ref={ref}
        className="rounded-full"
        width={30}
        height={30}
        alt="avatar"
        src={src || "/images/placeholder.jpg"}
      />
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;
