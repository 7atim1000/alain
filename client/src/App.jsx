import {Route, Routes, Navigate} from 'react-router-dom' ;
import {Toaster} from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginPage from './pages/LoginPage';
import Applications from './pages/applications';
import Phases from './pages/Phases';
import ConnectedServices from './pages/ConnectedServices';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';


const App = () => {

  const {authUser, loading} = useContext(AuthContext);

  
  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    );
  }


  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={authUser ? <Dashboard/> : <LoginPage />} />
        <Route path='/apps' element={authUser ? <Applications/> : <LoginPage/>}/>
        <Route path='/phases' element={authUser ? <Phases/> : <LoginPage/>}/>
        <Route path='/m-services' element={authUser ? <ConnectedServices /> : <LoginPage />}/>
        <Route path='/profile' element={authUser ? <Profile /> : <LoginPage/>}/>
        
        {/* Add a catch-all route */}
        <Route path='*' element={authUser ? <Dashboard /> : <LoginPage />} />
      </Routes>
    </>
    
  )
};

export default App ;