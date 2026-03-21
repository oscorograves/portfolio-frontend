import { StrictMode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorBoundary from './components/ui/ErrorBoundary';
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import './i18n';

// Redirect from Render subdomain to custom domain
if (window.location.hostname === 'portfolio-frontend-3mxv.onrender.com') {
  window.location.replace('https://scalewithkanishk.in' + window.location.pathname + window.location.search);
}

const rootElement = document.getElementById('root');
const app = (
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">Loading...</div>}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
