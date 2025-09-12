import { AppBar, Toolbar, Stack, Typography, IconButton, Button } from '@mui/material';
import Menu from '@mui/icons-material/Menu';
import HelpOutline from '@mui/icons-material/HelpOutline';
import ShareOutlined from '@mui/icons-material/ShareOutlined';
import Add from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/uiStore';

export default function TopBar() {
  const navigate = useNavigate();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const openHelp = () => {
    alert('Help & Support: This is a placeholder. Add FAQ or contact links here.');
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton onClick={toggleSidebar} aria-label="Toggle sidebar">
            <Menu />
          </IconButton>
          <Typography variant="h6">ChatGPT 4</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            variant="text"
            startIcon={<HelpOutline />}
            onClick={openHelp}
            aria-label="Help and Support"
          />
          <IconButton aria-label="Share">
            <ShareOutlined />
          </IconButton>

          
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              navigate('/', { state: { intent: 'newChat' } });
            }}
          >
            New Chat
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
