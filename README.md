Project overview
A React + TypeScript chat UI with:
New Chat screen showing three clickable prompt cards.
A composer input on the New Chat screen to start a chat without using cards.
Persistent layout with sidebar, top bar, and routed content area.
Tech stack
React, TypeScript, React Router, Zustand, MUI (Grid v2, AppBar, Card).
Getting started
Prerequisites
Node.js 18+ and npm (or pnpm/yarn).
Installation
Clone the repo, install dependencies, and start dev server.
Commands:
git clone  https://github.com/SaLiL-SinGh14/inteliq-chat.git
cd intelq-chat
npm install
npm run dev
Build and preview
npm run build
npm run preview
Optional environment variables
Create a .env for any future backends if needed.
Example:
VITE_API_BASE_URL=https://api.example.com
Scripts
npm run dev: start local dev server.
npm run build: production build.
npm run preview: serve the built app locally.
Folder structure
src/
app/
BootNavigate.tsx
components/
chat/
ActiveChat.tsx
Composer.tsx
AttachmentChips.tsx
layout/
Shell.tsx
TopBar.tsx
Sidebar.tsx
new-chat/
NewChat.tsx
QuickCard.tsx
store/
chatStore.ts
uiStore.ts
routes/
routes.tsx
types/
chat.ts
utils/
placeholders.ts
Core features
New Chat screen
Renders three prompt cards; clicking one creates a new chat with that text and navigates to
/c/:id.
Shows a composer below the cards; submitting starts a new chat and navigates to /c/:id.
Top bar
Single “New Chat” button always opens “/” so the New Chat screen with cards and
composer is visible, even after refresh or when an active chat exists.
Routing and layout
Shell.tsx hosts Sidebar, TopBar, and Outlet.
routes.tsx mounts NewChat at “/” and ActiveChat at “/c/:id”.
BootNavigate conditionally redirects from “/” to the last active chat unless an explicit intent
to open New Chat is provided.
Key files
Shell.tsx
Flex layout with scrollable main area; ensures content remains clickable and visible
under the header.
BootNavigate.tsx
Redirects from root to active chat only when appropriate; respects explicit intent to
show the New Chat screen.
NewChat.tsx
Displays prompt cards using MUI Grid v2 (size={{ xs, sm, md }}) and the composer.
QuickCard.tsx
Card + CardActionArea for fully clickable boxes with subtle hover styling.
Composer.tsx
Optional onSubmit for New Chat flow; otherwise posts into the active chat as usual.
chatStore.ts
In‑memory store (no persistence) with actions to create chats, send messages, append
assistant replies, and remove chats.
Setup details and gotchas
MUI Grid v2
Use size={{ xs, sm, md }} on Grid items; avoid the old item/xs API to prevent
deprecations and type errors.
Header overlap/z‑index
Ensure the main content area has padding or a Toolbar spacer so it isnʼt hidden by the
top bar.
Redirect logic
BootNavigate shouldnʼt auto‑redirect from “/” when the explicit goal is to show the New
Chat screen; the top bar sends intent state to skip redirect.
State persistence
Persistence was removed so refresh starts clean (no old chats restored).
How challenges and ambiguities were addressed
Grid API changes (deprecations and TS overload errors)
Adopted Grid v2 with size prop; avoided mixed old/new props to eliminate warnings
and errors.
Trade‑off: small refactor in layouts; benefit: stable and future‑proof UI grid.
“New Chat” not showing boxes after the first visit
Redirects to the last active chat were firing whenever returning to “/”.
Solution: top bar navigates with an explicit intent to show New Chat; BootNavigate
respects that and skips redirect.
Trade‑off: slightly more state in navigation, but consistent UX.
Composer reuse on New Chat
Composer originally sent only to active chats; added an optional onSubmit so New Chat
can seed a chat and navigate.
Trade‑off: expanded Composer API for better reuse; kept backward‑compatible
defaults.
Fresh reloads versus saved chats
Requirement was “no retained chats after refresh,” so persistence was removed and
any persisted keys should be cleared during migration.