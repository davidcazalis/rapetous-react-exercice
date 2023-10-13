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
      <div className="pb-8">
        <BigButton
          className="text-yellow-500 hover:text-red-500"
          onClick={onNewFight}
        >
          <BigButtonLabel className="flex">
            <TiRefresh />
            Start a new fight !
          </BigButtonLabel>
        </BigButton>
      </div>

      <motion.span
        initial={{
          scale: 2,
          fontSize: "800px",
          color: "red",
          translateY: "-500%",
          rotate: -30,
        }}
        animate={{
          scale: [2, 3, 1],
          fontSize: "80px",
          color: "#eab308",
          translateY: ["-500%", "100%", "30%"],
          rotate: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="font-display text-shadow--large absolute"
      >
        WINNER
      </motion.span>

      <Character character={character} state={"winner"} />

      <div className="pb-6 w-full">
        <CharacterStats character={character} />
      </div>
    </motion.div>
  );
};
