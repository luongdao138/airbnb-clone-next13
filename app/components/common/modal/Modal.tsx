"use client";

import { useToggle } from "@/app/utils/hooks/useToggle";
import { FC, useCallback, useEffect } from "react";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  actionLabel?: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: FC<ModalProps> = ({
  actionLabel = "Submit",
  isOpen,
  onClose,
  onSubmit,
  disabled,
  footer,
  secondaryAction,
  secondaryActionLabel,
  title,
  children,
}) => {
  const {
    state: showModal,
    setState: setShowModal,
    close: closeModal,
  } = useToggle(isOpen);

  const handleClose = useCallback(() => {
    if (disabled) return;

    closeModal();
    setTimeout(onClose, 300);
  }, [disabled, closeModal, onClose]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled) return;

    secondaryAction?.();
  }, [disabled, secondaryAction]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;

    onSubmit();
  }, [disabled, onSubmit]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen, setShowModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        {/* Content */}
        <div
          className={clsx(`transate duration-300 h-full`, {
            "translate-y-0 opacity-100": showModal,
            "translate-y-full opacity-0": !showModal,
          })}
        >
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
            {/* Header */}
            <div className="flex items-center p-6 justify-center rounded-t relative border-b">
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition absolute left-9"
              >
                <IoMdClose />
              </button>
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            {/* Body */}
            <div className="relative p-6 flex-auto">{children}</div>

            {/* Footer */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                <Button disabled={disabled} onClick={handleSubmit}>
                  {actionLabel}
                </Button>

                {secondaryActionLabel && (
                  <Button
                    variant="outlined"
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                  >
                    {secondaryActionLabel}
                  </Button>
                )}
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
