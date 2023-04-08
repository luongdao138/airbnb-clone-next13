"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { FC } from "react";
import { toast } from "react-hot-toast";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUploadSuccess = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <CldUploadWidget
      onUpload={handleUploadSuccess}
      onError={() => {
        toast.error("Upload image failed!");
      }}
      signatureEndpoint="/api/cloudinary/presigned"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        function handleOnClick(e: React.MouseEvent<HTMLDivElement>) {
          e.preventDefault();
          open?.();
        }
        return (
          <div
            onClick={handleOnClick}
            className="relative cursor-pointer hover:opacity-70 transation border border-dashed p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>

            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="upload-img"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
