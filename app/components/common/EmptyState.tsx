"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: FC<EmptyStateProps> = ({
  showReset = false,
  subtitle = "Try changing or removing some of your filters",
  title = "No exact matches",
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      {showReset && (
        <div className="w-48 mt-4">
          <Button onClick={() => router.push("/")} variant="outlined">
            Remove all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
