"use client";

import { getInputVariant, handleError } from "@/app/utils/error";
import { registerValidator } from "@/app/utils/validators/auth";
import { useAuthStore } from "@/app/zustand/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "react-query";
import Button from "../common/Button";
import Input from "../common/form/Input";
import Heading from "../common/Heading";
import Modal from "../common/modal/Modal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const loginValidator = registerValidator.omit({ username: true });

interface LoginModalProps {}

interface LoginFormState {
  email: string;
  password: string;
}

const defaultValues: LoginFormState = {
  email: "",
  password: "",
};

interface BodyContentProps {
  control: Control<LoginFormState, any>;
  errors: FieldErrors<LoginFormState>;
}

const BodyContent = ({ control, errors }: BodyContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />

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
  closeLoginModal: () => void;
}

const FooterContent = ({ closeLoginModal }: FooterContentProps) => {
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
            onClick={closeLoginModal}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginModal: FC<LoginModalProps> = ({}) => {
  const router = useRouter();
  const authStore = useAuthStore();
  const { mutate, isLoading } = useMutation(
    (params: LoginFormState) =>
      signIn("credentials", { ...params, redirect: false }),
    {
      onSuccess(data) {
        if (data?.ok) {
          toast.success("Logged in success!");
          router.refresh();
          authStore.closeLoginModal();
          return;
        }

        if (data?.error) {
          toast.error(data.error);
        }
      },
      onError(error) {
        handleError(error);
      },
    }
  );

  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormState>({
    defaultValues,
    resolver: zodResolver(loginValidator),
  });

  const onSubmit: SubmitHandler<LoginFormState> = (data) => {
    mutate(data, {
      onSuccess(data) {
        if (data?.ok) {
          reset();
        }
      },
    });
  };

  return (
    <Modal
      disabled={isLoading}
      isOpen={authStore.isOpenLoginModal}
      title="Login"
      actionLabel="Continue"
      onClose={authStore.closeLoginModal}
      onSubmit={handleSubmit(onSubmit)}
      footer={<FooterContent closeLoginModal={authStore.closeLoginModal} />}
    >
      <BodyContent control={control} errors={errors} />
    </Modal>
  );
};

export default LoginModal;
