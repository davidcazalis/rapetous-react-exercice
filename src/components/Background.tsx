import { useAnimate } from "framer-motion";
import { cacheImages } from "@/lib/utils";
import { FC, useEffect, useMemo, useState } from "react";
import { MarvelCharacter } from "@/lib/api-client";

const backgroundsFiles = [
  "effect",
  "sci-fi",
  "ground",
  "city",
  "antic",
  "earth",
].reduce((acc, theme) => {
  return [
    ...acc,
    ...Array.from({ length: 10 }, (_, index) => {
      return `backgrounds/${theme}/${index + 1}.jpeg`;
    }),
  ];
}, [] as string[]);

type BackgroundProps = {
  index?: number;
  winner: MarvelCharacter | undefined | null;
};

export const Background: FC<BackgroundProps> = ({ index, winner }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scope, animate] = useAnimate();

  const background = useMemo(
    () =>
      backgroundsFiles[
        Math.floor((index ?? Math.random()) * backgroundsFiles.length)
      ],
    [index]
  );

  // useEffect(() => {
  //   if (winner) {
  //     const winnerAnimation = async () => {
  //       await animate(
  //         scope.current,
  //         {
  //           opacity: 1,
  //           transform: "scale(1) rotate(0)",
  //           filter: "blur(0px)",
  //         },
  //         {
  //           duration: 30,
  //           ease: "easeOut",
  //         }
  //       );
  //     };
  //     winnerAnimation();
  //   }
  // }, [animate, scope, winner]);

  useEffect(() => {
    const animation = () => {
      return animate(
        scope.current,
        {
          opacity: 0.9,
          transform: "scale(1.5) rotate(6deg)",
          filter: "blur(1px)",
        },
        {
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeOut",
        }
      );
    };

    if (winner === undefined && isLoading) {
      animation().pause();

      cacheImages(backgroundsFiles).then(() => {
        setIsLoading(false);
        animation().play();
      });
    } else if (winner) {
      animation().pause();
      const winnerAnimation = async () => {
        await animate(
          scope.current,
          {
            opacity: 1,
            transform: "scale(1) rotate(0)",
            filter: "blur(0px)",
          },
          {
            ease: "easeOut",
          }
        );
        await animate(
          scope.current,
          {
            opacity: 1,
            transform: "scale(1.1)",
            filter: "blur(0.1px)",
          },
          {
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeOut",
          }
        );
      };
      winnerAnimation();
    } else if (winner === undefined && !isLoading) {
      const restartAnimation = async () => {
        await animate(scope.current, {
          opacity: 0.85,
          transform: "scale(2)",
          filter: "blur(2.5px)",
        });
        animation().play();
      };

      restartAnimation();
    }
  }, [animate, isLoading, scope, winner]);

  return (
    <div
      ref={scope}
      className="w-full fixed top-0 left-0 h-full bg-cover bg-center -z-10"
      style={{
        backgroundImage: `url(${
          isLoading ? "backgrounds/default.jpg" : background
        })`,
        opacity: 0.85,
        transform: "scale(2)",
        filter: "blur(2.5px)",
        transformOrigin: "center",
      }}
    />
  );
};
