import * as React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  TextField,
  Stack,
  IconButton,
  Divider,
  Tooltip,
  Button,
  Avatar,
} from '@mui/material';
import Home from '@mui/icons-material/Home';
import History from '@mui/icons-material/History';
import Bookmarks from '@mui/icons-material/Bookmarks';
import Explore from '@mui/icons-material/Explore';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import StarOutline from '@mui/icons-material/StarOutline';
import { styled } from '@mui/material/styles';
import { useChatStore } from '../../store/chatStore';
import { useUIStore } from '../../store/uiStore';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 280;
const miniWidth = 72;


const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: 'hidden',
});
const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: 'hidden',
  width: miniWidth,
});

const MiniDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }: { theme?: any; open: boolean }) => ({
    width: open ? drawerWidth : miniWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && { '& .MuiDrawer-paper': openedMixin(theme) }),
    ...(!open && { '& .MuiDrawer-paper': closedMixin(theme) }),
    '& .MuiDrawer-paper': {
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
  })
);

export default function Sidebar() {
  const { chats, search, setSearch, setActive, startNewChat } = useChatStore();
  const open = useUIStore((s) => s.sidebarOpen);
  const toggle = useUIStore((s) => s.toggleSidebar);
  const navigate = useNavigate();

  const [showAll, setShowAll] = React.useState(false);
  const VISIBLE = 6;

  const filtered = search
    ? chats.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
    : chats;

  const listForView = showAll ? filtered : filtered.slice(0, VISIBLE);

  const NavItem = ({
    icon,
    label,
    onClick,
    disabled,
  }: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
  }) => (
    <Tooltip title={!open ? label : ''} placement="right">
      <span>
        <ListItemButton
          onClick={onClick}
          disabled={disabled}
          sx={{
            minHeight: 44,
            justifyContent: open ? 'initial' : 'center',
            px: 1.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: open ? 1.5 : 'auto', justifyContent: 'center' }}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </span>
    </Tooltip>
  );

  return (
    <MiniDrawer variant="permanent" open={open}>
      <Box
        sx={{
          width: open ? drawerWidth : miniWidth,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 1.5,
          gap: 1,
          overflow: 'hidden',
        }}
      >
        
        <Stack direction="row" alignItems="center" justifyContent={open ? 'space-between' : 'center'}>
          {open && (
            <Typography variant="h6" fontWeight={700}>
              Inteliq
            </Typography>
          )}
          <IconButton size="small" onClick={toggle} aria-label="Toggle sidebar">
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Stack>

        
        <Box>
          <TextField
            size="small"
            placeholder="Search for chats..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{ display: open ? 'block' : 'none' }}
          />
        </Box>

        
        <List dense sx={{ mt: open ? 0.5 : 0 }}>
          <NavItem
            icon={<Home />}
            label="Home"
            onClick={() => {
              const id = startNewChat();
              navigate(`/c/${id}`);
            }}
          />
          <NavItem icon={<Bookmarks />} label="Library" disabled />
          <NavItem icon={<History />} label="History" disabled />
          <NavItem icon={<Explore />} label="Explore" disabled />
        </List>

        <Divider sx={{ my: 1 }} />

        
        {open && (
          <Typography variant="subtitle2" color="text.secondary" aria-label="recent-chats-heading">
            Recent Chats
          </Typography>
        )}

        
        <Box
          role="region"
          aria-label="recent-chats"
          sx={{
            maxHeight: 260,        
            overflowY: 'auto',     
            pr: 0.5,               
          }}
        >
          <List dense sx={{ pb: 0 }}>
            {listForView.map((c) => (
              <Tooltip key={c.id} title={!open ? c.title : ''} placement="right">
                <ListItemButton
                  onClick={() => {
                    setActive(c.id);
                    navigate(`/c/${c.id}`);
                  }}
                  sx={{ justifyContent: open ? 'initial' : 'center' }}
                  aria-label={`open chat ${c.title}`}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 1.5 : 0, justifyContent: 'center' }}>
                    <History fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={c.title}
                    secondary={open ? new Date(c.updatedAt).toLocaleString() : undefined}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            ))}

            
            {filtered.length > VISIBLE && (
              <Box
                sx={{
                  mt: 0.5,
                  pb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: open ? 'flex-start' : 'center',
                  gap: 1,
                }}
              >
                {open ? (
                  <Button size="small" onClick={() => setShowAll((v) => !v)}>
                    {showAll ? '←View less' : 'View all→'}
                  </Button>
                ) : (
                  <Tooltip title={showAll ? 'View less' : 'View all'}>
                    <IconButton size="small" onClick={() => setShowAll((v) => !v)}>
                      {showAll ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            )}
          </List>
        </Box>

        
        <Stack spacing={1.25} sx={{ mt: 'auto' }}>
          {open ? (
            <Button
              size="small"
              startIcon={<StarOutline />}
              variant="outlined"
              onClick={() => alert('Pro upgrade placeholder')}
              sx={{ justifyContent: 'flex-start' }}
            >
              Try Pro
            </Button>
          ) : (
            <Tooltip title="Try Pro" placement="right">
              <IconButton onClick={() => alert('Pro upgrade placeholder')}>
                <StarOutline />
              </IconButton>
            </Tooltip>
          )}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={open ? 'space-between' : 'center'}
          >
            <Avatar sx={{ width: 32, height: 32 }}>LC</Avatar>
            {open && (
              <Typography variant="body2" color="text.secondary">
                Laurence Cruz
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </MiniDrawer>
  );
}
