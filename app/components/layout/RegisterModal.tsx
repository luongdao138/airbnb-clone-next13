"use client";

import { register } from "@/app/services/auth";
import { useAuthStore } from "@/app/zustand/authStore";
import { FC } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useMutation } from "react-query";
import Input from "../common/form/Input";
import Heading from "../common/Heading";
import Modal from "../common/modal/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerValidator } from "@/app/utils/validators/auth";
import { getInputVariant } from "@/app/utils/error";
import { toast } from "react-hot-toast";
import Button from "../common/Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

interface RegisterModalProps {}

interface RegisterFormState {
  email: string;
  username: string;
  password: string;
}

const defaultValues: RegisterFormState = {
  email: "",
  password: "",
  username: "",
};

interface BodyContentProps {
  control: Control<RegisterFormState, any>;
  errors: FieldErrors<RegisterFormState>;
}

const BodyContent = ({ control, errors }: BodyContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Email"
            variant={getInputVariant(errors, "email")}
          />
        )}
      />

      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Username"
            variant={getInputVariant(errors, "email")}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            {...field}
            placeholder="Password"
            type="password"
            variant={getInputVariant(errors, "email")}
          />
        )}
      />
    </div>
  );
};

interface FooterContentProps {
  closeRegisterModal: () => void;
}

const FooterContent = ({ closeRegisterModal }: FooterContentProps) => {
  return (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button onClick={() => {}} variant="outlined" icon={FcGoogle}>
        Google
      </Button>
      <Button onClick={() => {}} variant="outlined" icon={AiFillGithub}>
        Github
      </Button>

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex items-center justify-center gap-2">
          <div>Already have an account</div>
          <div
            onClick={closeRegisterModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterModal: FC<RegisterModalProps> = ({}) => {
  const authStore = useAuthStore();
  const { mutate, isLoading } = useMutation(register, {
    onSuccess(data) {
      console.log("Register success: ", data);
      authStore.closeAuthModal();
    },
    onError(error) {
      console.log(error);
      toast.error("Something went wrong!");
    },
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormState>({
    defaultValues,
    resolver: zodResolver(registerValidator),
  });

  const onSubmit: SubmitHandler<RegisterFormState> = (data) => {
    mutate(data);
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={authStore.isOpenAuthModal}
      title="Register"
      actionLabel="Continue"
      onClose={authStore.closeAuthModal}
      onSubmit={handleSubmit(onSubmit)}
      footer={<FooterContent closeRegisterModal={authStore.closeAuthModal} />}
    >
      <BodyContent control={control} errors={errors} />
    </Modal>
  );
};

export default RegisterModal;
