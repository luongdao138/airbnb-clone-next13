"use client";

import { useRentStore } from "@/app/zustand/rentStore";
import { FC, useMemo } from "react";
import Modal from "../../common/modal/Modal";
import CategoryStep from "./steps/CategoryStep";
import { RentFormState, RentSteps, useRentContext } from "./controller";
import LocationStep from "./steps/LocationStep";
import InfoStep from "./steps/InfoStep";
import ImagesStep from "./steps/ImagesStep";
import DescriptionStep from "./steps/DescriptionStep";
import PriceStep from "./steps/PriceStep";
import { FieldPath } from "react-hook-form";
import ErrorMessage from "../../common/ErrorMessage";

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

  function getError() {
    if (!Object.keys(formController.errors)) return null;
    const errorKey = Object.keys(
      formController.errors
    )[0] as FieldPath<RentFormState>;

    return formController.errors[errorKey]?.message;
  }

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

      case RentSteps.DESCRIPTION:
        return <DescriptionStep />;

      case RentSteps.PRICE:
        return <PriceStep />;

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
      {getError() && (
        <div className="mt-4">
          <ErrorMessage center message={getError() as string} />
        </div>
      )}
    </Modal>
  );
};

export default RentModal;
