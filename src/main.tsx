import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage.tsx';
import BaseLayout from './BaseLayout.tsx';
import Training from './Training.tsx';
import Dashboard from './Dashboard.tsx';
import Settings from './Settings.tsx';
import History from './History.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout><Dashboard /></BaseLayout>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/training",
        element: <BaseLayout><Training /></BaseLayout>,
        errorElement: <ErrorPage />
    },
    {
        path: "/settings",
        element: <BaseLayout><Settings /></BaseLayout>,
        errorElement: <ErrorPage />
    },
    {
        path: "/history",
        element: <BaseLayout><History /></BaseLayout>,
        errorElement: <ErrorPage />
    },
], {basename: "/RLSTD"});

createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
    </ThemeProvider>,
)
