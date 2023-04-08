import Input from "@/app/components/common/form/Input";
import Heading from "@/app/components/common/Heading";
import { getInputVariant } from "@/app/utils/error";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { useRentContext } from "../controller";

interface DescriptionStepProps {}

const DescriptionStep: FC<DescriptionStepProps> = ({}) => {
  const { formController } = useRentContext();

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subtitle="Short and sweet works best!"
      />

      <Controller
        control={formController.control}
        name="title"
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Title"
            required
            variant={getInputVariant(formController.errors, "title")}
          />
        )}
      />
      <hr />
      <Controller
        control={formController.control}
        name="description"
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Description"
            required
            variant={getInputVariant(formController.errors, "description")}
          />
        )}
      />
    </div>
  );
};

export default DescriptionStep;
