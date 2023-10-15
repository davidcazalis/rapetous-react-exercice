import Button from '@/components/Atoms/Button';
import Dialog from '@/layouts/Dialog';
import { MarvelCharacter } from '@/lib/api-client';
import { FC, useEffect, useState } from 'react';
import { useApiClient } from '../../ApiClient';
import Avatar from '../../Atoms/Avatar';
import Loader from '../../Atoms/Loader';
import HistoryCard from './HistoryCard';

type HistoryProps = {
  character: MarvelCharacter;
  onClose: () => void;
};

type ColumnProps = {
  loading: boolean;
  title: string;
  characters: MarvelCharacter[];
  emptyText: string;
};

const Column: FC<ColumnProps> = ({ loading, title, characters, emptyText }) => {
  return (
    <div className="mx-1 border-[1px] rounded-xl bg-zinc-50 shadow-sm">
      <div className="text-center font-semibold mb-2 border-b-[1px] p-1">{title}</div>
      <div className="p-2">{loading ? <Loader /> : characters.length ? characters.map((character) => <HistoryCard character={character} />) : <div className="text-center italic capitalize py-1">{emptyText}</div>}</div>
    </div>
  );
};

const History: FC<HistoryProps> = ({ character, onClose }) => {
  const client = useApiClient();
  const [wons, setWons] = useState<MarvelCharacter[]>([]);
  const [loss, setLoss] = useState<MarvelCharacter[]>([]);
  const [isLoadingWons, setIsLoadingWons] = useState(true);
  const [isLoadingLoss, setIsLoadingLoss] = useState(true);

  useEffect(() => {
    client.getCharacterWin(character.id).then((result) => {
      setWons(result!.sort((a, b) => a.name.localeCompare(b.name)));
      setIsLoadingWons(false);
    });
    client.getCharacterLoss(character.id).then((result) => {
      setLoss(result!.sort((a, b) => a.name.localeCompare(b.name)));
      setIsLoadingLoss(false);
    });
  }, [character, client]);

  return (
    <Dialog
      show
      title={`History of ${character.name}`}
      content={
        <div className="w-[450px] px-4 pb-2">
          <div className="flex flex-row justify-center">
            <Avatar
              character={character}
              size="medium"
            />
          </div>
          <div className="grid grid-cols-2 mt-6 mb-3">
            <Column
              loading={isLoadingWons}
              title="Victories"
              characters={wons}
              emptyText="Absolute loser"
            />
            <Column
              loading={isLoadingLoss}
              title="Loss"
              characters={loss}
              emptyText="unbeatable"
            />
          </div>
          <div className="flex flex-row justify-end pr-2">
            <Button
              label="Close"
              onClick={onClose}
            />
          </div>
        </div>
      }
    />
  );
};

export default History;
