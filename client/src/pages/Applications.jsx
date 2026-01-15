import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FiEdit3, FiX } from "react-icons/fi";
import ApplicationAdd from '../components/applications/ApplicationAdd';
import ApplicationUpdate from '../components/applications/ApplicationUpdate';

const Applications = () => {
    const Button = [
        { label: 'New Application', icon: <FaPlus className="text-white" size={18} />, action: 'application' }
    ];

    const [isAppModalOpen, setIsAppModalOpen] = useState(false);
    const handleOpenModal = (action) => {
        if (action === 'application') setIsAppModalOpen(true)
    };

    const { axios } = useContext(AuthContext);
    
    const [apps, setApps] = useState([]);
    const [isUpdateApplication, setIsUpdateApplication] = useState(false);
    const [currentApplication, setCurrentApplication] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [loading, setLoading] = useState(true);

    // fetch applications
    const fetchApps = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/v1/api/app')
            if (data.success) {
                setApps(data.applications);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    const handleEdit = (app) => {
        setCurrentApplication(app);
        setIsUpdateApplication(true);
    };

    // Delete application
    const removeApplication = async (applicationId) => {
        try {
            const { data } = await axios.delete(`/v1/api/app/${applicationId}`);
            if (data.success) {
                toast.success(data.message);
                fetchApps();
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen bg-black p-4 md:p-6 w-full border-l ">
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Applications Management</h1>
                        <p className="text-gray-400 mt-2">Create and manage your applications</p>
                    </div>

                    <div className="flex gap-3">
                        {Button.map(({ label, icon, action }) => (
                            <button
                                key={label}
                                onClick={() => handleOpenModal(action)}
                                className="flex items-center gap-2 bg-taupe hover:bg-taupe/90 text-white px-4 md:px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                {label}
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
                        <p className="text-gray-400 text-sm">Total Applications</p>
                        <p className="text-2xl font-bold text-white mt-1">{apps.length}</p>
                    </div>
                    <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
                        <p className="text-gray-400 text-sm">Active Systems</p>
                        <p className="text-2xl font-bold text-white mt-1">{apps.length}</p>
                    </div>
                    <div className="bg-white/5 border border-gray-800 rounded-xl p-4">
                        <p className="text-gray-400 text-sm">Last Updated</p>
                        <p className="text-2xl font-bold text-white mt-1">Now</p>
                    </div>
                </div>
            </div>

            {/* Applications Grid */}
            <div className="bg-white/5 border border-gray-800 rounded-xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-white">Your Applications</h2>
                    <p className="text-gray-400 text-sm">
                        {apps.length} application{apps.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-taupe border-t-transparent"></div>
                    </div>
                ) : apps.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-taupe/20 flex items-center justify-center">
                            <FaPlus className="w-8 h-8 text-taupe" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No Applications Yet</h3>
                        <p className="text-gray-400 mb-4">Start by creating your first application</p>
                        <button
                            onClick={() => handleOpenModal('application')}
                            className="inline-flex items-center gap-2 bg-taupe hover:bg-taupe/90 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            <FaPlus size={18} />
                            Create First Application
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                        {apps.map((app) => (
                            <div
                                key={app._id}
                                className="bg-black border border-gray-700 rounded-xl p-4 hover:border-taupe/50 transition-colors group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-white text-lg truncate mb-1">
                                            {app.appName || app.name || 'Unnamed Application'}
                                        </h3>
                                        <p className="text-gray-400 text-sm truncate">
                                            {app.description || 'No description'}
                                        </p>
                                    </div>
                                    
                                    <div className="flex gap-2 ml-2">
                                        <button
                                            onClick={() => handleEdit(app)}
                                            className="p-2 cursor-pointer bg-taupe/20 hover:bg-taupe/30 text-taupe rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                            title="Edit Application"
                                        >
                                            <FiEdit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => {setSelectedApplication(app); setDeleteModalOpen(true)}}
                                            className="p-2 cursor-pointer bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                            title="Delete Application"
                                        >
                                            <MdDelete className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-gray-800">
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs text-gray-400">
                                            Created: {new Date(app.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="px-2 py-1 bg-taupe/20 text-taupe text-xs rounded">
                                            Active
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Application Modal */}
            {isAppModalOpen && 
                <ApplicationAdd 
                    setIsAppModalOpen={setIsAppModalOpen} 
                    fetchApps={fetchApps}
                />
            }

            {/* Update Application Modal */}
            {isUpdateApplication && currentApplication && (
                <ApplicationUpdate
                    app={currentApplication}
                    setIsUpdateApplication={setIsUpdateApplication}
                    fetchApps={fetchApps}
                />
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                open={deleteModalOpen}
                appName={selectedApplication?.appName}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    removeApplication(selectedApplication._id);
                    setDeleteModalOpen(false);
                }}
            />
        </div>
    );
};

const ConfirmModal = ({ open, onClose, onConfirm, appName }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-black border border-gray-800 rounded-xl p-6 w-full max-w-md">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                        <MdDelete className="w-8 h-8 text-red-400" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">Delete Application</h3>
                    <p className="text-gray-300 mb-6">
                        Are you sure you want to delete <span className="font-semibold text-white">{appName}</span>? 
                        This will also remove all associated phases. This action cannot be undone.
                    </p>
                    
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
                        >
                            Delete Application
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Applications;

// import {useState, useEffect, useContext} from 'react' ;
// import { AuthContext } from '../../context/AuthContext';
// import {toast} from 'react-hot-toast' ;
// import { MdDelete } from "react-icons/md";
// import { FaPlus } from "react-icons/fa6";
// import { FiEdit3 } from "react-icons/fi";
// import BackButton from '../components/shared/BackButton';
// import ApplicationAdd from '../components/applications/ApplicationAdd' ;
// import ApplicationUpdate from '../components/applications/ApplicationUpdate';
// import BottomNav from '../components/shared/BottomNav';

// const Applications = () => {
    
//     const Button = [
//         { label: 'New Application', icon: <FaPlus className='text-black' size={18} />, action: 'application' }
//     ];

//     const [isAppModalOpen, setIsAppModalOpen] = useState(false);
//     const handleOpenModal = (action) => {
//         if (action === 'application') setIsAppModalOpen(true)
//     };

//     const {axios} = useContext(AuthContext);
    
//     const [apps, setApps] = useState([]);
//     // fetch applications
//     const fetchApps = async () => {
//         try {
//             const {data} = await axios.get('/v1/api/app')
//             data.success ? setApps(data.applications) : toast.error(data.message)

//         } catch (error) {
//             toast.error(error.message)
//         }
//     };

//     useEffect(()=>{
//         fetchApps();
//     }, [])

//     const [isUpdateApplication, setIsUpdateApplication] = useState(false);
//     const [currentApplication, setCurrentApplication] = useState(null);

//     const handleEdit = (app) => {
//         setCurrentApplication(app);
//         setIsUpdateApplication(true);
//     };


//     // remove 
//     const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//     const [selectedApplication, setSelectedApplication] = useState(null);

//     // With request body (original approach):
//     // const removeApplication = async(applicationId) => {
//     //     try {
//     //         const {data} = await axios.delete('/v1/api/app', {
//     //             data: {id: applicationId}
//     //         });
//     //         if (data.success) {
//     //             toast.success(data.message);
//     //         }

//     //     } catch (error) {
//     //         toast.error(error.response?.data?.message)
//     //     }
//     // };

//     // With URL params (recommended):
//     const removeApplication = async(applicationId) => {
//         try {
            
//             const {data} = await axios.delete(`/v1/api/app/${applicationId}`);
//             if (data.success) {
//                 toast.success(data.message);
//                 fetchApps()
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.messsage);
//         }
//     };



//     return(
//         <section className='overflow-y-scroll scrollbar-hidden w-full'>
           
//             <div className='flex flex-col gap-5 md:flex-row md:items-center md:justify-between px-2 py-2 md:px-8 md:py-2 shadow-lg mb-2'>
//                 <div className='flex items-center gap-2'>
//                     {/* <BackButton /> */}
//                     <h1 className='text-2xl max-md:text-xl font-bold text-[#1a1a1a]'>Applications Management</h1>
//                 </div>

//                 <div className='flex gap-2 items-center justify-around gap-3 rounded-lg shadow-lg/30 bg-taupe max-md:pb-2'>
               
                    
//                     {Button.map(({ label, icon, action }) => {
//                         return (
//                             <button
//                                 onClick={() => handleOpenModal(action)}
//                                 className='bg-taupe max-md:bg-gray-100 px-2 py-2 md:px-4 md:py-2 text-[#1a1a1a] cursor-pointer
//                                     font-semibold text-xs flex items-center gap-2 rounded-full'>
//                                 {label} {icon}
//                             </button>
//                         )
//                     })}
//                 </div>

//                 {isAppModalOpen && 
//                     <ApplicationAdd 
//                     setIsAppModalOpen ={setIsAppModalOpen} 
//                     fetchApps= {fetchApps}
//                     />
//                 }

//             </div>

//             <div className='grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 px-2 py-2 md:px-10 md:py-4 mt-0 w-[100%] bg-white'>

//                 {apps.length === 0
//                     ? (<p className='w-full text-sm text-black flex justify-center'>Your applications menu is empty . Start adding new one !</p>)

//                     : apps.map(app => (

//                         <div key={app.appName}
//                             className='flex items-center justify-between bg-taupe text-black rounded-lg px-1 md:px-3  h-[70px] cursor-pointer
//                             shadow-lg/10 '
//                         // style = {{backgroundColor : getBgColor()}}
//                         >

//                             {/* <div className='flex justify-between w-full shadow-lg/30'> */}
//                                 {/* <div className='items-start px-1 md:px-3'> */}
//                                     {/* <h1 className='text-xs font-medium md:text-sm md:font-semibold text-[#1a1a1a]'>{app.appName}</h1> */}
//                                     <h1 className ='font-semibold text-black text-sm max-md:text-xs'>{app.appName}</h1>
//                                 {/* </div> */}
//                                 <div className='items-end flex gap-1 px-3'>
//                                     <FiEdit3
//                                         onClick={() => handleEdit(app)}
//                                         className='w-5 h-5 text-black rounded-full' />

//                                     <MdDelete
//                                         onClick ={()=> {setSelectedApplication(app); setDeleteModalOpen(true)}}
//                                         className='w-5 h-5 text-red-700 rounded-full ' />
//                                 </div>

//                             {/* </div> */}
//                         </div>

//                     ))}
//             </div>

//             {isUpdateApplication && currentApplication && (
//                 <ApplicationUpdate
//                     app = {currentApplication}
//                     setIsUpdateApplication = {setIsUpdateApplication}
//                     fetchApps = {fetchApps}
//                 />
//             )}

//             <ConfirmModal
//                 open= {deleteModalOpen}
//                 appName= {selectedApplication?.appName}
//                 onClose={() => setDeleteModalOpen(false)}
//                 onConfirm={() => {
//                     removeApplication(selectedApplication._id);
//                     setDeleteModalOpen(false);
//                 }}
//             />

//               {/* <BottomNav /> */}

//         </section>
        
    
//     )
// };


// const ConfirmModal = ({ open, onClose, onConfirm, appName }) => {
//     if (!open) return null;

//     return (
//         <div
//             className="fixed inset-0 flex items-center justify-center z-50"
//             style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
//         >

//             <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
//                 {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
//                 <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-red-600">{appName}</span>?</p>
//                 <div className="flex justify-end gap-3">
//                     <button
//                         className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
//                         onClick={onClose}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
//                         onClick={onConfirm}
//                     >
//                         Delete
//                     </button>
//                 </div>
//             </div>


//         </div>
//     );
// };


// export default Applications ;