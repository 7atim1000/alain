import React,{ useContext }  from 'react' ;
import {Link} from 'react-router-dom'
import { IoCarSport } from "react-icons/io5";
import { AuthContext } from '../../../context/AuthContext';



const NavbarOwner = () => {
    
    const { user } = useContext(AuthContext);
    
    
    return (
        <div className ='flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-2 text-white border-b border-borderColor
        relative transition-all bg-gray-600'>
            <Link to ='/'>
                <div className ='flex items-center gap-2'>
                   <img src="https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOx6o6LSCCNTz3wnyR1iYbmJcFrVvhHMXdG9SP" 
                   className='w-13 h-13 rounded-full' />
                   
                </div>
            </Link>
            <p className ='text-white'><span className ='text-xs text-gray-300'>Welecome</span> {user?.fullName || "Owner"}</p>
        </div>
    );
}

export default NavbarOwner ;