"use client";

import { categories } from "@/app/constants/categories";
import { FC } from "react";
import { useWatch } from "react-hook-form";
import Heading from "../../../common/Heading";
import CategoryInput from "../components/CategoryInput";
import { useRentContext } from "../controller";

interface CategoryStepProps {}

const CategoryStep: FC<CategoryStepProps> = ({}) => {
  const { formController } = useRentContext();
  const formCategory = useWatch({
    control: formController.control,
    name: "category",
  });

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((category) => {
          return (
            <div key={category.label} className="cols-span-1">
              <CategoryInput
                icon={category.icon}
                label={category.label}
                onClick={(category) => {
                  formController.setValue("category", category);
                }}
                selected={formCategory === category.label}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryStep;
