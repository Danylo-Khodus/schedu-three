import { lazy } from 'react';

import './stylesheets/styles.css';
import './stylesheets/utils.css';

import Layout from './Layout';
import HomePage from './pages/HomePage';
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const HomeworkPage = lazy(() => import('./pages/HomeworkPage'));
const CreateArticlePage = lazy(() => import('./pages/CreateSchedulePage'));

import {Route, Routes} from "react-router-dom";
import { UserContextProvider } from './UserContext';

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/write' element={<CreateArticlePage />} />
          <Route path='/homework' element={<HomeworkPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
