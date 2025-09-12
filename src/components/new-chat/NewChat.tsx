import { Box, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../../store/chatStore';
import QuickCard from './QuickCard';
import Composer from '../chat/Composer';

const DEFAULT_CARDS = [
  'Give me a concise summary of this meeting transcript',
  'Write a product description for a minimalist smartwatch',
  'Provide a polite response to a customer asking for a refund',
];

export default function NewChat() {
  const start = useChatStore((s) => s.startNewChat);
  const navigate = useNavigate();

  const startWithText = (text: string) => {
    const id = start(text);
    navigate(`/c/${id}`);
  };

  return (
    <Container sx={{ py: { xs: 2, md: 4 } }}>
      <Box textAlign="left" mb={3}>
        <Typography variant="h4" fontWeight={700}>Hi Laurence!</Typography>
        <Typography variant="h5" mt={1}>What do you want to learn today?</Typography>
      </Box>

      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {DEFAULT_CARDS.map((text) => (
          <Grid key={text} size={{ xs: 12, sm: 6, md: 4 }}>
            <QuickCard text={text} onClick={() => startWithText(text)} />
          </Grid>
        ))}
      </Grid>

      
      <Box maxWidth={800}>
        <Composer
          standalone
          onSubmit={(text: string) => {
            if (!text?.trim()) return;
            startWithText(text.trim());
          }}
        />
      </Box>
    </Container>
  );
}
