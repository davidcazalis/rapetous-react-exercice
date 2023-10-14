import { MarvelCharacter } from '@/lib/api-client';
import { FC } from 'react';

type AvatarProps = {
  character: MarvelCharacter;
  outlined?: boolean;
  dense?: boolean;
};

const Avatar: FC<AvatarProps> = ({ character: { image_url, id }, outlined = false, dense = false }) => {
  const settings = dense ? `max-w-[80px] max-h-[80px]` : 'max-w-[150px] max-h-[150px]';
  return (
    <img
      alt={id.toString()}
      className={`rounded-full ${settings} ${outlined ? 'border-[1px] border-black' : ''}`}
      src={image_url ?? ''}
    />
  );
};

export default Avatar;
