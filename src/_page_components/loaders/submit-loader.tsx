import React from "react";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
// Adjust the path based on your project structure
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SubmitLoaderProps {
  loadingText: string;
  defaultText: string;
  loadingIcon: IconType | LucideIcon;
  loadingState: boolean;
  className?: string; // optional prop to add custom styles
  btnClassName?: string;
  onClick?: () => Promise<void>;
  // Optional prop for button
}

const SubmitLoader: React.FC<SubmitLoaderProps> = ({
  defaultText,
  loadingIcon,
  loadingState,
  loadingText,
  className,
  btnClassName,
}) => {
  return (
    <Button
      type="submit"
      className={twMerge(
        cn(
          "flex w-full items-center justify-center px-4 py-2 rounded font-semibold transition-colors disabled:cursor-not-allowed",
          loadingState
            ? "bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white",
          className,
          btnClassName
        )
      )}
      disabled={loadingState}
    >
      {loadingState ? (
        <>
          <span className="mr-2 animate-spin">
            {React.createElement(loadingIcon, { size: 20 })}
          </span>
          {loadingText}
        </>
      ) : (
        defaultText
      )}
    </Button>
  );
};

export default SubmitLoader;
