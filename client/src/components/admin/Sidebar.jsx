import {useState} from 'react'
import { adminMenuLinks } from "../../assets/assets";
import { CiEdit } from "react-icons/ci";
import { toast } from 'react-hot-toast';
import { FaBackwardStep } from "react-icons/fa6";
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';



const Sidebar = () => {
    
    const { user, fetchUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className ='relative  md:flex flex-col items-center pt-2 max-w-13 md:max-w-45 w-full border-r
        border-gray-200 text-sm min-h-screen '>
        {/*min-h-screen */}
            <div className='w-full'>

                {adminMenuLinks.map((link, index) => (
                    <NavLink key={index} to={link.path}
                        className={`relative flex items-center gap-2 w-full py-3 px-4 first:mt-6 border-b border-gray-300 
                                ${link.path === location.pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'}`}
                    >
                        <img src={link.path === location.pathname ? link.icon : link.iconUnclored}
                            className='h-7 md:h-8 w-10 md:w-8 rounded-full color-primary'
                        />

                        <span className='max-md:hidden'>{link.name}</span>
                        <div
                            className={`${link.path === location.pathname && 'bg-primary'} w-1.5 h-8 rounded-l
                                    right-0 absolute`}
                        >
                        </div>
                    </NavLink>
                ))}

                <button onClick={() => navigate('/')} className='flex items-center gap-2 mb-2 mt-2 text-gray-500 cursor-pointer ml-4 mt-1'>
                    <FaBackwardStep className='w-5 h-5' onClick={() => navigate('/')}/>
                </button>

            </div>
            
        </div>
    );
}


export default Sidebar;


