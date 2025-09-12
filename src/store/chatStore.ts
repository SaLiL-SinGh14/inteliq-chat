import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Chat, Message, Attachment } from '../types/chat';
import { nextAssistantReply } from '../utils/placeholders';

type ChatState = {
  chats: Chat[];
  activeChatId?: string;
  search: string;

  startNewChat: (seedText?: string, seedAttachments?: Attachment[]) => string;
  sendUserMessage: (
    text: string,
    attachments?: Attachment[]
  ) => { chatId: string; message: Message };
  appendAssistantMessage: (chatId: string, text?: string) => Message;
  setActive: (id: string) => void;
  setSearch: (q: string) => void;
  clearAll: () => void;

  removeChat: (id: string) => void;
  removeOldest: () => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  activeChatId: undefined,
  search: '',

  setSearch: (q) => set({ search: q }),
  setActive: (id) => set({ activeChatId: id }),

  clearAll: () => set({ chats: [], activeChatId: undefined, search: '' }),

  startNewChat: (seedText, seedAttachments) => {
    const id = nanoid();
    const now = Date.now();
    const initial: Chat = {
      id,
      title: seedText?.slice(0, 40) || 'New Chat',
      messages: seedText
        ? [
            {
              id: nanoid(),
              role: 'user',
              text: seedText,
              createdAt: now,
              attachments: seedAttachments,
            },
          ]
        : [],
      createdAt: now,
      updatedAt: now,
    };
    set((s) => ({ chats: [initial, ...s.chats], activeChatId: id }));
    return id;
  },

  sendUserMessage: (text, attachments) => {
    const { activeChatId, chats } = get();
    const chatId = activeChatId ?? get().startNewChat();
    const msg: Message = { id: nanoid(), role: 'user', text, createdAt: Date.now(), attachments };
    set({
      chats: chats.map((c) =>
        c.id === chatId
          ? {
              ...c,
              title: c.messages.length ? c.title : text.slice(0, 40),
              messages: [...c.messages, msg],
              updatedAt: Date.now(),
            }
          : c
      ),
      activeChatId: chatId,
    });
    return { chatId, message: msg };
  },

  appendAssistantMessage: (chatId, text) => {
    const reply = text ?? nextAssistantReply();
    const msg: Message = { id: nanoid(), role: 'assistant', text: reply, createdAt: Date.now() };
    set((s) => ({
      chats: s.chats.map((c) =>
        c.id === chatId ? { ...c, messages: [...c.messages, msg], updatedAt: Date.now() } : c
      ),
    }));
    return msg;
  },

  removeChat: (id) =>
    set((s) => ({
      chats: s.chats.filter((c) => c.id !== id),
      activeChatId: s.activeChatId === id ? undefined : s.activeChatId,
    })),

    removeOldest: () => {
        const { chats } = get();
        const oldest = chats.reduce<Chat | undefined>(
          (min, c) => (!min || c.updatedAt < min.updatedAt ? c : min),
          undefined
        );
        if (!oldest) return;
        set((s) => ({
          chats: s.chats.filter((c) => c.id !== oldest.id),
          activeChatId: s.activeChatId === oldest.id ? undefined : s.activeChatId,
        }));
      },
}));
