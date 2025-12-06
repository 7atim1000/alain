import { AuthContext } from '../../../context/AuthContext';
import { useContext, useState, useRef, useEffect } from 'react'; // Added useRef and useEffect
import { toast } from 'react-hot-toast' ;
import { motion } from 'framer-motion'
import { IoCloseCircle } from 'react-icons/io5';
import { LuSquareCheckBig } from "react-icons/lu";

const ApplicationAdd = ({setIsAppModalOpen, fetchApps}) => {

    const {axios} = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [appName, setAppName] = useState();
    
    // Create a ref for the input element
    const inputRef = useRef(null);

    // Focus on input when modal opens
    useEffect(() => {
        // Small timeout to ensure the modal is fully rendered
        const timer = setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 100);

        // Cleanup the timer
        return () => clearTimeout(timer);
    }, []); // Empty dependency array means this runs once when component mounts

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (isLoading) return null;
        setIsLoading(true);

        try {
            const response = await axios.post('/v1/api/app/', {
                appName: appName
            });

            if (response.data) {
                toast.success('Application added successfully!');
                setAppName(''); // Clear the input field
                setIsAppModalOpen(false); // Close the modal
                fetchApps(); // Refresh the applications list
            }
        } catch (error) {
            console.error('Error adding application:', error);
            toast.error(error.response?.data?.message || 'Failed to add application');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = ()=> {
        setIsAppModalOpen(false)
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
                     <h2 className='text-[#1a1a1a] text-md font-medium'>Add Application</h2>
                     <button onClick={handleClose}
                         className='rounded-xs text-gray-500 cursor-pointer
                        border-b border-gray-500'>
                         <IoCloseCircle size={22} />
                     </button>
                 </div>

                 {/*Modal Body*/}
                 <form className='mt-5 space-y-6' onSubmit={onSubmitHandler}>

                     <div className='flex items-center justify-between'>
                        <label className='w-[30%] text-[#1a1a1a] block mb-2 mt-3 px-4 text-sm font-normal max-md:hidden'>Application Name</label>
                        <div className='flex w-[70%] max-md:w-[100%] items-center justify-between shadow-xl p-3 text-sm rounded-xs'>
                             <input
                                ref={inputRef} // Add the ref here
                                type='text'
                                name='categoryName'
                                onChange={(e)=> setAppName(e.target.value)}
                                value={appName}
                                placeholder='Enter application name' // Changed from 'category name'
                                className='bg-transparent w-full text-[#1a1a1a] focus:outline-none border-b border-gray-500'
                                required
                                autoComplete='off'
                             />
                         </div>
                     </div>

                     <button
                        type='submit'
                        className='p-1 text-xs bg-gray-500 text-white font-semibold 
                            cursor-pointer w-full mt-5 h-10 rounded-sm'
                     >
                         <LuSquareCheckBig className='w-4 h-4 inline mr-1' />
                         {isLoading ? 'Adding...' : 'Add New Application'}
                     </button>

                 </form>
             </motion.div>
         </div> 
    );
}

export default ApplicationAdd ;