import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useApiClient } from "@/components/ApiClient";
import { type MarvelCharacter } from "@/lib/api-client";
import { useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { BigButton, BigButtonLabel } from "../components/BigButton";
import { TiRefresh } from "react-icons/ti";
import { Puff } from "react-loader-spinner";
import { Versus } from "@/components/Versus";
import { Winner } from "@/components/Winner";

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
    <div className="relative min-h-screen py-8">
      <LayoutGroup>
        {loading && (
          <motion.div
            className="absolute flex inset-0 justify-center items-center"
            key="loading"
          >
            <Puff width={120} height={120} color={"#ef4444"} visible={true} />
          </motion.div>
        )}
        {displayCharacters && !loading && (
          <motion.div
            className="absolute justify-center flex items-center w-full inset-0"
            key="characters"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            {data && !loading && (
              <Versus
                isLoading={loading}
                left={data[0]}
                right={data[1]}
                onClick={handleWinner}
              />
            )}

            <div className="absolute left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 bottom-0">
              <BigButton
                className="text-yellow-500 hover:text-blue-500"
                onClick={handleReset}
              >
                <BigButtonLabel>
                  <TiRefresh />
                </BigButtonLabel>
              </BigButton>
            </div>
          </motion.div>
        )}
        {displayWinner && (
          <Winner character={winner} onNewFight={handleNewFight} />
        )}
      </LayoutGroup>
    </div>
  );
};
