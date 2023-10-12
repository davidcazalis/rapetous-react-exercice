import { useQuery } from "@tanstack/react-query";
import { type MarvelCharacter } from "@/lib/api-client";
import { useApiClient } from "@/components/ApiClient";
import { Puff } from "react-loader-spinner";
import { FC } from "react";
import { CharacterPortrait } from "./CharacterPortrait";

type CharacterStatsProps = {
  character: MarvelCharacter;
};

export const CharacterStats: FC<CharacterStatsProps> = ({ character }) => {
  const id = character.id;
  const apiClient = useApiClient();
  // const queryClient = useQueryClient();

  const weakerCharacters = useQuery({
    queryKey: ["weakerCharacters", { id }],
    queryFn: () => {
      return apiClient.getWeakerCharacters(id);
    },
    staleTime: 100,
  });

  const strongerCharacters = useQuery({
    queryKey: ["strongerCharacters", { id }],
    queryFn: () => {
      return apiClient.getStrongerCharacters(id);
    },
    staleTime: 100,
  });

  const isLoading = weakerCharacters.isLoading || strongerCharacters.isLoading;
  const weakerCharactersData = weakerCharacters?.data;
  const strongerCharactersData = strongerCharacters?.data;

  return (
    <div className="flex">
      {isLoading && (
        <div className="">
          <Puff width={64} height={64} color={"#ef4444"} visible={true} />
        </div>
      )}
      {!isLoading && weakerCharacters.isSuccess && weakerCharactersData && (
        <div className="flex items-center">
          <div className="flex [&>*~*]:-ml-2 mr-4">
            {weakerCharactersData.map((character) => (
              <CharacterPortrait
                className="border-2 border-white"
                key={character.id}
                size="small"
                avatar
                src={character.image_url}
              />
            ))}
          </div>
          <div className="bg-green-500 border-y-4 border-l-4 border-black p-2 font-bold uppercase">
            <span className="font-display text-xl">
              {weakerCharactersData.length}
            </span>{" "}
            victories
          </div>
        </div>
      )}
      {!isLoading && strongerCharacters.isSuccess && strongerCharactersData && (
        <div className="flex items-center">
          <div className="bg-red-500 border-y-4 border-r-4 border-black p-2 font-bold uppercase">
            <span className="font-display text-xl">
              {strongerCharactersData.length}
            </span>{" "}
            defeats
          </div>
          <div className="flex [&>*]:-mr-2 ml-4">
            {strongerCharactersData.map((character) => (
              <CharacterPortrait
                className="border-2 border-white"
                key={character.id}
                size="small"
                avatar
                src={character.image_url}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
