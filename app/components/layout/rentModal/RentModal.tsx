"use client";

import { useRentStore } from "@/app/zustand/rentStore";
import { FC, useMemo } from "react";
import Modal from "../../common/modal/Modal";
import CategoryStep from "./steps/CategoryStep";
import { RentSteps, useRentContext } from "./controller";
import LocationStep from "./steps/LocationStep";
import InfoStep from "./steps/InfoStep";
import ImagesStep from "./steps/ImagesStep";

interface RentModalProps {}

const RentModal: FC<RentModalProps> = ({}) => {
  const { isOpenRentModal, closeRentModal } = useRentStore();
  const { currentStep, moveBackward, formController } = useRentContext();
  const isFirstStep = currentStep === RentSteps.CATEGORY;
  const isLastStep = currentStep === RentSteps.PRICE;

  const actionLabel = useMemo(() => {
    if (isLastStep) {
      return "Create";
    }

    return "Next";
  }, [isLastStep]);

  const secondaryActionLabel = useMemo(() => {
    if (isFirstStep) {
      return undefined;
    }

    return "Back";
  }, [isFirstStep]);

  const renderStep = () => {
    switch (currentStep) {
      case RentSteps.CATEGORY:
        return <CategoryStep />;

      case RentSteps.LOCATION:
        return <LocationStep />;

      case RentSteps.INFO:
        return <InfoStep />;
      case RentSteps.IMAGES:
        return <ImagesStep />;

      default:
        return <></>;
    }
  };

  return (
    <Modal
      title="Airbnb your home!"
      isOpen={isOpenRentModal}
      onClose={closeRentModal}
      onSubmit={formController.onSubmit}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={isFirstStep ? undefined : moveBackward}
    >
      {renderStep()}
    </Modal>
  );
};

export default RentModal;
