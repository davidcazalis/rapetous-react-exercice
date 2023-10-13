import { FC } from 'react';
import { MarvelCharacter } from '../api-client';

type AvatarProps = {
  character: MarvelCharacter;
};

const Avatar: FC<AvatarProps> = ({ character: { image_url, id } }) => {
  return (
    <img
      alt={id.toString()}
      className="rounded-full max-w-[50px] max-h-[50px]"
      src={image_url ?? ''}
    />
  );
};

export default Avatar;
