"use client";

import Heading from "@/app/components/common/Heading";
import ImageUpload from "@/app/components/common/ImageUpload";
import { FC } from "react";
import { useWatch } from "react-hook-form";
import { useRentContext } from "../controller";

interface ImagesStepProps {}

const ImagesStep: FC<ImagesStepProps> = ({}) => {
  const { formController } = useRentContext();

  const image = useWatch({ control: formController.control, name: "imageSrc" });

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like"
      />

      <ImageUpload
        value={image}
        onChange={(val) => {
          formController.setValue("imageSrc", val);
        }}
      />
    </div>
  );
};

export default ImagesStep;
