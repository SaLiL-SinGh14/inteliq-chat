import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Shell from '../components/layout/Shell';
import NewChat from '../components/new-chat/NewChat';
import ActiveChat from '../components/chat/ActiveChat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <NewChat /> },
      { path: 'c/:id', element: <ActiveChat /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
