import { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion'
import { IoCloseCircle } from 'react-icons/io5';
import { LuSquareCheckBig } from "react-icons/lu";

const ApplicationUpdate = ({ setIsUpdateApplication, app, fetchApps }) => {
    const { axios } = useContext(AuthContext); 
    const [isLoading, setIsLoading] = useState(false);
    const [appName, setAppName] = useState(app.appName || app.name || app.applicationName || '');
    const inputRef = useRef(null);

    // Focus on input when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                // Select all text for easy editing
                inputRef.current.select();
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        
        // Validation
        if (!appName.trim()) {
            toast.error('Application name is required');
            return;
        }

        if (appName.trim() === app.appName) {
            toast.error('No changes detected');
            return;
        }

        setIsLoading(true);

        try {
            const { data } = await axios.put(`/v1/api/app/${app._id}/app-name`, {
                appName: appName.trim()
            });

            if (data.success) {
                toast.success('Application updated successfully');
                setIsUpdateApplication(false);
                if (fetchApps) {
                    fetchApps();
                }
            } else {
                toast.error(data.message || 'Failed to update application');
            }
        } catch (error) {
            console.error('Update application error:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to update application');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleClose = () => {
        setIsUpdateApplication(false);
    }

    return (
        <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='bg-black border border-gray-800 rounded-xl w-full max-w-md'
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800">
                    <div>
                        <h2 className='text-xl font-bold text-white'>Update Application</h2>
                        <p className='text-gray-400 text-sm mt-1'>
                            Update the name of "{app.appName || app.name || app.applicationName}"
                        </p>
                    </div>
                    <button 
                        onClick={handleClose}
                        className='text-gray-400 hover:text-white transition-colors cursor-pointer'
                        disabled={isLoading}
                    >
                        <IoCloseCircle size={24} />
                    </button>
                </div>

                {/* Modal Body */}
                <form className='p-4 md:p-6 space-y-6' onSubmit={onSubmitHandler}>
                    <div>
                        <label className='block text-sm font-medium text-gray-300 mb-3'>
                            Application Name
                        </label>
                        <div className='relative'>
                            <input
                                ref={inputRef}
                                type='text'
                                name='appName'
                                onChange={(e) => setAppName(e.target.value)}
                                value={appName}
                                placeholder='Enter new application name'
                                className='w-full p-3 md:p-4 pl-4 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent transition-all text-sm md:text-base'
                                required
                                autoComplete='off'
                                disabled={isLoading}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                </svg>
                            </div>
                        </div>
                        <p className='text-gray-500 text-xs mt-2'>
                            Current name: <span className='text-taupe font-medium'>{app.appName || app.name || app.applicationName}</span>
                        </p>
                    </div>

                    {/* Current App Info */}
                    <div className="bg-white/5 border border-gray-800 rounded-lg p-3 md:p-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-taupe/20 flex items-center justify-center">
                                <span className="text-taupe font-bold text-sm">
                                    {(app.appName || app.name || app.applicationName).charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-gray-400 font-medium mb-1">Current Application</p>
                                <p className="text-sm text-white">{app.appName || app.name || app.applicationName}</p>
                            </div>
                        </div>
                        <div className="text-xs text-gray-500">
                            ID: <span className="font-mono text-gray-400">{app._id?.substring(0, 8)}...</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-800">
                        <button
                            type='button'
                            onClick={handleClose}
                            className='flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer'
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={isLoading || !appName.trim() || appName.trim() === app.appName}
                            className='flex-1 bg-taupe hover:bg-taupe/90 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <>
                                    <LuSquareCheckBig className="w-5 h-5" />
                                    <span>Update Application</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Validation Rules */}
                    <div className="bg-white/5 border border-gray-800 rounded-lg p-3 md:p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-taupe/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-taupe" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-300 font-medium mb-1">Requirements:</p>
                                <ul className="text-xs text-gray-400 space-y-1">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                                        <span>Application name cannot be empty</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                                        <span>Name must be different from current</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                                        <span>Will not affect existing phases</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div> 
    );
};

export default ApplicationUpdate;

// import {useState, useEffect, useContext, useRef} from 'react'
// import { AuthContext } from '../../../context/AuthContext';
// import { toast } from 'react-hot-toast' ;
// import { motion } from 'framer-motion'
// import { IoCloseCircle } from 'react-icons/io5';
// import { LuSquareCheckBig } from "react-icons/lu";

// const ApplicationUpdate = ({setIsUpdateApplication, app, fetchApps}) => {

//     const { axios } = useContext(AuthContext); 
//     const [isLoading, setIsLoading] = useState(false);
//     const [appName, setAppName] = useState(app.appName || app.name || app.applicationName || '');
//     const inputRef = useRef(null);

//     // Focus on input when component mounts
//     useEffect(() => {
//         if (inputRef.current) {
//             inputRef.current.focus();
//         }
//     }, []);

//     const onSubmitHandler = async(e) => {
//         e.preventDefault();
        
//         // Validation
//         if (!appName.trim()) {
//             toast.error('Application name is required');
//             return;
//         }

//         if (appName.trim() === app.appName) {
//             toast.error('Application name is the same as current name');
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const { data } = await axios.put(`/v1/api/app/${app._id}/app-name`, {
//                 appName: appName.trim()
//             });

//             if (data.success) {
//                 toast.success('Application updated successfully');
//                 setIsUpdateApplication(false);
//                 // Refresh the applications list
//                 if (fetchApps) {
//                     fetchApps();
//                 }
//             } else {
//                 toast.error(data.message || 'Failed to update application');
//             }
//         } catch (error) {
//             console.error('Update application error:', error);
//             toast.error(error.response?.data?.message || error.message || 'Failed to update application');
//         } finally {
//             setIsLoading(false);
//         }
//     };
    
//     const handleClose = () => {
//         setIsUpdateApplication(false);
//     }

//     return (
//         <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50'
//             style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.3, ease: 'easeInOut' }}
//                 className='bg-white p-2 rounded-xs shadow-xl w-120 md:mt-0 mt-0'
//             >

//                 {/*Modal Header */}
//                 <div className="flex justify-between items-center mb-2 shadow-xl p-2">
//                     <h2 className='text-[#1a1a1a] text-md font-medium'>Update Application</h2>
//                     <button onClick={handleClose}
//                         className='rounded-xs text-gray-500 cursor-pointer
//                                 border-b border-gray-500'>
//                         <IoCloseCircle size={22} />
//                     </button>
//                 </div>

//                 {/*Modal Body*/}
//                 <form className='mt-5 space-y-6' onSubmit={onSubmitHandler}>

//                     <div className='flex items-center justify-between'>
//                         <label className='w-[30%] text-[#1a1a1a] block mb-2 mt-3 px-4 text-sm font-normal max-md:hidden'>
//                             Application Name
//                         </label>
//                         <div className='flex w-[70%] max-md:w-[100%] items-center justify-between shadow-xl p-3 text-sm rounded-xs'>
//                             <input
//                                 ref={inputRef}
//                                 type='text'
//                                 name='appName'
//                                 onChange={(e) => setAppName(e.target.value)}
//                                 value={appName}
//                                 placeholder='Enter application name'
//                                 className='bg-transparent w-full text-[#1a1a1a] focus:outline-none border-b border-gray-500'
//                                 required
//                                 autoComplete='off'
//                                 disabled={isLoading}
//                             />
//                         </div>
//                     </div>

//                     <button
//                         type='submit'
//                         disabled={isLoading}
//                         className={`p-1 text-xs font-semibold cursor-pointer w-full mt-5 h-10 rounded-sm
//                             ${isLoading 
//                                 ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
//                                 : 'bg-gray-500 text-white hover:bg-gray-600'
//                             }`}
//                     >
//                         <LuSquareCheckBig className='w-4 h-4 inline mr-1' />
//                         {isLoading ? 'Updating...' : 'Update Application'}
//                     </button>

//                 </form>
//             </motion.div>
//         </div> 
//     );
// };

// export default ApplicationUpdate;