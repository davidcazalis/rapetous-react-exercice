import { MarvelCharacter } from '@/lib/api-client';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { FC, useEffect, useState } from 'react';
import { useApiClient } from '../../ApiClient';
import Column from './HistoryColumn';

type HistoryProps = {
  character: MarvelCharacter;
  onClose: () => void;
  onClickCharacter: (characterId: number) => void;
};

const History: FC<HistoryProps> = ({ character, onClose, onClickCharacter }) => {
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
      open
      className="!h-max-[500px]"
      scroll="paper">
      <DialogTitle className="text-center">
        {`History of ${character.name}`}
        <div className="flex flex-row justify-center">
          <Avatar
            src={character.image_url ?? ''}
            sx={{ width: 120, height: 120 }}
          />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="grid grid-cols-2">
          <Column
            loading={isLoadingWons}
            title="Victories"
            characters={wons}
            emptyText="Absolute loser"
            className="!mr-1"
            onClick={onClickCharacter}
          />
          <Column
            loading={isLoadingLoss}
            title="Loss"
            characters={loss}
            emptyText="unbeatable"
            className="!ml-1"
            onClick={onClickCharacter}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <div className="mr-6 -mt-4">
          <Button
            onClick={onClose}
            variant="outlined"
            size="small">
            Close
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default History;
