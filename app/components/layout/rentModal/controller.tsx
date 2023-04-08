"use client";

import { rentFormValidator } from "@/app/utils/validators/rent";
import { zodResolver } from "@hookform/resolvers/zod";
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
};

const RentContext = createContext<RentContextState>({} as RentContextState);

export default function Provider({ children }: { children: React.ReactNode }) {
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
    console.log(data);
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
      }}
    >
      {children}
    </RentContext.Provider>
  );
}

export function useRentContext() {
  return useContext(RentContext);
}
