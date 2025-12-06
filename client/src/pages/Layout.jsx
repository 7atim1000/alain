import React, {useEffect} from 'react' ;
import NavbarAdmin from '../components/admin/NavbarAdmin';
import Sidebar from '../components/admin/Sidebar';

import { Outlet, useNavigate } from 'react-router-dom' ;

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Layout = () => {
    const {isAdmin} = useContext(AuthContext);
    const navigate = useNavigate();
    // useEffect(()=>{
    //    if (!isAdmin){
    //     navigate('/')
    //    }
    // }, [isAdmin]);

    return (
        <div className ='flex flex-col'>
            <NavbarAdmin />
            
            <div className ='flex'>
                <Sidebar/>
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout ;