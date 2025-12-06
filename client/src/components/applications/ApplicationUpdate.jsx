import {useState, useEffect, useContext, useRef} from 'react'
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast' ;
import { motion } from 'framer-motion'
import { IoCloseCircle } from 'react-icons/io5';
import { LuSquareCheckBig } from "react-icons/lu";

const ApplicationUpdate = ({setIsUpdateApplication, app, fetchApps}) => {

    const { axios } = useContext(AuthContext); 
    const [isLoading, setIsLoading] = useState(false);
    const [appName, setAppName] = useState(app.appName || app.name || app.applicationName || '');
    const inputRef = useRef(null);

    // Focus on input when component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        
        // Validation
        if (!appName.trim()) {
            toast.error('Application name is required');
            return;
        }

        if (appName.trim() === app.appName) {
            toast.error('Application name is the same as current name');
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
                // Refresh the applications list
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
        <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50'
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='bg-white p-2 rounded-xs shadow-xl w-120 md:mt-0 mt-0'
            >

                {/*Modal Header */}
                <div className="flex justify-between items-center mb-2 shadow-xl p-2">
                    <h2 className='text-[#1a1a1a] text-md font-medium'>Update Application</h2>
                    <button onClick={handleClose}
                        className='rounded-xs text-gray-500 cursor-pointer
                                border-b border-gray-500'>
                        <IoCloseCircle size={22} />
                    </button>
                </div>

                {/*Modal Body*/}
                <form className='mt-5 space-y-6' onSubmit={onSubmitHandler}>

                    <div className='flex items-center justify-between'>
                        <label className='w-[30%] text-[#1a1a1a] block mb-2 mt-3 px-4 text-sm font-normal max-md:hidden'>
                            Application Name
                        </label>
                        <div className='flex w-[70%] max-md:w-[100%] items-center justify-between shadow-xl p-3 text-sm rounded-xs'>
                            <input
                                ref={inputRef}
                                type='text'
                                name='appName'
                                onChange={(e) => setAppName(e.target.value)}
                                value={appName}
                                placeholder='Enter application name'
                                className='bg-transparent w-full text-[#1a1a1a] focus:outline-none border-b border-gray-500'
                                required
                                autoComplete='off'
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className={`p-1 text-xs font-semibold cursor-pointer w-full mt-5 h-10 rounded-sm
                            ${isLoading 
                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                : 'bg-gray-500 text-white hover:bg-gray-600'
                            }`}
                    >
                        <LuSquareCheckBig className='w-4 h-4 inline mr-1' />
                        {isLoading ? 'Updating...' : 'Update Application'}
                    </button>

                </form>
            </motion.div>
        </div> 
    );
};

export default ApplicationUpdate;