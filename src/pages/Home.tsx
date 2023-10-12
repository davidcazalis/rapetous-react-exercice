import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useApiClient, type MarvelCharacter } from "../api-client";
import { Character } from "../components/Character";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BigButton, BigButtonLabel } from "../components/BigButton";
import { TiRefresh } from "react-icons/ti";
import clsx from "clsx";
import { Puff } from "react-loader-spinner";
import { CharacterStats } from "../components/CharacterStats";

export const HomePage = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();
  const [winner, setWinner] = useState<MarvelCharacter | undefined | null>(
    undefined
  );

  const { isLoading, data, isFetching } = useQuery({
    queryKey: ["randomCharacters", { count: 2 }],
    queryFn: () => {
      return apiClient.getUniqueRandomCharacters(2);
    },
    staleTime: Infinity,
    enabled: !winner,
  });

  const looser = winner
    ? data?.find((character) => character.id !== winner?.id)
    : undefined;

  const sendWinner = useMutation({
    mutationFn: () => {
      if (winner && looser) {
        return apiClient.addVote(winner, looser);
      } else {
        return Promise.reject();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["randomCharacters"]);
    },
  });

  const handleWinner = (character: MarvelCharacter) => {
    if (character.id === winner?.id) {
      setWinner(undefined);
      return;
    }
    sendWinner.mutate();
    setWinner(character);
  };

  const handleNewFight = () => {
    setWinner(undefined);
  };

  const handleReset = () => {
    setWinner(null);
    queryClient.invalidateQueries(["randomCharacters"]);
    setWinner(undefined);
  };

  const loading = isLoading || isFetching;
  const displayCharacters = (!loading && !winner) || sendWinner.isLoading;
  const displayWinner = winner && sendWinner.isSuccess;

  return (
    <div className="min-h-screen w-full relative">
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            className="absolute inset-0 flex items-center justify-center"
          >
            <Puff width={120} height={120} color={"#ef4444"} visible={true} />
          </motion.div>
        )}
        {displayCharacters && !loading && (
          <motion.div
            className="absolute w-full h-full"
            key="characters"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="absolute left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 top-[10%]">
              <BigButton
                className="text-yellow-500 hover:text-red-500"
                onClick={handleReset}
              >
                <BigButtonLabel>
                  <TiRefresh />
                </BigButtonLabel>
              </BigButton>
            </div>
            <div className="flex absolute justify-evenly items-center inset-0">
              {data?.map((character, index) => {
                return (
                  <div
                    key={character.id}
                    className={clsx("w-1/2 relative z-10", {
                      "animate-pulse": sendWinner.isLoading,
                    })}
                  >
                    <Character
                      character={character}
                      onClick={handleWinner}
                      placement={index === 0 ? "left" : "right"}
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
        {displayWinner && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center"
            key="winner"
            initial={{ opacity: 0, y: -100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <CharacterStats character={winner} />
            </div>
            <Character character={winner} state={"winner"} />
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
                color: "white",
                translateY: ["-500%", "0%", "-30%"],
                rotate: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="font-display text-shadow--large"
            >
              WIN !
            </motion.span>
            <BigButton
              className="text-red-500 hover:text-yellow-500"
              onClick={handleNewFight}
            >
              <BigButtonLabel className="flex">
                <TiRefresh />
                Start a new fight !
              </BigButtonLabel>
            </BigButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
