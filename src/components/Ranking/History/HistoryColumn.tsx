import Loader from '@/components/Atoms/Loader';
import { MarvelCharacter } from '@/lib/api-client';
import { List, ListSubheader } from '@mui/material';
import { FC } from 'react';
import HistoryCard from './HistoryCard';

type ColumnProps = {
  loading: boolean;
  title: string;
  characters: MarvelCharacter[];
  emptyText: string;
  className?: string;
  onClick: (characterId: number) => void;
};

const Column: FC<ColumnProps> = ({ loading, title, characters, emptyText, className, onClick }) => {
  return (
    <List className={`border-[1px] rounded-xl ${className}`}>
      <ListSubheader className="text-center !text-[16px] !leading-7 border-b-[1px] mb-2">{title}</ListSubheader>
      {loading ? (
        <Loader />
      ) : characters.length ? (
        characters.map((character) => (
          <HistoryCard
            character={character}
            onClick={onClick}
          />
        ))
      ) : (
        <div className="text-center italic capitalize py-1">{emptyText}</div>
      )}
    </List>
  );
};

export default Column;
