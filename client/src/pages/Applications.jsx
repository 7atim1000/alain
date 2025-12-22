import {useState, useEffect, useContext} from 'react' ;
import { AuthContext } from '../../context/AuthContext';
import {toast} from 'react-hot-toast' ;
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import BackButton from '../components/shared/BackButton';
import ApplicationAdd from '../components/applications/ApplicationAdd' ;
import ApplicationUpdate from '../components/applications/ApplicationUpdate';
import BottomNav from '../components/shared/BottomNav';

const Applications = () => {
    
    const Button = [
        { label: 'New Application', icon: <FaPlus className='text-gray-600' size={18} />, action: 'application' }
    ];

    const [isAppModalOpen, setIsAppModalOpen] = useState(false);
    const handleOpenModal = (action) => {
        if (action === 'application') setIsAppModalOpen(true)
    };

    const {axios} = useContext(AuthContext);
    
    const [apps, setApps] = useState([]);
    // fetch applications
    const fetchApps = async () => {
        try {
            const {data} = await axios.get('/v1/api/app')
            data.success ? setApps(data.applications) : toast.error(data.message)

        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(()=>{
        fetchApps();
    }, [])

    const [isUpdateApplication, setIsUpdateApplication] = useState(false);
    const [currentApplication, setCurrentApplication] = useState(null);

    const handleEdit = (app) => {
        setCurrentApplication(app);
        setIsUpdateApplication(true);
    };


    // remove 
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);

    // With request body (original approach):
    // const removeApplication = async(applicationId) => {
    //     try {
    //         const {data} = await axios.delete('/v1/api/app', {
    //             data: {id: applicationId}
    //         });
    //         if (data.success) {
    //             toast.success(data.message);
    //         }

    //     } catch (error) {
    //         toast.error(error.response?.data?.message)
    //     }
    // };

    // With URL params (recommended):
    const removeApplication = async(applicationId) => {
        try {
            
            const {data} = await axios.delete(`/v1/api/app/${applicationId}`);
            if (data.success) {
                toast.success(data.message);
                fetchApps()
            }
        } catch (error) {
            toast.error(error.response?.data?.messsage);
        }
    };



    return(
        <section className='overflow-y-scroll scrollbar-hidden'>
           
            <div className='flex flex-col gap-5 md:flex-row md:items-center md:justify-between px-2 py-2 md:px-8 md:py-2 shadow-lg mb-2'>
                <div className='flex items-center gap-2'>
                    {/* <BackButton /> */}
                    <h1 className='text-2xl max-md:text-xl font-bold text-[#1a1a1a]'>Applications Management</h1>
                </div>

                <div className='flex gap-2 items-center justify-around gap-3 md:hover:bg-gray-400 shadow-lg/30 bg-white max-md:pb-2'>
               
                    
                    {Button.map(({ label, icon, action }) => {
                        return (
                            <button
                                onClick={() => handleOpenModal(action)}
                                className='bg-white max-md:bg-gray-100 px-2 py-2 md:px-4 md:py-2 text-[#1a1a1a] cursor-pointer
                                    font-semibold text-xs flex items-center gap-2 rounded-full'>
                                {label} {icon}
                            </button>
                        )
                    })}
                </div>

                {isAppModalOpen && 
                    <ApplicationAdd 
                    setIsAppModalOpen ={setIsAppModalOpen} 
                    fetchApps= {fetchApps}
                    />
                }

            </div>

            <div className='grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 px-2 py-2 md:px-10 md:py-4 mt-0 w-[100%] bg-white'>

                {apps.length === 0
                    ? (<p className='w-full text-sm text-[#be3e3f] flex justify-center'>Your applications menu is empty . Start adding new one !</p>)

                    : apps.map(app => (

                        <div key={app.appName}
                            className='flex items-center justify-between bg-gray-100 px-1 md:px-3 rounded-xs h-[70px] cursor-pointer
                            shadow-lg/10 hover:bg-gray-300'
                        // style = {{backgroundColor : getBgColor()}}
                        >

                            {/* <div className='flex justify-between w-full shadow-lg/30'> */}
                                {/* <div className='items-start px-1 md:px-3'> */}
                                    {/* <h1 className='text-xs font-medium md:text-sm md:font-semibold text-[#1a1a1a]'>{app.appName}</h1> */}
                                    <h1 className ='font-semibold text-gray-600 text-sm max-md:text-xs'>{app.appName}</h1>
                                {/* </div> */}
                                <div className='items-end flex gap-1 px-3'>
                                    <FiEdit3
                                        onClick={() => handleEdit(app)}
                                        className='w-5 h-5 text-gray-500 rounded-full hover:bg-gray-200' />

                                    <MdDelete
                                        onClick ={()=> {setSelectedApplication(app); setDeleteModalOpen(true)}}
                                        className='w-5 h-5 text-[#be3e3f] rounded-full hover:bg-[#be3e3f]/30' />
                                </div>

                            {/* </div> */}
                        </div>

                    ))}
            </div>

            {isUpdateApplication && currentApplication && (
                <ApplicationUpdate
                    app = {currentApplication}
                    setIsUpdateApplication = {setIsUpdateApplication}
                    fetchApps = {fetchApps}
                />
            )}

            <ConfirmModal
                open= {deleteModalOpen}
                appName= {selectedApplication?.appName}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeApplication(selectedApplication._id);
                    setDeleteModalOpen(false);
                }}
            />

              {/* <BottomNav /> */}

        </section>
        
    
        // <div className='ma-w-3xl w-full rounded-sm overflow-hidden mt-6 border border-borderColor'>
        //     <table className='w-full border-collapse text-left text-sm text-gray-600'>
        //         <thead className='text-gray-500'>
        //             <tr>
        //                 <td className='p-3 font-medium'>App name</td>
        //                 <td className='p-3 font-medium'></td>

        //             </tr>
        //         </thead>

        //         <tbody>
        //             {
        //                 apps.map((app, index) => (
        //                     <tr
        //                         key={index}
        //                         className="border-t border-borderColor hover:bg-gray-50 transition-colors duration-200"
        //                     >
        //                         <td className="p-3 max-md:hidden text-gray-700">
        //                             {app.appName}
        //                         </td>

        //                         <td className="p-3">
        //                             <div className="flex items-center gap-2">
        //                                 <button
        //                                     // onClick={() => deleteCar(car._id)}
        //                                     className="p-1.5 cursor-pointer rounded-md hover:bg-red-50 transition-colors">
        //                                     <MdDeleteForever className="text-[#be3e3f] w-4.5 h-4.5" />
                                        
        //                                 </button>
        //                             </div>
        //                         </td>
        //                     </tr>
        //                 ))
        //             }
        //         </tbody>

        //     </table>
        // </div>
    )
};


const ConfirmModal = ({ open, onClose, onConfirm, appName }) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
        >

            <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
                {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
                <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-red-600">{appName}</span>?</p>
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>


        </div>
    );
};


export default Applications ;