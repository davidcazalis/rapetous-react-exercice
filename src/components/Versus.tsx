import { MarvelCharacter } from "@/lib/api-client";
import { FC } from "react";
import { Character } from "./Character";
import clsx from "clsx";

type VersusProps = {
  left: MarvelCharacter;
  right: MarvelCharacter;
  onClick: (winner: MarvelCharacter) => void;
  isLoading: boolean;
};

export const Versus: FC<VersusProps> = ({
  left,
  right,
  onClick,
  isLoading,
}) => {
  return (
    <div
      className={clsx("flex w-full", {
        "animate-pulse": isLoading,
      })}
    >
      <div className="w-1/2">
        <Character character={left} onClick={onClick} placement="left" />
      </div>
      <span className="absolute z-10 flex justify-center items-center text-[25vw] font-display vs left-1/2 -translate-x-1/2 -translate-y-1/4">
        VS
      </span>
      <div className="w-1/2">
        <Character character={right} onClick={onClick} placement="right" />
      </div>
    </div>
  );
};
