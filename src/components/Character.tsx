import { FC } from "react";
import { type MarvelCharacter } from "@/lib/api-client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { CharacterPortrait } from "./CharacterPortrait";

export type CharacterProps = {
  onClick?: (character: MarvelCharacter) => void;
  character: MarvelCharacter;
  state?: "winner" | "looser";
  placement?: "left" | "right";
};

export const Character: FC<CharacterProps> = ({
  character,
  onClick,
  placement,
  state,
}) => {
  const isLeft = placement && placement === "left";
  const isWinner = state && state === "winner";

  return (
    <article className="flex flex-col text-center items-center p-4">
      <CharacterPortrait
        className={clsx({
          "cursor-pointer": !state,
          "character-portrait-effect character-portrait-effect--left":
            isLeft && !state,
          "character-portrait-effect character-portrait-effect--right":
            !isLeft && !state,
        })}
        src={character.image_url}
        size={isWinner ? "xl" : "large"}
        onClick={() => {
          onClick?.(character);
        }}
      />
      <motion.div
        initial={{
          x: isLeft ? -50 : 50,
          opacity: 0,
          skewX: -50,
        }}
        animate={{
          x: 0,
          opacity: 1,
          skewX: 0,
        }}
      >
        <h2
          className={clsx(
            "font-extrabold font-display text-shadow--large relative z-20 -mt-8",
            {
              "text-6xl": !state,
              "text-8xl": isWinner,
            }
          )}
        >
          {character.name}
        </h2>
      </motion.div>
      {character.description && !state && (
        <motion.p
          initial={{
            x: isLeft ? -50 : 50,
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: [1],
          }}
          className={clsx(
            "font-bold uppercase text-lg/4 p-4 border-4 border-black rounded max-w-md mt-4 relative z-20",
            {
              "bg-blue-400 text-black": isLeft,
              "bg-yellow-400 text-black": !isLeft,
            }
          )}
        >
          {character.description}
        </motion.p>
      )}
    </article>
  );
};
