# 🚀 IntelIQ Chat

IntelIQ Chat is a **modern chat application UI** built with **React + TypeScript + Vite**.  
It provides a clean interface for creating new chats, sending messages, and managing multiple chat sessions.  

---

## ✨ Features

- 🆕 **New Chat Screen** with quick prompt cards  
- 💬 **Active Chat View** with message composer  
- 🧭 **Routing** between `/` (new chat) and `/c/:id` (active chat)  
- 🎨 **Material UI (MUI)** for modern responsive design  
- ⚡ **Zustand** for global state management  
- 🔒 Type safety with **TypeScript**  
- 📂 Organized project structure for scalability  

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite  
- **UI Library:** Material UI (MUI v5)  
- **State Management:** Zustand  
- **Routing:** React Router v6  
- **Build Tool:** Vite  

---

## 📸 Screenshots

👉 Add your project screenshots here (store them in a `screenshots/` folder):  

### New Chat Screen
![New Chat Screen](./screenshots/new-chat.png)

### Active Chat View
![Active Chat](./screenshots/active-chat.png)

---
## 📌 How It Works

- On `/` → Displays **New Chat Screen** with 3 prompt cards and a composer.  
- Selecting a card or sending a message → Creates a **new chat** and navigates to `/c/:id`.  
- `/c/:id` → Shows **Active Chat View** with sidebar + topbar + messages.  
- State stored in memory via **Zustand** (*no persistence on refresh yet*).  

---

## ⚖️ Challenges & Trade-offs

During development, a few challenges and ambiguities came up:

- **State Persistence**  
  Currently, chat state is only stored in memory (Zustand). On page refresh, all chats are lost.  
  👉 *Trade-off:* This kept the implementation simple and fast for a prototype, but persistence (LocalStorage / Database) can be added later.

- **UI Responsiveness**  
  Ensuring the layout works well across desktop and mobile required multiple adjustments in Material UI.  
  👉 *Trade-off:* Prioritized desktop-first design for faster development; mobile optimizations are planned.

- **Routing Decisions**  
  Choosing between a single-page stateful view vs. multi-route navigation (`/c/:id`).  
  👉 *Trade-off:* Opted for multi-route navigation for scalability (easier to add features like chat history or user profiles later).

- **Attachment & Media Handling**  
  Currently only text messages are supported.  
  👉 *Trade-off:* Skipped file upload initially to focus on chat flow; can be added as a future enhancement.  


## ⚙️ Installation & Setup

Clone the repository and install dependencies:

```bash
Clone the repository
git clone https://github.com/SaLiL-SinGh14/inteliq-chat.git

# Navigate into the project folder
cd inteliq-chat
# Install dependencies
npm install
npm run dev
npm run build
npm run preview
src/
├── app/                 # App-level logic
│   └── BootNavigate.tsx
├── components/          # UI Components
│   ├── chat/            # Chat-related UI
│   │   └── ActiveChat.tsx
│   ├── new-chat/        # New chat screen
│   │   └── NewChat.tsx
│   ├── layout/          # Layout (Sidebar, TopBar, Shell)
│   ├── Composer.tsx
│   ├── QuickCard.tsx
│   └── AttachmentChips.tsx
├── store/               # Zustand stores
│   ├── chatStore.ts
│   └── uiStore.ts
├── routes/              # App routes
│   └── routes.tsx
├── types/               # TypeScript types
│   └── chat.ts
└── utils/               # Utility functions
    └── placeholders.ts



