import { Fragment } from 'react';
import type { Message } from '../../types/chat';
import AttachmentChips from './AttachmentChips';
import { Typography } from '@mui/material';

export default function MessageBubble({ message }: { message: Message }) {
  return (
    <Fragment>
      <Typography variant="body1" whiteSpace="pre-wrap">{message.text}</Typography>
      {message.attachments && message.attachments.length > 0 && (
        <AttachmentChips files={message.attachments} />
      )}
    </Fragment>
  );
}
