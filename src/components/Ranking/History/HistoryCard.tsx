import { MarvelCharacter } from '@/lib/api-client';
import { ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { FC } from 'react';

type HistoryCardProps = {
  character: MarvelCharacter;
  onClick: (characterId: number) => void;
};

const HistoryCard: FC<HistoryCardProps> = ({ character: { id, name, image_url }, onClick }) => {
  return (
    <ListItem
      className="!p-0"
      onClick={() => onClick(id)}>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar
            src={image_url ?? ''}
            sx={{ width: 30, height: 30 }}
          />
        </ListItemAvatar>
        <ListItemText
          className="truncate"
          primary={name}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default HistoryCard;
