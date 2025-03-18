import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import MainPage from './components/MainPage';
import UncontrolledFormPage from './components/UncontrolledFormPage';
import ReactHookFormPage from './components/ReactHookFormPage';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="h-[calc(100vh-4rem)] container mx-auto pt-12">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route
              path="/uncontrolled-form"
              element={<UncontrolledFormPage />}
            />
            <Route path="/hook-form" element={<ReactHookFormPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
