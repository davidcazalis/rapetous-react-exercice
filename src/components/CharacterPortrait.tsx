import clsx from "clsx";
import { FC } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import defaultAvatar from "@/assets/default-avatar.jpeg";
import { twMerge } from "tailwind-merge";

type CharacterPortraitProps = {
  src: string | null;
  size?: "small" | "medium" | "large" | "xl";
  avatar?: boolean;
  className?: string;
} & React.ComponentProps<typeof Avatar.Root>;

export const CharacterPortrait: FC<CharacterPortraitProps> = ({
  src,
  size = "medium",
  avatar = false,
  className,
  ...props
}) => {
  const isDefault = src === null || src.includes("image_not_available");
  return (
    <Avatar.Root
      className={twMerge(
        clsx("rounded-full overflow-hidden inline-flex", {
          "border-8 border-white outline outline-8 outline-black": !avatar,
          "w-60 h-60": size === "medium",
          "w-80 h-80": size === "large",
          "w-96 h-96": size === "xl",
          "w-11 h-11": size === "small",
        }),
        className
      )}
      {...props}
    >
      <Avatar.Image
        src={isDefault ? defaultAvatar : src}
        className={clsx("object-cover w-full block")}
      />
    </Avatar.Root>
  );
};
