import Input from "@/app/components/common/form/Input";
import Heading from "@/app/components/common/Heading";
import { getInputVariant } from "@/app/utils/error";
import { FC } from "react";
import { Controller } from "react-hook-form";
import { useRentContext } from "../controller";

interface PriceStepProps {}

const PriceStep: FC<PriceStepProps> = ({}) => {
  const { formController } = useRentContext();

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Now, set your price"
        subtitle="How much do you charge per night?"
      />

      <Controller
        control={formController.control}
        name="price"
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            format="price"
            placeholder="Price"
            variant={getInputVariant(formController.errors, "price")}
          />
        )}
      />
    </div>
  );
};

export default PriceStep;
