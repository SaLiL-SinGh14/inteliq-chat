
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import BootNavigate from '../../app/BootNavigate';
import Sidebar from './Sidebar';

export default function Shell() {
  return (
    <Box display="flex" height="100vh" width="100%" overflow="hidden">
      <Box
        component="aside"
        sx={{
          flex: '0 0 auto',
          borderRight: '1px solid',
          borderColor: 'divider',
          overflowY: 'auto',
        }}
      >
        <Sidebar />
      </Box>

      <Box display="flex" flexDirection="column" flex="1 1 auto" minWidth={0}>
        <TopBar />
        
        <Toolbar sx={{ minHeight: 0 }} />

        <BootNavigate />

        <Box component="main" flex={1} overflow="auto" px={{ xs: 2, md: 4 }} py={3} sx={{ minWidth: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
