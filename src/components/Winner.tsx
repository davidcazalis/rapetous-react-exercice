import { motion } from "framer-motion";
import { CharacterStats } from "./CharacterStats";
import { Character } from "./Character";
import { FC } from "react";
import { BigButton, BigButtonLabel } from "./BigButton";
import { MarvelCharacter } from "@/lib/api-client";
import { TiRefresh } from "react-icons/ti";

type WinnerProps = {
  character: MarvelCharacter;
  onNewFight: () => void;
};

export const Winner: FC<WinnerProps> = ({ character, onNewFight }) => {
  return (
    <motion.div
      layoutId="winner"
      className="flex justify-center flex-col items-center"
      key="winner"
      initial={{ opacity: 0, y: -100, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.span
        key="winner-title"
        initial={{
          scale: 10,
          color: "red",
          translateY: "200%",
        }}
        animate={{
          scale: 1,
          color: "#eab308",
          translateY: "46%",
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="font-display text-shadow--large text-[100px] z-10"
      >
        WINNER
      </motion.span>

      <motion.div
        key="character"
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        <Character character={character} state={"winner"} />
      </motion.div>

      <div className="w-full flex gap-x-8 pt-8">
        <div className="w-full">
          <CharacterStats character={character} />
        </div>
        <div className="w-full flex justify-end items-top">
          <BigButton
            className="text-yellow-500 hover:text-green-500"
            onClick={onNewFight}
          >
            <BigButtonLabel className="flex">
              <TiRefresh />
              Start a new fight !
            </BigButtonLabel>
          </BigButton>
        </div>
      </div>
    </motion.div>
  );
};