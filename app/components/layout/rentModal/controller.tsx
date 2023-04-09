"use client";

import { createListing, CreateListingReq } from "@/app/services/rent";
import { handleError } from "@/app/utils/error";
import { rentFormValidator } from "@/app/utils/validators/rent";
import { useRentStore } from "@/app/zustand/rentStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useState } from "react";
import {
  Control,
  FieldErrors,
  FieldPath,
  SetValueConfig,
  SubmitHandler,
  useForm,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";

export enum RentSteps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const maxStep = Math.max(
  ...Object.values(RentSteps)
    .filter((val) => !isNaN(Number(val)))
    .map((val) => Number(val))
);

const minStep = Math.min(
  ...Object.values(RentSteps)
    .filter((val) => !isNaN(Number(val)))
    .map((val) => Number(val))
);

interface RentContextState {
  currentStep: RentSteps;
  moveForward: () => void;
  moveBackward: () => void;
  moveTo: (step: RentSteps) => void;
  formController: {
    control: Control<RentFormState, any>;
    watch: UseFormWatch<RentFormState>;
    setValue: UseFormSetValue<RentFormState>;
    errors: FieldErrors<RentFormState>;
    reset: UseFormReset<RentFormState>;
    onSubmit: () => void;
  };
  isSubmitting: boolean;
}

export interface RentFormState {
  category: string;
  location: string | null;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  title: string;
  description: string;
  price: number;
}

const defaultFormValues: RentFormState = {
  bathroomCount: 1,
  category: "",
  description: "",
  guestCount: 1,
  imageSrc: "",
  location: "",
  roomCount: 1,
  price: 1,
  title: "",
};

const validationMap: { [key: number]: FieldPath<RentFormState>[] } = {
  [RentSteps.CATEGORY]: ["category"],
  [RentSteps.LOCATION]: ["location"],
  [RentSteps.IMAGES]: ["imageSrc"],
  [RentSteps.DESCRIPTION]: ["title", "description"],
  [RentSteps.PRICE]: ["price"],
};

const RentContext = createContext<RentContextState>({} as RentContextState);

export default function Provider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { closeRentModal } = useRentStore((state) => ({
    closeRentModal: state.closeRentModal,
  }));
  const [currentStep, setCurrentStep] = useState<RentSteps>(RentSteps.CATEGORY);

  const {
    control,
    watch,
    setValue,
    formState: { errors },
    reset,
    trigger,
    getValues,
  } = useForm<RentFormState>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(rentFormValidator),
  });

  const { isLoading, mutate } = useMutation(createListing, {
    onSuccess() {
      toast.success("Listing created successfully!");
      reset();
      moveTo(minStep);
      closeRentModal();
    },
    onError(error: any) {
      handleError(error);
    },
  });

  const customSetValue: UseFormSetValue<RentFormState> = useCallback(
    (name, value: any, options?: SetValueConfig) => {
      setValue(name, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
        ...(options || {}),
      });
    },
    [setValue]
  );

  function moveForward() {
    if (currentStep < maxStep) {
      setCurrentStep((prev) => prev + 1);
    }
  }

  function moveBackward() {
    if (currentStep > minStep) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  function moveTo(step: RentSteps) {
    if (currentStep >= minStep && currentStep <= maxStep) {
      setCurrentStep(step);
    }
  }

  const onSubmit: SubmitHandler<RentFormState> = (data) => {
    const input: CreateListingReq = {
      bathroom_cnt: data.bathroomCount,
      category: data.category,
      description: data.description,
      price: Number(data.price),
      title: data.title,
      guest_cnt: data.guestCount,
      location_value: data.location as string,
      room_cnt: data.roomCount,
      thumbnail: data.imageSrc,
    };

    mutate(input);
  };

  async function checkStepValid(step: RentSteps): Promise<boolean> {
    const keyToChecks = validationMap[step];
    if (!keyToChecks) return true;

    return await trigger(validationMap[step]);
  }

  const handleSubmitRentForm = async () => {
    if (currentStep !== maxStep) {
      const isStepValid = await checkStepValid(currentStep);
      isStepValid && moveForward();
      return;
    }

    // trigger form validation
    const isValid = await trigger();

    // submit form right here
    if (isValid) {
      onSubmit(getValues());
    }
  };

  return (
    <RentContext.Provider
      value={{
        currentStep,
        moveBackward,
        moveForward,
        moveTo,
        formController: {
          control,
          errors,
          reset,
          setValue: customSetValue,
          watch,
          onSubmit: handleSubmitRentForm,
        },
        isSubmitting: isLoading,
      }}
    >
      {children}
    </RentContext.Provider>
  );
}

export function useRentContext() {
  return useContext(RentContext);
}
