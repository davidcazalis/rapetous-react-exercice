import { FC, useState } from 'react';
import { MarvelCharacter } from '@/lib/api-client';
import { Avatar, Card, CardContent } from '@mui/material';

type CharacterCardProps = {
  character: MarvelCharacter;
  onClick: () => void;
};

const FighterCard: FC<CharacterCardProps> = ({ character, onClick }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Card
      className={`!bg-zinc-100 ${isHover ? 'hover:shadow-2xl' : 'shadow-md'}`}
      variant="outlined">
      <CardContent>
        <div className="flex flex-row justify-center">
          <Avatar
            onClick={onClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className="cursor-pointer"
            src={character.image_url ?? ''}
            sx={{ width: 180, height: 180 }}
          />
        </div>
        <div className={`text-center font-bold mb-4 ${isHover ? 'underline underline-offset-2' : ''}`}>{character.name}</div>
        <div className="text-justify italic">{character.description}</div>
      </CardContent>
    </Card>
  );
};

export default FighterCard;
