import { MarvelCharacter } from '@/lib/api-client';
import { FC } from 'react';

type AvatarProps = {
  character: MarvelCharacter;
  outlined?: boolean;
  size: 'large' | 'medium' | 'dense';
};

const Avatar: FC<AvatarProps> = ({ character: { image_url, id }, size, outlined = false }) => {
  const settings = size === 'medium' ? `max-w-[80px] max-h-[80px]` : size === 'large' ? 'max-w-[150px] max-h-[150px]' : 'max-w-[30px] max-h-[30px]';
  return (
    <img
      alt={id.toString()}
      className={`rounded-full ${settings} ${outlined ? 'border-[1px] border-black' : ''}`}
      src={image_url ?? ''}
    />
  );
};

export default Avatar;
