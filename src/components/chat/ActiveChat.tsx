import { useParams } from 'react-router-dom';
import { useChatStore } from '../../store/chatStore';
import { Box, Container } from '@mui/material';
import MessageList from './MessageList';
import Composer from './Composer';
import { useEffect } from 'react';
import { nextAssistantReply } from '../../utils/placeholders';

export default function ActiveChat() {
  const { id } = useParams<{ id: string }>();
  const chat = useChatStore((s) => s.chats.find((c) => c.id === id));
  const appendAssistant = useChatStore((s) => s.appendAssistantMessage);

  
  useEffect(() => {
    if (!chat) return;
    const hasAssistant = chat.messages.some((m) => m.role === 'assistant');
    const hasUser = chat.messages.some((m) => m.role === 'user');
    if (hasUser && !hasAssistant) {
      const t = setTimeout(() => appendAssistant(chat.id, nextAssistantReply()), 800);
      return () => clearTimeout(t);
    }
  }, [chat, appendAssistant]);

  if (!chat) return null;

  return (
    <Container>
      <Box height="calc(100dvh - 200px)" minHeight={360} display="flex" flexDirection="column">
        <MessageList chatId={chat.id} />
        <Composer />
      </Box>
    </Container>
  );
}
