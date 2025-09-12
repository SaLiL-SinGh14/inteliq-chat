import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';

type Props = {
  text: string;
  onClick: () => void;
};

export default function QuickCard({ text, onClick }: Props) {
  return (
    <Card
      elevation={0}
      sx={{
        height: 160,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background:
          'radial-gradient(120px 60px at 20px 20px, rgba(99,102,241,0.06), transparent 60%), radial-gradient(140px 70px at 180px 90px, rgba(99,102,241,0.06), transparent 60%)',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          borderColor: 'primary.light',
        },
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{ height: '100%', position: 'relative', display: 'block' }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            width: 22,
            height: 22,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            opacity: 0.18,
          }}
        />
        <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}>
          <Typography variant="body1" sx={{ lineHeight: 1.35 }}>
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
