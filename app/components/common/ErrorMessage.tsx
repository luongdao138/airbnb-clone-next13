import clsx from "clsx";
import { FC } from "react";

interface ErrorMessageProps {
  center?: boolean;
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ center, message }) => {
  return (
    <div
      className={clsx("text-sm font-medium text-rose-500", {
        "text-center": center,
      })}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
