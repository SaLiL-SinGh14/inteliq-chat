import {
    Box, IconButton, Paper, TextField, Tooltip, InputAdornment
  } from '@mui/material';
  import Send from '@mui/icons-material/Send';
  import AttachFile from '@mui/icons-material/AttachFile';
  import CameraAltOutlined from '@mui/icons-material/CameraAltOutlined';
  import { useState, useRef } from 'react';
  import { useChatStore } from '../../store/chatStore';
  import { useNavigate } from 'react-router-dom';
  import { nanoid } from 'nanoid';
  import type { Attachment } from '../../types/chat';
  import AttachmentChips from './AttachmentChips';
  
  type ComposerProps = {
    standalone?: boolean;
    onSubmit?: (text: string) => void; 
  };
  
  export default function Composer({ standalone = false, onSubmit }: ComposerProps) {
    const [text, setText] = useState('');
    const [files, setFiles] = useState<Attachment[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
  
    const send = useChatStore((s) => s.sendUserMessage);
    const appendAssistant = useChatStore((s) => s.appendAssistantMessage);
    
    const navigate = useNavigate();
  
    const handleFiles = (fileList: FileList | null) => {
      if (!fileList) return;
      const next: Attachment[] = Array.from(fileList).map((f) => ({
        id: nanoid(),
        name: f.name,
        size: f.size,
        type: f.type,
      }));
      setFiles((prev) => [...prev, ...next]);
    };
  
    const onPaste: React.ClipboardEventHandler<HTMLDivElement> = (e) => {
      if (e.clipboardData.files?.length) {
        handleFiles(e.clipboardData.files);
        e.preventDefault();
      }
    };
  
    const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
    };
  
    const doSendIntoActive = (trimmed: string) => {
      const { chatId } = send(trimmed, files);
      setText('');
      setFiles([]);
      if (standalone) navigate(`/c/${chatId}`);
      setTimeout(() => appendAssistant(chatId), 700);
    };
  
    const submit = () => {
      const trimmed = text.trim();
      if (!trimmed && files.length === 0) return;
  
      if (onSubmit) {
        onSubmit(trimmed);
        setText('');
        setFiles([]);
        return;
      }
  
      
      doSendIntoActive(trimmed);
    };
  
    return (
      <Box onDrop={onDrop} onDragOver={(e) => e.preventDefault()} onPaste={onPaste}>
        <AttachmentChips
          files={files}
          onRemoveOne={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
          onClearAll={() => setFiles([])}
        />
  
        <Paper
          variant="outlined"
          sx={{ mt: 1, p: 1, display: 'flex', alignItems: 'center', borderRadius: 3 }}
        >
          <TextField
            inputRef={inputRef}
            placeholder="Ask me a question..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            multiline
            maxRows={6}
            fullWidth
            variant="standard"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Attach">
                    <IconButton component="label">
                      <AttachFile />
                      <input hidden type="file" multiple onChange={(e) => handleFiles(e.target.files)} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Camera (decorative)">
                    <IconButton>
                      <CameraAltOutlined />
                    </IconButton>
                  </Tooltip>
                  <IconButton color="primary" onClick={submit}>
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </Box>
    );
  }
  