import { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider } from './context/ThemeProvider';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="app min-h-screen flex flex-col dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
