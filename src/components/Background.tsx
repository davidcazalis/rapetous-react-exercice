import { motion } from "framer-motion";
import { cacheImages } from "@/lib/utils";
import { FC, useEffect, useMemo, useState } from "react";

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
};

export const Background: FC<BackgroundProps> = ({ index }) => {
  const [isLoading, setIsLoading] = useState(true);
  const background = useMemo(
    () =>
      backgroundsFiles[
        Math.floor((index ?? Math.random()) * backgroundsFiles.length)
      ],
    [index]
  );

  useEffect(() => {
    cacheImages(backgroundsFiles).then(() => {
      setIsLoading(false);
    });
  });

  const variants = {
    normal: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      backgroundImage: `url(${background})`,
    },
    end: {
      opacity: 1,
      scale: 1.2,
      filter: "blur(0.1px)",
      backgroundImage: `url(${background})`,
    },
    loading: {
      opacity: 1,
      scale: 1,
      filter: "blur(0.5px)",
      backgroundImage: `url(backgrounds/default.jpg)`,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial={isLoading ? "loading" : "normal"}
      animate={isLoading ? "loading" : "end"}
      transition={{
        duration: 20,
        ease: "easeOut",
        repeatDelay: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="w-full fixed top-0 left-0 h-full bg-cover bg-center min-h-screen -z-10"
    />
  );
};
