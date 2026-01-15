import { AuthContext } from '../../../context/AuthContext';
import { useContext, useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { IoCloseCircle } from 'react-icons/io5';
import { LuSquareCheckBig } from "react-icons/lu";

const ApplicationAdd = ({ setIsAppModalOpen, fetchApps }) => {
    const { axios } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [appName, setAppName] = useState('');
    const inputRef = useRef(null);

    // Focus on input when modal opens
    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (isLoading) return null;
        
        // Validation
        if (!appName.trim()) {
            toast.error('Please enter an application name');
            return;
        }
        
        setIsLoading(true);

        try {
            const response = await axios.post('/v1/api/app/', {
                appName: appName.trim()
            });

            if (response.data) {
                toast.success('Application added successfully!');
                setAppName('');
                setIsAppModalOpen(false);
                fetchApps();
            }
        } catch (error) {
            console.error('Error adding application:', error);
            toast.error(error.response?.data?.message || 'Failed to add application');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsAppModalOpen(false);
    };

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
                        <h2 className='text-xl font-bold text-white'>Add New Application</h2>
                        <p className='text-gray-400 text-sm mt-1'>Create a new application in the system</p>
                    </div>
                    <button 
                        onClick={handleClose}
                        className='text-gray-400 hover:text-white transition-colors cursor-pointer'
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
                                name='applicationName'
                                onChange={(e) => setAppName(e.target.value)}
                                value={appName}
                                placeholder='Enter application name'
                                className='w-full p-3 md:p-4 pl-4 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent transition-all text-sm md:text-base'
                                required
                                autoComplete='off'
                                disabled={isLoading}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                        </div>
                        <p className='text-gray-500 text-xs mt-2'>
                            Enter a descriptive name for your application
                        </p>
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
                            disabled={isLoading || !appName.trim()}
                            className='flex-1 bg-taupe hover:bg-taupe/90 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                    <span>Adding...</span>
                                </>
                            ) : (
                                <>
                                    <LuSquareCheckBig className="w-5 h-5" />
                                    <span>Add Application</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Tips */}
                    <div className="bg-white/5 border border-gray-800 rounded-lg p-3 md:p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-taupe/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-3 h-3 text-taupe" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-300 font-medium mb-1">Tips:</p>
                                <p className="text-xs text-gray-400">
                                    Use a descriptive name that clearly identifies the application's purpose.
                                    Example: "Customer Portal" or "Inventory Management System"
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default ApplicationAdd;

// import { AuthContext } from '../../../context/AuthContext';
// import { useContext, useState, useRef, useEffect } from 'react'; // Added useRef and useEffect
// import { toast } from 'react-hot-toast' ;
// import { motion } from 'framer-motion'
// import { IoCloseCircle } from 'react-icons/io5';
// import { LuSquareCheckBig } from "react-icons/lu";

// const ApplicationAdd = ({setIsAppModalOpen, fetchApps}) => {

//     const {axios} = useContext(AuthContext);

//     const [isLoading, setIsLoading] = useState(false);
//     const [appName, setAppName] = useState();
    
//     // Create a ref for the input element
//     const inputRef = useRef(null);

//     // Focus on input when modal opens
//     useEffect(() => {
//         // Small timeout to ensure the modal is fully rendered
//         const timer = setTimeout(() => {
//             if (inputRef.current) {
//                 inputRef.current.focus();
//             }
//         }, 100);

//         // Cleanup the timer
//         return () => clearTimeout(timer);
//     }, []); // Empty dependency array means this runs once when component mounts

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();

//         if (isLoading) return null;
//         setIsLoading(true);

//         try {
//             const response = await axios.post('/v1/api/app/', {
//                 appName: appName
//             });

//             if (response.data) {
//                 toast.success('Application added successfully!');
//                 setAppName(''); // Clear the input field
//                 setIsAppModalOpen(false); // Close the modal
//                 fetchApps(); // Refresh the applications list
//             }
//         } catch (error) {
//             console.error('Error adding application:', error);
//             toast.error(error.response?.data?.message || 'Failed to add application');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleClose = ()=> {
//         setIsAppModalOpen(false)
//     }

//     return (
//          <div className='fixed inset-0 bg-opacity-50 flex items-center justify-center z-50'
//              style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
//              <motion.div
//                  initial={{ opacity: 0, scale: 0.9 }}
//                  animate={{ opacity: 1, scale: 1 }}
//                  exit={{ opacity: 0, scale: 0.9 }}
//                  transition={{ duration: 0.3, ease: 'easeInOut' }}
//                  className='bg-white p-2 rounded-xs shadow-xl w-120 md:mt-0 mt-0'
//              >

//                  {/*Modal Header */}
//                  <div className="flex justify-between items-center mb-2 shadow-xl p-2">
//                      <h2 className='text-[#1a1a1a] text-md font-medium'>Add Application</h2>
//                      <button onClick={handleClose}
//                          className='rounded-xs text-gray-500 cursor-pointer
//                         border-b border-gray-500'>
//                          <IoCloseCircle size={22} />
//                      </button>
//                  </div>

//                  {/*Modal Body*/}
//                  <form className='mt-5 space-y-6' onSubmit={onSubmitHandler}>

//                      <div className='flex items-center justify-between'>
//                         <label className='w-[30%] text-[#1a1a1a] block mb-2 mt-3 px-4 text-sm font-normal max-md:hidden'>Application Name</label>
//                         <div className='flex w-[70%] max-md:w-[100%] items-center justify-between shadow-xl p-3 text-sm rounded-xs'>
//                              <input
//                                 ref={inputRef} // Add the ref here
//                                 type='text'
//                                 name='categoryName'
//                                 onChange={(e)=> setAppName(e.target.value)}
//                                 value={appName}
//                                 placeholder='Enter application name' // Changed from 'category name'
//                                 className='bg-transparent w-full text-[#1a1a1a] focus:outline-none border-b border-gray-500'
//                                 required
//                                 autoComplete='off'
//                              />
//                          </div>
//                      </div>

//                      <button
//                         type='submit'
//                         className='p-1 text-xs bg-gray-500 text-white font-semibold 
//                             cursor-pointer w-full mt-5 h-10 rounded-sm'
//                      >
//                          <LuSquareCheckBig className='w-4 h-4 inline mr-1' />
//                          {isLoading ? 'Adding...' : 'Add New Application'}
//                      </button>

//                  </form>
//              </motion.div>
//          </div> 
//     );
// }

// export default ApplicationAdd ;