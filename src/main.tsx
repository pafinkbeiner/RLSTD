import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
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
        path: "/Training/",
        element: <BaseLayout><Training /></BaseLayout>,
        errorElement: <ErrorPage />
    },
    {
        path: "/Settings/",
        element: <BaseLayout><Settings /></BaseLayout>,
        errorElement: <ErrorPage />
    },
    {
        path: "/History/",
        element: <BaseLayout><History /></BaseLayout>,
        errorElement: <ErrorPage />
    },
], {
    basename: "/RLSTD/", future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
    }
});

createRoot(document.getElementById('root')!).render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider future={{ v7_startTransition: true }} router={router} />
    </ThemeProvider>,
)
