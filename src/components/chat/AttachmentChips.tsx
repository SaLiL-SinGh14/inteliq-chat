import { Chip, Stack, IconButton, Tooltip } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Remove from '@mui/icons-material/Remove';
import type { Attachment } from '../../types/chat';

type Props = {
  files: Attachment[];
  onRemoveOne?: (id: string) => void;
  onClearAll?: () => void;
};

export default function AttachmentChips({ files, onRemoveOne, onClearAll }: Props) {
  return (
    <Stack direction="row" spacing={1} mt={1} alignItems="center" flexWrap="wrap">
      {files.map((f) => (
        <Chip
          key={f.id}
          label={`${f.name}`}
          onDelete={onRemoveOne ? () => onRemoveOne(f.id) : undefined}
          deleteIcon={<Remove />}
          variant="outlined"
        />
      ))}
      {files.length > 0 && onClearAll && (
        <Tooltip title="Remove all">
          <IconButton size="small" onClick={onClearAll}>
            <DeleteOutline fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
