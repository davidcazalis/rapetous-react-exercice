import { useQuery } from "@tanstack/react-query";
import { type MarvelCharacter } from "@/lib/api-client";
import { useApiClient } from "@/components/ApiClient";
import { Puff } from "react-loader-spinner";
import { FC } from "react";
import { CharacterPortrait } from "./CharacterPortrait";
import * as Tabs from "@radix-ui/react-tabs";
import { BiSolidMedal } from "react-icons/bi";
import { IoSkullSharp } from "react-icons/io5";
import * as Tooltip from "@radix-ui/react-tooltip";

type CharacterStatsProps = {
  character: MarvelCharacter;
};

type CharacterStatsListProps = {
  characters: { character: MarvelCharacter; count: number }[];
};

const CharactersList: FC<CharacterStatsListProps> = ({ characters }) => {
  if (!characters || !characters?.length) {
    return (
      <div>
        <CharacterPortrait
          className="relative z-10 hover:z-20 border-2 border-white"
          avatar
          fallback="?"
          src={""}
          size="small"
        />
      </div>
    );
  }

  return (
    <ul className="flex flex-wrap [&>*~*]:-ml-2">
      {characters.map(({ character, count }) => (
        <li className="-mb-4" key={character.id}>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div className="relative">
                  <CharacterPortrait
                    className="relative z-10 hover:z-20 border-2 border-white bubble-shadow"
                    src={character.image_url}
                    avatar
                    size="small"
                  />
                  {count > 1 && (
                    <span className="z-20 absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-transparent rounded-full -bottom-2 -right-2">
                      x{count}
                    </span>
                  )}
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="z-20 font-body font-bold uppercase text-black py-1 px-4 bg-slate-100 border-4 border-black rounded-full"
                  sideOffset={5}
                >
                  {character.name}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </li>
      ))}
    </ul>
  );
};

export const CharacterStats: FC<CharacterStatsProps> = ({ character }) => {
  const id = character.id;
  const apiClient = useApiClient();
  const weakest = useQuery({
    queryKey: ["weakerCharacters", { id }],
    queryFn: () => {
      return apiClient.getWeakerCharacters(id);
    },
  });

  const strongest = useQuery({
    queryKey: ["strongerCharacters", { id }],
    queryFn: () => {
      return apiClient.getStrongerCharacters(id);
    },
  });

  const isLoading = weakest.isLoading || strongest.isLoading;
  const weakestCount = weakest?.data?.length ?? 0;
  const strongestCount = strongest?.data?.length ?? 0;
  const weakestCharacters = getUniqueCharacters(weakest.data ?? []);
  const strongestCharacters = getUniqueCharacters(strongest.data ?? []);
  const comment = getComment({
    victories: weakestCount,
    defeats: strongestCount,
    character,
  });

  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="absolute inset-0">
          <Puff width={64} height={64} color={"#ef4444"} visible={true} />
        </div>
      )}
      {!isLoading && (
        <div className="flex w-full flex-col items-center">
          <div className="font-body font-bold text-sm uppercase p-2 bg-blue-500 border-4 border-black text-black italic mb-8">
            {comment}
          </div>
          <Tabs.Root defaultValue="victories" className="w-full">
            <Tabs.List className="flex justify-center">
              <Tabs.Trigger
                disabled={weakestCount === 0}
                className={
                  "flex items-center uppercase p-2 font-bold  data-[state=active]:bg-white data-[state=active]:text-black text-slate-800 bg-slate-300 rounded-tl-lg border-t-4 border-l-4 border-r-2 border-black"
                }
                value="victories"
              >
                <BiSolidMedal />
                <span className="ml-2">
                  <span className="font-display">{weakestCount}</span> wins
                </span>
              </Tabs.Trigger>
              <Tabs.Trigger
                disabled={strongestCount === 0}
                className="flex items-center uppercase p-2 font-bold  data-[state=active]:bg-white data-[state=active]:text-black text-slate-800 bg-slate-300 rounded-tr-lg border-t-4 border-r-4 border-black"
                value="defeats"
              >
                <IoSkullSharp />
                <span className="ml-2">
                  <span className="font-display">{strongestCount}</span> times
                  beaten
                </span>
              </Tabs.Trigger>
            </Tabs.List>
            <div className="pt-2 px-2 pb-6 bubble-shadow border-4 border-black bg-white/90 rounded-lg">
              <Tabs.Content value="victories" className="p-2">
                <CharactersList characters={weakestCharacters} />
              </Tabs.Content>
              <Tabs.Content value="defeats" className="p-2">
                <CharactersList characters={strongestCharacters} />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      )}
    </div>
  );
};

function getUniqueCharacters(characters: MarvelCharacter[]) {
  return characters.reduce((acc, character) => {
    if (!acc.find((c) => c.character.id === character.id)) {
      acc.push({
        character,
        count: 1,
      });
    } else {
      const idx = acc.findIndex((c) => c.character.id === character.id);
      acc[idx].count += 1;
    }
    return acc;
  }, [] as CharacterStatsListProps["characters"]);
}

function getComment({
  victories,
  defeats,
  character,
}: {
  victories: number;
  defeats: number;
  character: MarvelCharacter;
}) {
  switch (character.id) {
    case 1009144: {
      return "HULK SMASH !";
    }
    case 1009368: {
      return "I am Iron Man";
    }
    case 1009281: {
      return '"There is no good, nor evil. There is only DOOM."';
    }
    case 1009165: {
      return '"Avengers assemble!"';
    }
    case 1009282: {
      return '"Faith is my sword. Truth is my shield. Knowledge my armor."';
    }
    case 1009312: {
      return '"I know not who or what they are below! I only know Galactus must feed!"';
    }
    case 1009610: {
      return '"No man can win every battle, but no man should fall without a struggle."';
    }
    default: {
      if (victories + 2 === defeats) {
        return "Almost there !";
      } else if (victories + 1 === defeats) {
        return "One more victory to go !";
      } else if (victories === defeats) {
        return "Perfectly balanced, as all things should be !";
      }

      if (victories === 1 && defeats === 0) {
        return "First fight !";
      }

      if (victories === 1) {
        return "First victory !";
      } else if (defeats === 0) {
        return "Unbeaten !";
      } else {
        const ratio = victories / defeats;
        if (ratio > 10) {
          return "Godlike !";
        } else if (ratio > 5) {
          return "Unstoppable !";
        } else if (ratio > 2) {
          return "Dominating !";
        } else if (ratio > 1) {
          return "On a Rampage !";
        } else if (ratio < 1) {
          return "Often beaten, but never defeated. Weel, almost never...";
        }
      }
    }
  }
}
