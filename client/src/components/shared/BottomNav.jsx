import { useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaAppStoreIos } from "react-icons/fa6";
import { TbCirclesRelation } from "react-icons/tb";
import { TfiMicrosoftAlt } from "react-icons/tfi";
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const BottomNav = () => {
    const navigate = useNavigate();
    const isActive = (path) => location.pathname === path ;
    const {user} = useContext(AuthContext)

    return (
        <div className='
            fixed bottom-0 left-0 right-0 
            bg-linear-65 from-gray-300 to-white 
            p-2 h-15 flex justify-around
  
            max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 
            max-md:grid max-md:grid-cols-5 max-md:place-items-center
            '>
            {/* Button 1 - Dashboard */}
            <button
                onClick={() => navigate('/')}
                className={`flex items-center justify-center font-bold
                        ${isActive('/') ? "text-white bg-gray-500" : "text-gray-500"}
                        w-[150px] rounded-[20px] cursor-pointer
                        max-md:w-auto max-md:p-2`}
            >
                <MdDashboard className='inline mr-2' size={30} />
                <p className='max-md:hidden'>Dashboard</p>
            </button>

            {/* Button 2 - Applications */}
            <button
                onClick={() => navigate('/apps')}
                className={`flex items-center justify-center font-bold
                    ${isActive('/apps') ? "text-white bg-gray-500 max-md:bg-transparent max-md:text-blue-300" : "text-gray-500"}
                    w-[150px] rounded-[20px] cursor-pointer
                    max-md:w-auto max-md:p-2`}
            >
                <FaAppStoreIos className='inline mr-2' size={30} />
                <p className='max-md:hidden'>Applications</p>
            </button>

            {/* Button 3 - Profile (Center) */}
            <button
                onClick={() => navigate('/profile')}
                className='
                    flex items-center justify-center
                    rounded-full p-2 
                    cursor-pointer
                    max-md:col-start-3 max-md:row-start-1
                    max-md:justify-self-center
                '
            >
                <img src={user.image} className='w-12 h-12 rounded-full' />
            </button>

            {/* Button 4 - Phases */}
            <button
                onClick={() => navigate('/phases')}
                className={`flex items-center justify-center font-bold
                    ${isActive('/phases') ? "text-white bg-gray-500 max-md:bg-transparent max-md:text-blue-300" : "text-gray-500"}
                    w-[150px] rounded-[20px] cursor-pointer
                    max-md:w-auto max-md:p-2
                    max-md:col-start-4`}
            >
                <TbCirclesRelation className='inline mr-2' size={30} />
                <p className='max-md:hidden'>Phases</p>
            </button>


            {/* Button 5 - Microsoft Services */}
            <button
                onClick={() => navigate('/m-services')}
                className={`flex items-center justify-center font-bold
                    ${isActive('/m-services') ? "text-white bg-gray-500 max-md:bg-transparent max-md:text-blue-300" : "text-gray-500"}
                    w-[150px] rounded-[20px] cursor-pointer
                    max-md:w-auto max-md:p-2
                    max-md:col-start-5`}
            >
                <TfiMicrosoftAlt className='inline mr-2' size={25} />
                <p className='max-md:hidden text-sm'>Microsoft Services</p>
            </button>

        </div>
    );
}

export default BottomNav;