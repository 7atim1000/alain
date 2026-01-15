import {Route, Routes, Navigate, useLocation} from 'react-router-dom' ;
import {Toaster} from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginPage from './pages/LoginPage';
import Applications from './pages/Applications';
import Phases from './pages/Phases';
import ConnectedServices from './pages/ConnectedServices';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Homeboard from './pages/Homeboard';


const App = () => {

  const {authUser, loading} = useContext(AuthContext);
  const isAdminPath= useLocation().pathname.startsWith('/admin');

  
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }


  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element= { <Homeboard /> }/>
        <Route path='/admin-login' element={<LoginPage />} />

        <Route path='/admin' element={<Layout />}>
          <Route index element={<Applications />} />

          {/* <Route path='apps' element ={<Applications />} />
          <Route path='phases' element ={<Phases />} />
          <Route path='profile' element ={<Profile />} /> */}

          {/* <Route path='apps' element={authUser ? <Applications /> : <LoginPage />} /> */}
          <Route path='apps' element={authUser ? <Applications /> : <Navigate to="/admin-login" />} />
          {/* <Route path='phases' element={authUser ? <Phases /> : <LoginPage />} /> */}
          <Route path='phases' element={authUser ? <Phases /> : <Navigate to="/admin-login" />} />
          <Route path='profile' element={authUser ? <Profile /> : <Navigate to="/admin-login" />} />
        
          <Route path='m-services' element={authUser ? <ConnectedServices /> : <LoginPage />} />
         
            
        </Route>
        
          
        {/* Add a catch-all route */}
        {/* <Route path='*' element={authUser ? <Dashboard /> : <LoginPage />} /> */}
      </Routes>
    </>
    
  )
};

export default App ;