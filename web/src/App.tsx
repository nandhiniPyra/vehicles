// App.tsx
import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ContactsPage from './pages/ContactsPage';
import GalleryPage from './pages/GalleryPage';
import { Provider } from 'react-redux';
import store from './store/store';
import FilteredPage from './pages/FilteredPage';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
       <AuthProvider>
 <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/contacts' element={<ContactsPage />} />
          <Route path='/gallery' element={<GalleryPage />} />
          <Route path='/filtered-results' element={<FilteredPage/>} />
        </Routes>
      </Router>
      </Provider>
    </AuthProvider>
  );
};

export default App;
