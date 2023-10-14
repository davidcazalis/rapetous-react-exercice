export const getRandomNumber = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const cacheImages = async (srcArray: string[]) => {
  const promises = srcArray.map((src) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();

      img.src = src;
      img.onload = () => {
        resolve();
      };
      img.onerror = () => {
        reject();
      };
    });
  });

  await Promise.all(promises);
};
