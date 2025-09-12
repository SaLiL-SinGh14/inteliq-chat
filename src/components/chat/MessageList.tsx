import { Box, List, ListItem, Stack, Avatar,  Paper } from '@mui/material';
import { useChatStore } from '../../store/chatStore';
import MessageBubble from './MessageBubble';

export default function MessageList({ chatId }: { chatId: string }) {
  const chat = useChatStore((s) => s.chats.find((c) => c.id === chatId));

  return (
    <Box flex={1} overflow="auto" pr={1}>
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {chat?.messages.map((m) => (
          <ListItem key={m.id} disableGutters>
            <Stack direction="row" spacing={1} width="100%" justifyContent={m.role === 'user' ? 'flex-end' : 'flex-start'}>
              {m.role === 'assistant' && <Avatar>A</Avatar>}
              <Paper elevation={0} sx={{ p: 1.25, bgcolor: m.role === 'user' ? 'primary.main' : 'grey.100', color: m.role === 'user' ? 'primary.contrastText' : 'text.primary', maxWidth: '75%' }}>
                <MessageBubble message={m} />
              </Paper>
              {m.role === 'user' && <Avatar>U</Avatar>}
            </Stack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
