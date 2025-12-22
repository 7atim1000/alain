import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineLogout, AiOutlineAppstore, AiOutlineCloudServer } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { FiLink, FiDatabase, FiBarChart, FiActivity, FiX, FiCloud, FiServer, FiBox } from "react-icons/fi";
import BottomNav from "../components/shared/BottomNav";

const Home = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [selectedAppPhases, setSelectedAppPhases] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [phasesLoading, setPhasesLoading] = useState(false);

    // Fixed Integration Services
    const integrationServices = [
        {
            id: 1,
            name: "Microsoft Logic Apps",
            icon: FiCloud,
            description: "Workflow automation and integration",
            color: "from-blue-500 to-blue-700"
        }
    ];

    // Fixed ADF Services
    const adfServices = [
        {
            id: 1,
            name: "Microsoft Fabric DW",
            icon: FiDatabase,
            description: "Data warehouse and analytics",
            color: "from-purple-500 to-purple-700"
        },
        {
            id: 2,
            name: "Microsoft BI",
            icon: FiBarChart,
            description: "Business intelligence and reporting",
            color: "from-green-500 to-green-700"
        },
        {
            id: 3,
            name: "Reporting",
            icon: FiActivity,
            description: "Advanced reporting services",
            color: "from-orange-500 to-orange-700"
        }
    ];

    // Fetch applications
    const fetchApps = async () => {
        try {
            const { data } = await axios.get('/v1/api/app');
            if (data.success) {
                setApplications(data.applications);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch phases for a specific application
    const fetchPhases = async (applicationId) => {
        if (!applicationId) return;

        setPhasesLoading(true);
        try {
            const { data } = await axios.get(`/v1/api/app/${applicationId}/phases`);
            if (data.success) {
                setSelectedAppPhases(data.phases);
            } else {
                toast.error(data.message);
                setSelectedAppPhases([]);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            setSelectedAppPhases([]);
        } finally {
            setPhasesLoading(false);
        }
    };

    // Handle application click
    const handleAppClick = async (app) => {
        setSelectedApp(app);
        setIsModalOpen(true);
        await fetchPhases(app._id);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedApp(null);
        setSelectedAppPhases([]);
        setPhasesLoading(false);
    };

    useEffect(() => {
        fetchApps();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className='py-2 px-4 flex justify-between bg-linear-65 from-gray-200 to-gray-600 '>
                <img
                    src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
                    alt="Logo"
                    className='w-[100px] max-sm:w-[100px] cursor-pointer'
                />

                <div className='flex items-center gap-1'>
                    <button 
                        onClick={() => navigate('/admin-login')}
                        className='cursor-pointer px-2 py-2 transition-all rounded-lg text-gray-200'
                    >
                        Admin
                    </button>
                    <IoMdLogIn 
                        className='inline ml-1 w-6 h-6 text-white' 
                        onClick={() => navigate('/admin-login')}
                    />
                </div>
            </div>

            <div className="min-h-screen bg-gray-50 p-4">
                {/* System Architecture Diagram */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                        IT SYSTEM ARCHITECTURE DIAGRAM
                    </h2>
                    
                    {/* Three Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[500px]">
                        
                        {/* Left Column - Integration */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
                            <div className="text-center mb-6">
                                <FiCloud className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                                <h3 className="text-xl font-semibold text-blue-800">Integration</h3>
                                <p className="text-sm text-blue-600 mt-2">Workflow & Automation</p>
                            </div>
                            
                            <div className="space-y-4">
                                {integrationServices.map((service) => {
                                    const IconComponent = service.icon;
                                    return (
                                        <div
                                            key={service.id}
                                            className={`bg-gradient-to-r ${service.color} text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-white`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <IconComponent className="w-8 h-8" />
                                                <div className="text-left">
                                                    <h4 className="font-bold text-lg">{service.name}</h4>
                                                    <p className="text-sm opacity-90">{service.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Middle Column - Applications */}
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-300">
                            <div className="text-center mb-6">
                                <FiServer className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                                <h3 className="text-xl font-semibold text-gray-800">Applications</h3>
                                <p className="text-sm text-gray-600 mt-2">Click to view phases</p>
                            </div>
                            
                            <div className="space-y-4 max-h-[400px] overflow-y-auto">
                                {applications.map((app, index) => (
                                    <div
                                        key={app._id}
                                        onClick={() => handleAppClick(app)}
                                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-gray-200 hover:border-purple-400"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {index + 1}
                                                </div>
                                                <div className="text-left">
                                                    <h4 className="font-semibold text-gray-900">
                                                        {app.appName || app.name || app.applicationName}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Click to view details
                                                    </p>
                                                </div>
                                            </div>
                                            <FiBox className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Microsoft ADF */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
                            <div className="text-center mb-6">
                                <FiDatabase className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                                <h3 className="text-xl font-semibold text-purple-800">Microsoft ADF</h3>
                                <p className="text-sm text-purple-600 mt-2">Azure Data Factory & Analytics</p>
                            </div>
                            
                            <div className="space-y-4">
                                {adfServices.map((service) => {
                                    const IconComponent = service.icon;
                                    return (
                                        <div
                                            key={service.id}
                                            className={`bg-gradient-to-r ${service.color} text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-white`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <IconComponent className="w-8 h-8" />
                                                <div className="text-left">
                                                    <h4 className="font-bold text-lg">{service.name}</h4>
                                                    <p className="text-sm opacity-90">{service.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Connection Lines Visualization */}
                    <div className="mt-8 relative hidden lg:block">
                        <div className="flex justify-between items-center px-12">
                            <div className="text-center">
                                <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2"></div>
                                <div className="h-1 bg-blue-300 w-32"></div>
                            </div>
                            <div className="text-center">
                                <div className="w-4 h-4 bg-gray-500 rounded-full mx-auto mb-2"></div>
                                <div className="h-1 bg-gray-300 w-32"></div>
                            </div>
                            <div className="text-center">
                                <div className="w-4 h-4 bg-purple-500 rounded-full mx-auto mb-2"></div>
                                <div className="h-1 bg-purple-300 w-32"></div>
                            </div>
                        </div>
                        <div className="text-center text-xs text-gray-500 mt-2">
                            Connected System Architecture
                        </div>
                    </div>
                </div>

                {/* Phase Details Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-6 border-b border-gray-200">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {selectedApp?.appName || selectedApp?.name || selectedApp?.applicationName}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Phase Details
                                    </p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <FiX className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                {phasesLoading ? (
                                    <div className="flex justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                                    </div>
                                ) : selectedAppPhases.length > 0 ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium text-gray-900">
                                                Phases ({selectedAppPhases.length})
                                            </h4>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {selectedAppPhases.map((phase, index) => (
                                                <div 
                                                    key={phase._id || index} 
                                                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex items-start justify-between mb-2">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {phase.phaseName || phase.name}
                                                        </p>
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Phase {index + 1}
                                                        </span>
                                                    </div>
                                                    {phase.completionDate && (
                                                        <p className="text-xs text-gray-600 mt-2">
                                                            <span className="font-medium">Completion Date: </span>
                                                            {new Date(phase.completionDate).toLocaleDateString('en-GB', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: 'numeric'
                                                            })}
                                                        </p>
                                                    )}
                                                    {phase.description && (
                                                        <p className="text-xs text-gray-500 mt-2">
                                                            {phase.description}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-gray-400 text-6xl mb-4">📋</div>
                                        <p className="text-gray-500 text-lg">No phases found</p>
                                        <p className="text-gray-400 text-sm mt-2">
                                            There are no phases configured for this application.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;

// //displaying phases when an application is clicked, instead of the toggle button. Here's the updated code:
// import { useContext, useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from "../../context/AuthContext";
// import { AiOutlineLogout, AiOutlineAppstore, AiOutlineCloudServer } from "react-icons/ai";
// import { IoMdLogIn } from "react-icons/io";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FiLink, FiDatabase, FiBarChart, FiActivity, FiX } from "react-icons/fi";
// import BottomNav from "../components/shared/BottomNav";

// const Home = () => {
//     const navigate = useNavigate();
//     const [applications, setApplications] = useState([]);
//     const [selectedApp, setSelectedApp] = useState(null);
//     const [selectedAppPhases, setSelectedAppPhases] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [phasesLoading, setPhasesLoading] = useState(false);

//     // Fetch applications
//     const fetchApps = async () => {
//         try {
//             const { data } = await axios.get('/v1/api/app');
//             if (data.success) {
//                 setApplications(data.applications);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch phases for a specific application
//     const fetchPhases = async (applicationId) => {
//         if (!applicationId) return;

//         setPhasesLoading(true);
//         try {
//             const { data } = await axios.get(`/v1/api/app/${applicationId}/phases`);
//             if (data.success) {
//                 setSelectedAppPhases(data.phases);
//             } else {
//                 toast.error(data.message);
//                 setSelectedAppPhases([]);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//             setSelectedAppPhases([]);
//         } finally {
//             setPhasesLoading(false);
//         }
//     };

//     // Handle application click
//     const handleAppClick = async (app) => {
//         setSelectedApp(app);
//         setIsModalOpen(true);
//         await fetchPhases(app._id);
//     };

//     // Close modal
//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedApp(null);
//         setSelectedAppPhases([]);
//         setPhasesLoading(false);
//     };

//     useEffect(() => {
//         fetchApps();
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             {/* Header */}
//             <div className='py-2 px-4 flex justify-between bg-linear-65 from-gray-200 to-gray-600 '>
//                 <img
//                     src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
//                     alt="Logo"
//                     className='w-[100px] max-sm:w-[100px] cursor-pointer'
//                 />

//                 <div className='flex items-center gap-1'>
//                     <button 
//                         onClick={() => navigate('/admin-login')}
//                         className='cursor-pointer px-2 py-2 transition-all rounded-lg text-gray-200'
//                     >
//                         Admin
//                     </button>
//                     <IoMdLogIn 
//                         className='inline ml-1 w-6 h-6 text-white' 
//                         onClick={() => navigate('/admin-login')}
//                     />
//                 </div>
//             </div>

//             <div className="min-h-screen bg-gray-50 p-2">
                
//                 {/* Applications List */}
//                 <div className="bg-white rounded-lg shadow-sm">
//                     <div className="p-3 shadow-lg">
//                         <h2 className="text-xl flex justify-center font-semibold text-gray-700">IT SYSTEM LANDSCAPE</h2>
//                     </div>

//                     <div className="divide-y divide-gray-200">
//                         {applications.map((app) => (
//                             <div 
//                                 key={app._id} 
//                                 className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
//                                 onClick={() => handleAppClick(app)}
//                             >
//                                 {/* Application Header */}
//                                 <div className="flex justify-between items-center">
//                                     <div>
//                                         <h3 className="text-lg font-medium text-gray-900">
//                                             {app.appName || app.name || app.applicationName}
//                                         </h3>
//                                         <p className="text-sm text-gray-500 mt-1">
//                                             Click to view phases
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Phase Details Modal */}
//                 {isModalOpen && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                         <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
//                             {/* Modal Header */}
//                             <div className="flex justify-between items-center p-6 border-b border-gray-200">
//                                 <div>
//                                     <h3 className="text-xl font-semibold text-gray-900">
//                                         {selectedApp?.appName || selectedApp?.name || selectedApp?.applicationName}
//                                     </h3>
//                                     <p className="text-sm text-gray-500 mt-1">
//                                         Phase Details
//                                     </p>
//                                 </div>
//                                 <button
//                                     onClick={closeModal}
//                                     className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                                 >
//                                     <FiX className="w-6 h-6 text-gray-500" />
//                                 </button>
//                             </div>

//                             {/* Modal Content */}
//                             <div className="p-6 overflow-y-auto max-h-[60vh]">
//                                 {phasesLoading ? (
//                                     <div className="flex justify-center py-8">
//                                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
//                                     </div>
//                                 ) : selectedAppPhases.length > 0 ? (
//                                     <div className="space-y-4">
//                                         <div className="flex justify-between items-center mb-4">
//                                             <h4 className="font-medium text-gray-900">
//                                                 Phases ({selectedAppPhases.length})
//                                             </h4>
//                                         </div>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                                             {selectedAppPhases.map((phase, index) => (
//                                                 <div 
//                                                     key={phase._id || index} 
//                                                     className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
//                                                 >
//                                                     <div className="flex items-start justify-between mb-2">
//                                                         <p className="text-sm font-medium text-gray-900">
//                                                             {phase.phaseName || phase.name}
//                                                         </p>
//                                                         <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                                                             Phase {index + 1}
//                                                         </span>
//                                                     </div>
//                                                     {phase.completionDate && (
//                                                         <p className="text-xs text-gray-600 mt-2">
//                                                             <span className="font-medium">Completion Date: </span>
//                                                             {new Date(phase.completionDate).toLocaleDateString('en-GB', {
//                                                                 day: '2-digit',
//                                                                 month: '2-digit',
//                                                                 year: 'numeric'
//                                                             })}
//                                                         </p>
//                                                     )}
//                                                     {phase.description && (
//                                                         <p className="text-xs text-gray-500 mt-2">
//                                                             {phase.description}
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div className="text-center py-8">
//                                         <div className="text-gray-400 text-6xl mb-4">📋</div>
//                                         <p className="text-gray-500 text-lg">No phases found</p>
//                                         <p className="text-gray-400 text-sm mt-2">
//                                             There are no phases configured for this application.
//                                         </p>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Modal Footer */}
//                             <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
//                                 <button
//                                     onClick={closeModal}
//                                     className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Home;



// import { useContext, useState, useEffect } from "react";
// import { useNavigate } from  'react-router-dom';
// import { AuthContext } from "../../context/AuthContext";
// import { AiOutlineLogout, AiOutlineAppstore, AiOutlineCloudServer } from "react-icons/ai";
// import { IoMdLogIn } from "react-icons/io";
// import axios from "axios";
// import { toast } from "react-toastify";
// import {  FiLink, FiDatabase, FiBarChart, FiActivity } from "react-icons/fi";
// import BottomNav from "../components/shared/BottomNav";


// const Home = () => {

//     const navigate = useNavigate();
//     const [applications, setApplications] = useState([]);
//     const [phases, setPhases] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [phasesLoading, setPhasesLoading] = useState({});

//     // Fetch applications
//     const fetchApps = async () => {
//         try {
//             const { data } = await axios.get('/v1/api/app');
//             if (data.success) {
//                 setApplications(data.applications);
//                 // Automatically load services for all applications
//                 data.applications.forEach(app => {
//                     fetchConnectedServices(app._id);
//                 });
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch phases for a specific application
//     const fetchPhases = async (applicationId) => {
//         if (!applicationId) return;

//         setPhasesLoading(prev => ({ ...prev, [applicationId]: true }));
//         try {
//             const { data } = await axios.get(`/v1/api/app/${applicationId}/phases`);
//             if (data.success) {
//                 setPhases(prev => ({
//                     ...prev,
//                     [applicationId]: data.phases
//                 }));
//             } else {
//                 toast.error(data.message);
//                 setPhases(prev => ({
//                     ...prev,
//                     [applicationId]: []
//                 }));
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//             setPhases(prev => ({
//                 ...prev,
//                 [applicationId]: []
//             }));
//         } finally {
//             setPhasesLoading(prev => ({ ...prev, [applicationId]: false }));
//         }
//     };

//     // Toggle phases visibility
//     const togglePhases = (appId) => {
//         if (!phases[appId] && !phasesLoading[appId]) {
//             fetchPhases(appId);
//         } else {
//             // If phases already loaded, just toggle visibility by setting to empty array
//             setPhases(prev => ({
//                 ...prev,
//                 [appId]: phases[appId] ? null : prev[appId]
//             }));
//         }
//     };

//     useEffect(() => {
//         fetchApps();
//     }, []);

//     const getPhaseCount = (appId) => {
//         return phases[appId] ? phases[appId].length : 0;
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
//             </div>
//         );
//     };

    
    
    
//     return (
//         <div>
//             {/* Keep the original header */}
//             <div className='py-2 px-4 flex justify-between bg-linear-65 from-gray-200 to-gray-600 '>
//                 <img
//                     src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
//                     alt="Logo"
//                     className='w-[100px] max-sm:w-[100px] cursor-pointer'
//                 />

//                 <div className='flex items-center gap-1'>
//                     <button 
//                         onClick ={()=> navigate('/admin-login')}
//                         className ='cursor-pointer px-2 py-2 transition-all rounded-lg text-gray-200'
//                     >
//                         Admin
//                     </button>
//                      <IoMdLogIn 
//                         className='inline ml-1 w-6 h-6 text-white' 
//                         onClick ={()=> navigate('/admin-login')}
//                         />
//                 </div>
//             </div>

//             <div className="min-h-screen bg-gray-50 p-2">
                
//                 {/* Applications List */}
//                 <div className="bg-white rounded-lg shadow-sm">
//                     <div className="p-3 shadow-lg">
//                         <h2 className="text-xl flex justify-center  font-semibold text-gray-700">IT SYSTEM LANDSCAPE</h2>
//                     </div>

//                     <div className="divide-y-red-500">
//                         {applications.map((app) => (
//                             <div key={app._id} className="p-3">
//                                 {/* Application Header */}
//                                 <div className="flex justify-between items-center mb-2">
//                                     <div>
//                                         <h3 className="text-lg font-medium text-gray-900">
//                                             {app.appName || app.name || app.applicationName}
//                                         </h3>
                                       
//                                     </div>

                                    

//                                     <button
//                                         onClick={() => togglePhases(app._id)}
//                                         className={`px-4 py-2 rounded-lg  cursor-pointer transition-colors max-md:text-sm ${phases[app._id]
//                                             ? 'bg-red-100 text-[#be3e3f] hover:bg-gray-400 hover:text-white'  // Hide Phases style
//                                             : 'bg-gray-500 text-white hover:bg-gray-600'  // View Phases style
//                                             }`}
//                                     >
//                                         {phases[app._id] ? 'Hide Phases' : 'View Phases'}
//                                     </button>
//                                 </div>

                               
//                                 <hr className='text-gray-200' />

//                                 {/* Phases Section - Visible when toggled */}
//                                 {phasesLoading[app._id] ? (
//                                     <div className="flex justify-center py-4">
//                                         <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
//                                     </div>
//                                 ) : phases[app._id] && phases[app._id].length > 0 ? (
//                                     <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                                         <h4 className="font-medium text-gray-900 mb-3">
//                                             Phases ({phases[app._id].length})
//                                         </h4>
//                                         <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
//                                             {phases[app._id].map((phase, index) => (
//                                                 <div key={phase._id || index} className="bg-white p-3 rounded-lg border">
//                                                     <p className="text-sm font-medium text-gray-900">
//                                                         {phase.phaseName || phase.name}
//                                                     </p>
//                                                     {phase.completionDate && (

//                                                         <p className="text-xs text-gray-500 mt-1">
//                                                             <span>Completion Date : {new Date(phase.completionDate).toLocaleDateString('en-GB')}</span>
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ) : phases[app._id] ? (
//                                     <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                                         <p className="text-sm text-gray-500 italic">No phases found</p>
//                                     </div>
//                                 ) : null}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//             </div>

//         </div>
//     );
// }


// export default Home ;