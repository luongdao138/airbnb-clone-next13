"use client";

import clsx from "clsx";
import { FC } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle?: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}

const Counter: FC<CounterProps> = ({
  onChange,
  title,
  value,
  subtitle,
  max = Infinity,
  min = 1,
}) => {
  const isReachMin = value <= min;
  const isReachMax = value >= max;

  const onAdd = () => {
    if (isReachMax) return;
    onChange(value + 1);
  };

  const onReduce = () => {
    if (isReachMin) return;
    onChange(value - 1);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={onReduce}
          className={clsx(
            "select-none w-10 h-10 flex rounded-full border items-center justify-center hover:opacity-80 transition",
            isReachMin
              ? "cursor-not-allowed border-neutral-200 text-neutral-400"
              : "cursor-pointer border-neutral-400 text-neutral-600"
          )}
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className={clsx(
            "select-none w-10 h-10 flex rounded-full border items-center justify-center hover:opacity-80 transition",
            isReachMax
              ? "cursor-not-allowed border-neutral-200 text-neutral-400"
              : "cursor-pointer border-neutral-400 text-neutral-600"
          )}
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
