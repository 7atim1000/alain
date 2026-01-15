import React, { useState, useContext } from 'react';
import { adminMenuLinks } from "../../assets/assets";
import { toast } from 'react-hot-toast';
import { FaBackwardStep } from "react-icons/fa6";
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const Sidebar = () => {
    const { user, fetchUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <div className='relative flex flex-col w-100 min-h-screen bg-black border-t border-taupe mr-1'>

            {/* Sidebar Header/Logo */}
            <div className="p-6 border-b border-taupe">
                <div className="flex flex-col items-center text-center">
                    <div className='flex items-center gap-2'>
                        <img
                            src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}

                            alt="Logo"
                            className="h-12 md:h-15 w-auto invert mb-0.5 md:mb-1"
                        />
                    </div>
                   
                    {/* <span className='text-white font-bold text-lg tracking-wide'>Alain Company</span> */}
                    {user && (
                        <span className="text-taupe text-sm mt-1">{user.role || 'Admin'}</span>
                    )}
                </div>
            </div>
        
            {/* Navigation Menu */}
            <div className='flex-1 py-6 px-4'>
                <nav className="space-y-1">
                    {adminMenuLinks.map((link, index) => {
                        const isActive = location.pathname === link.path;
                        
                        return (
                            <NavLink 
                                key={index} 
                                to={link.path}
                                className={({ isActive: navIsActive }) => 
                                    `group flex items-center gap-3 w-full py-3 px-4 rounded-lg transition-all duration-200
                                    ${navIsActive 
                                        ? 'bg-taupe/20 text-white border-l-4 border-taupe' 
                                        : 'text-gray-300 hover:bg-taupe hover:text-white hover:border-l-4 border-taupe'
                                    }`
                                }
                            >
                                {/* Icon Container - Fixed: Check if icon exists */}
                                <div className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors
                                    ${isActive ? 'bg-taupe' : 'bg-taupe group-hover:bg-taupe'}`}
                                >
                                    {/* Check if icon is a React element or string/image URL */}
                                    {link.icon && typeof link.icon === 'object' && React.isValidElement(link.icon) ? (
                                        React.cloneElement(link.icon, {
                                            className: `w-5 h-5 transition-colors ${isActive ? 'text-black' : 'text-black group-hover:text-taupe'}`
                                        })
                                    ) : link.icon && typeof link.icon === 'string' ? (
                                        // Fallback for image URLs (original version)
                                        <img 
                                            src={isActive ? link.icon : (link.iconUnclored || link.icon)} 
                                            className="w-5 h-5"
                                            alt={link.name}
                                        />
                                    ) : null}
                                </div>
                                
                                {/* Menu Text */}
                                <span className={`font-medium transition-colors ${isActive ? 'text-white' : 'group-hover:text-white'}`}>
                                    {link.name}
                                </span>
                                
                                {/* Active Indicator Dot */}
                                {isActive && (
                                    <div className="ml-auto w-2 h-2 rounded-full bg-taupe animate-pulse"></div>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>
                
                {/* Divider */}
                <div className="my-8 border-t border-taupe"></div>
                
                {/* Back to Home Button */}
                <button 
                    onClick={() => navigate('/')} 
                    className="group flex items-center gap-3 w-full py-3 px-4 rounded-lg text-gray-300 
                        hover:bg-taupe/10 hover:text-white transition-all duration-200 cursor-pointer"
                >
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-taupe group-hover:bg-taupe/20">
                        <FaBackwardStep className="w-5 h-5 text-black group-hover:text-taupe transition-colors" />
                    </div>
                    <span className="font-medium group-hover:text-white transition-colors">Back to Home</span>
                </button>
            </div>
            
            {/* User Profile Section at Bottom */}
            {user && (
                <div className="p-4 border-t border-taupe mt-auto">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-taupe to-taupe
                            flex items-center justify-center">
                            <span className="text-white font-semibold">
                                {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                                {user.name || 'User'}
                            </p>
                            <p className="text-taupe text-xs truncate">
                                {user.email || 'admin@example.com'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;

// import {useState} from 'react'
// import { adminMenuLinks } from "../../assets/assets";
// import { CiEdit } from "react-icons/ci";
// import { toast } from 'react-hot-toast';
// import { FaBackwardStep } from "react-icons/fa6";
// import { useLocation, NavLink, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../../../context/AuthContext';

// const Sidebar = () => {
    
//     const { user, fetchUser } = useContext(AuthContext);
//     const navigate = useNavigate();
    
//     const location = useLocation();
//     const [expandedMenus, setExpandedMenus] = useState({
//         Services: false
//       });
//     const isActive = (path) => {
//         return location.pathname === path;
//     };
//     const isMenuActive = (menu) => {
//         return isActive(menu.path || '') || isSubItemActive(menu.subItems);
//     };

//     return (
//         <div className='min-h-0 relative md:flex flex-col pt-2 max-w-13 md:max-w-75 w-full border-r
//             border-white text-sm min-h-screen bg-gradient-to-b from-black to-[#0a0a0a] mr-3'>

//             {/* Sidebar Header/Logo */}
//             <div className="p-4 border-b-3 border-taupe">
//                 <div className="flex items-center  text-center gap-2">
                    
//                     <span className='text-white mx-auto font-bold text-lg max-md:hidden'>Alain Company</span>
//                 </div>
//             </div>
        
//         {/*min-h-screen */}
//             <div className='w-full'>

//                 {adminMenuLinks.map((link, index) => (
//                     <NavLink key={index} to={link.path}
//                         className={`relative flex items-center gap-2 w-full py-3 px-4 first:mt-6 border-b border-gray-300 
//                                 ${link.path === location.pathname ? 'bg-primary/10 text-primary' : 'text-gray-600'}`}
//                     >
//                         <img src={link.path === location.pathname ? link.icon : link.iconUnclored}
//                             className='h-7 md:h-8 w-10 md:w-8 rounded-full color-primary'
//                         />

//                         <span className='max-md:hidden'>{link.name}</span>
//                         <div
//                             className={`${link.path === location.pathname && 'bg-primary'} w-1.5 h-8 rounded-l
//                                     right-0 absolute`}
//                         >
//                         </div>
//                     </NavLink>
//                 ))}

//                 <button onClick={() => navigate('/')} className='flex items-center gap-2 mb-2 mt-2 text-gray-500 cursor-pointer ml-4 mt-1'>
//                     <FaBackwardStep className='w-5 h-5' onClick={() => navigate('/')}/>
//                 </button>

//             </div>
            
//         </div>
//     );
// }

// export default Sidebar;


