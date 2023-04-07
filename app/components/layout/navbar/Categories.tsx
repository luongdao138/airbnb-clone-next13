"use client";

import { categories } from "@/app/constants/categories";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";
import CategoryBox from "../../common/CategoryBox";
import Container from "../../common/Container";

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = ({}) => {
  const params = useSearchParams();
  const categoryParam = params?.get("category");
  const pathname = usePathname();

  // top page => not render
  if (pathname !== "/") {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex items-center justify-between overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            category={category}
            selected={categoryParam === category.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
