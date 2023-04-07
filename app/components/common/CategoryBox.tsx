"use client";

import { CategoryType } from "@/app/constants/categories";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import qs from "query-string";
``;

interface CategoryBoxProps {
  category: CategoryType;
  selected?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({ category, selected }) => {
  const router = useRouter();
  const params = useSearchParams();
  const { icon: Icon, label } = category;

  const handleClick = () => {
    let currentQuery: any = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    currentQuery = Object.assign(currentQuery, { category: label });

    if (params?.get("category") === label) {
      delete currentQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: currentQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer",
        selected ? "border-b-neutral-800" : "border-transparent",
        selected ? "text-neutral-800" : "text-neutral-500"
      )}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
