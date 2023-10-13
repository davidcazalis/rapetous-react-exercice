import { MarvelCharacter } from '@/lib/api-client';
import { FC } from 'react';

type AvatarProps = {
  character: MarvelCharacter;
  outlined?: boolean;
};

const Avatar: FC<AvatarProps> = ({ character: { image_url, id }, outlined = false }) => {
  return (
    <img
      alt={id.toString()}
      className={`rounded-full max-w-[150px] max-h-[150px] ${outlined ? 'border-[1px] border-black' : ''}`}
      src={image_url ?? ''}
    />
  );
};

export default Avatar;
