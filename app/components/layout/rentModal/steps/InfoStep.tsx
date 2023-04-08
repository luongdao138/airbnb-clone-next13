import Heading from "@/app/components/common/Heading";
import { FC } from "react";
import { useWatch } from "react-hook-form";
import Counter from "../../../common/Counter";
import { useRentContext } from "../controller";

interface InfoStepProps {}

const InfoStep: FC<InfoStepProps> = ({}) => {
  const { formController } = useRentContext();

  const guestCount = useWatch({
    control: formController.control,
    name: "guestCount",
  });
  const roomCount = useWatch({
    control: formController.control,
    name: "roomCount",
  });
  const bathroomCount = useWatch({
    control: formController.control,
    name: "bathroomCount",
  });

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your place"
        subtitle="What amenities do you have"
      />

      <Counter
        title="Number of guests"
        subtitle="How many guests do you allow?"
        value={guestCount}
        onChange={(val) => {
          formController.setValue("guestCount", val);
        }}
      />
      <hr />
      <Counter
        title="Rooms"
        subtitle="How many rooms do you allow?"
        value={roomCount}
        onChange={(val) => {
          formController.setValue("roomCount", val);
        }}
      />
      <hr />
      <Counter
        title="Bathrooms"
        subtitle="How many bathrooms do you allow?"
        value={bathroomCount}
        onChange={(val) => {
          formController.setValue("bathroomCount", val);
        }}
      />
    </div>
  );
};

export default InfoStep;
