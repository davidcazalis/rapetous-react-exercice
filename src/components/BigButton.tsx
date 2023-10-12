import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type BigButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
};

export const BigButton: FC<BigButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <span
      onClick={onClick}
      className={twMerge(
        "inline-block py-4 px-6 relative big-button cursor-pointer",
        className
      )}
    >
      {children}
    </span>
  );
};

export const BigButtonLabel: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <span
      className={twMerge(
        "font-bold font-display text-4xl text-white",
        className
      )}
    >
      {children}
    </span>
  );
};
