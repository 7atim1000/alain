import React,{ useContext }  from 'react' ;
import {Link} from 'react-router-dom'
import { IoCarSport } from "react-icons/io5";
import { AuthContext } from '../../../context/AuthContext';



const NavbarOwner = () => {
    
    const { user } = useContext(AuthContext);
    
    
    return (
        <div className ='flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-2 text-white 
        relative transition-all bg-black mb-1'>
            <Link to ='/'>
                <div className ='flex items-center gap-2'>
                   <img
                            src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
                            
                            alt="Logo"
                            className="h-12 md:h-15 w-auto invert mb-0.5 md:mb-1"
                    />
              
                </div>
            </Link>
            <p className ='text-white'><span className ='text-xs text-gray-300'>Welecome</span> {user?.fullName || "Owner"}</p>
        </div>
    );
}

export default NavbarOwner ;