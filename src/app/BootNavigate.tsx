import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useChatStore } from '../store/chatStore';

export default function BootNavigate() {
    const navigate = useNavigate();
    const location = useLocation() as ReturnType<typeof useLocation> & { state?: any };
    const activeId = useChatStore((s) => s.activeChatId);

    useEffect(() => {
        
        if (location.pathname !== '/') return;
        if (location.state?.intent === 'newChat') return; 
        if (activeId) navigate(`/c/${activeId}`, { replace: true });
    }, [activeId, location.pathname, location.state, navigate]);

    return null;
}
