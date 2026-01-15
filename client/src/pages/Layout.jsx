import React, {useEffect} from 'react' ;
import NavbarAdmin from '../components/admin/NavbarAdmin';
import Sidebar from '../components/admin/Sidebar';

import { Outlet, useNavigate } from 'react-router-dom' ;

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Dashboard from './Dashboard';

const Layout = () => {
    const {isAdmin} = useContext(AuthContext);
    const navigate = useNavigate();
    // useEffect(()=>{
    //    if (!isAdmin){
    //     navigate('/')
    //    }
    // }, [isAdmin]);

    return (
        <div className ='flex flex-col bg-taupe'>
            {/* <NavbarAdmin /> */}
            
            <div className ='flex bg-taupe'>
                <Sidebar/>
                <Outlet/>
                
            </div>
        </div>
    );
}

export default Layout ;