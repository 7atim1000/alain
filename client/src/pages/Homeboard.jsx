import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { 
    FiDatabase, 
    FiBarChart, 
    FiActivity, 
    FiX, 
    FiGitBranch,
    FiLayers,
    FiBox
} from "react-icons/fi";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { TfiAngleRight } from "react-icons/tfi";

const Homeboard = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    axios.defaults.baseURL = backendUrl;
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [selectedAppPhases, setSelectedAppPhases] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [phasesLoading, setPhasesLoading] = useState(false);

    // Integration Services
    const integrationServices = [
        {
            id: 1,
            name: "Microsoft Logic Apps",
            icon: MdOutlineIntegrationInstructions,
            description: "Workflow automation and Integration"
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
        console.log('✅ App clicked!', app.appName);
        console.log('App ID:', app._id);

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
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] w-full overflow-x-hidden">
            {/* Header */}
            <div className="mb-1 md:mb-2">
                <div className="w-full px-2">
                    <div className="flex flex-col items-center justify-center text-center py-1 md:py-2">
                        {/* Logo */}
                        <img
                            src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
                            alt="Logo"
                            className="h-12 md:h-15 w-auto invert mb-0.5 md:mb-1"
                        />
                        
                        {/* Main Title */}
                        <h1 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1">
                            IT SYSTEM LANDSCAPE
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-white text-xs">
                            System Architecture Diagram
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Architecture Layout */}
            <div className="w-full max-w-[95vw] mx-auto p-0 m-0 overflow-hidden">
                {/* Three Column Layout - Zero gap, touch edges */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 p-0 m-0   items-center justify-center w-full min-h-[60vh]">
                    
                    {/* INTEGRATION Column - Left Circle */}
                    <div className="flex flex-col items-center justify-center p-0 m-0 md:-ml-3.5 relative">
                        <div className="w-[32vw] h-[32vw] max-w-[380px] max-h-[380px] min-w-[280px] min-h-[280px] rounded-full flex flex-col items-center justify-center relative">
                            
                            {/* SVG Border */}
                            <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
                                <svg width="100%" height="100%" viewBox="0 0 580 580">
                                    <defs>
                                        <linearGradient id="smoothBorder-1" x1="100%" y1="100%" x2="30%" y2="0%">
                                            <stop offset="0%" stopColor="#9ca3af" stopOpacity="1" />
                                            <stop offset="70%" stopColor="#9ca3af" stopOpacity="1" />
                                            <stop offset="65%" stopColor="#9ca3af" stopOpacity="1" />
                                            <stop offset="77%" stopColor="#9ca3af" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <circle
                                        cx="290"
                                        cy="290"
                                        r="289"
                                        fill="none"
                                        stroke="url(#smoothBorder-1)"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeDasharray="5, 1"
                                    />
                                </svg>
                            </div>

                            {/* Content */}
                            <div className="text-center mb-2 md:mb-4 px-2">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">INTEGRATION</h3>
                                <div className="w-12 h-12 md:w-15 md:h-15 rounded-sm flex items-center justify-center mx-auto mb-2 md:mb-3 bg-[#1f1f1f]">
                                    <MdOutlineIntegrationInstructions className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
                                </div>
                                <p className="text-white text-xs md:text-sm">Microsoft Logic Apps</p>
                                <p className="text-white text-xs md:text-sm">Workflow & Automation Services</p>
                            </div>
                        </div>
                    </div>

                    {/* APPLICATIONS Column - Center Circle */}
                    <div className="flex flex-col items-center justify-center p-0 m-0 relative z-10 -mx-2 md:-mx-4 lg:-mx-8">
                        <div className="w-[42vw] h-[42vw] max-w-[600px] max-h-[600px] min-w-[350px] min-h-[350px] rounded-full flex flex-col items-center justify-center relative">
                            
                            {/* SVG Border */}
                            <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
                                <svg width="100%" height="100%" viewBox="0 0 580 580">
                                    <defs>
                                        <linearGradient id="smoothBorder" x1="100%" y1="90%" x2="0%" y2="0%">
                                            <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
                                            <stop offset="70%" stopColor="#9ca3af" stopOpacity="1" />
                                            <stop offset="75%" stopColor="#9ca3af" stopOpacity="1" />
                                            <stop offset="90%" stopColor="#9ca3af" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <circle
                                        cx="290"
                                        cy="290"
                                        r="289"
                                        fill="none"
                                        stroke="url(#smoothBorder)"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeDasharray="5, 1"
                                    />
                                </svg>
                            </div>
                            
                            {/* Column Header */}
                            <div className="text-center mb-4 md:mb-6 md:-mt-20 -mt-5 px-4">
                                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-1">APPLICATIONS</h3>
                                <p className="text-white text-sm md:text-base">Click to view implementation phases</p>
                            </div>
                            
                            {/* Applications Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-2 md:mt-5 gap-2 md:gap-3 w-full px-15 px-1 md:px-25 px-1">
                            {/* <div className="grid grid-cols-2 md:grid-cols-3 md:mt-5 gap-2 md:gap-3 w-full px-15 px-1 md:px-10 px-1"> */}
                                {applications.map((app) => (
                                    <div
                                        key={app._id}
                                        onClick={() => handleAppClick(app)}
                                        className="rounded-full p-2 md:p-3 text-center hover:text-white transition-all cursor-pointer group bg-gradient-to-r from-[#171717] to-black"
                                    >
                                        <div className='flex items-center justify-between cursor-pointer max-md:flex-row max-md:gap-5'>
                                            <h4 className="text-white text-sm md:text-base font-medium group-hover:text-white truncate
                                            max-md:text-xs 
                                            "
                                                onClick={() => handleAppClick(app)}
                                            >
                                                {app.appName || app.name || app.applicationName}
                                            </h4>
                                            <TfiAngleRight className='inline text-gray-200  md:ml-2 flex cursor-pointer w-3 h-3 w-4  h-4' />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ADF Column - Right Circle */}
                    <div className="flex flex-col items-center justify-center p-0 m-0 md:-mr-3.5 relative">
                        <div className="w-[32vw] h-[32vw] max-w-[380px] max-h-[380px] min-w-[280px] min-h-[280px] rounded-full flex items-center justify-center relative">
                            
                            {/* SVG Border */}
                            <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
                                <svg width="100%" height="100%" viewBox="0 0 580 580">
                                    <defs>
                                        <linearGradient id="smoothBorder-2" x1="100%" y1="100%" x2="30%" y2="0%">
                                            <stop offset="0%" stopColor="#9ca3af" stopOpacity="1" />
                                            <stop offset="70%" stopColor="#9ca3af" stopOpacity="1" />
                                            <stop offset="65%" stopColor="#9ca3af" stopOpacity="1" />
                                            <stop offset="77%" stopColor="#9ca3af" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <circle
                                        cx="290"
                                        cy="290"
                                        r="289"
                                        fill="none"
                                        stroke="url(#smoothBorder-2)"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeDasharray="5, 1"
                                    />
                                </svg>
                            </div>

                            {/* Inner Circle */}
                            <div className="w-[14vw] h-[14vw] max-w-[180px] max-h-[180px] min-w-[120px] min-h-[120px] rounded-full flex flex-col items-center justify-center bg-[#0a0a0a] z-10 absolute">
                                <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
                                    <svg width="100%" height="100%" viewBox="0 0 582 571">
                                        <defs>
                                            <linearGradient id="smoothBorder-3" x1="0%" y1="0%" x2="0%" y2="0%">
                                                <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
                                                <stop offset="100%" stopColor="#9ca3af" stopOpacity="1" />
                                            </linearGradient>
                                        </defs>
                                        <circle
                                            cx="290"
                                            cy="290"
                                            r="289"
                                            fill="none"
                                            stroke="url(#smoothBorder-3)"
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                            strokeDasharray="5, 1"
                                        />
                                    </svg>
                                </div>
                              
                                <h3 className="text-xs md:text-lg font-bold text-white text-center">MICROSOFT</h3>
                                <p className="text-xs md:text-md font-bold text-white text-center">ADF</p>
                                <p className="text-white text-xs md:text-sm mt-2 md:mt-5 text-center">Data Factory</p>
                                <p className="text-white text-xs md:text-sm text-center">& Analytics Platform</p>
                            </div>

                            {/* Three Sections in the Ring */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                
                                {/* Top Right Section */}
                                <div className="absolute top-0 right-0 w-1/2 h-1/2 flex items-end justify-start p-1 relative">
                                    <div className="absolute left-[35%] -top-[45%] w-px h-full bg-gray-100 -rotate-15"
                                        style={{
                                            mask: 'linear-gradient(to top, black 0%, transparent 100%)',
                                            padding: '1.1px',
                                        }}>
                                    </div>
                                    
                                    <div className="absolute bottom-[25%] left-[42%] w-full h-px bg-gray-100"
                                        style={{
                                            mask: 'linear-gradient(to right, black 10%, transparent 100%)',
                                            padding: '1.1px',
                                        }}>
                                    </div>
                                </div>

                                <div className="absolute max-md:bottom-[30%] bottom-[25%] -right-[5%] md:-right-[11%] w-1/2 h-1/2 flex items-start justify-start p-2 md:p-4"> 
                                    <div className="text-center rounded-lg p-2 md:p-3 transition-all cursor-pointer group ml-1 md:ml-2 -mt-8 md:-mt-10">
                                        <h4 className="text-white text-xs md:text-lg font-medium">Microsoft</h4>
                                        <h4 className="text-white text-xs md:text-md font-medium">Fabric DW</h4>
                                        <p className="text-white text-xs md:text-sm">Data warehouse</p>
                                        <p className="text-white text-xs md:text-sm">& analytics</p>
                                    </div>  
                                </div>

                                <div className="absolute top-[5%] left-0 w-full h-full pointer-events-none">
                                    <div className="absolute bottom-1/3 left-1/3 w-[45%] h-px transform -rotate-45 -translate-x-2/4 translate-y-1/2"
                                        style={{
                                            background: 'linear-gradient(to right, rgba(156, 163, 175, 1) 5%, rgba(156, 163, 175, 0) 55%)',
                                            padding: '.9px',
                                        }}>
                                    </div>
                                </div>

                                {/* Bottom Right Section */}
                                <div className="absolute -bottom-[1%] md:-bottom-[15%] right-[20%] md:right-[18%] w-1/2 h-1/2 flex items-start justify-start p-1">
                                    <div className="text-center rounded-lg  transition-all cursor-pointer group ml-[55%] md:ml-[23%] mt-[35%] md:mt-[17%]">
                                        <h4 className="max-md:hidden text-white text-xs md:text-lg font-medium ">Reporting</h4>
                                        <h4 className="md:hidden text-white text-xs md:text-md font-medium ">Reporting & Services</h4>
                                       
                                        <p className="max-md:hidden text-white text-xs md:text-md">Services</p>
                                        <p className="text-white text-xs md:text-sm ">Advanced reporting</p>
                                        <p className="max-md:hidden text-white text-xs md:text-sm ">and dashboards</p>
                                    </div>
                                </div>

                                {/* Left Side Section */}
                                <div className="absolute -left-[3%] md:-left-[12%] w-1/2 h-full flex items-center justify-end p-1 md:p-2">
                                    <div className="text-center rounded-lg p-2 md:p-3 transition-all cursor-pointer group mr-[30%] md:mr-[15%]">
                                        <h4 className="text-white text-sm md:text-lg font-medium ">Microsoft BI</h4>
                                        <p className="text-white text-xs md:text-md ">Business</p>
                                        <p className='text-white text-xs md:text-sm '>intelligence</p>
                                        <p className='text-white text-xs md:text-sm '>platform</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Phase Details Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black flex items-start mt-32 justify-center z-50 ">
                    <div className="bg-[#0a0a0a] overflow-y-scrollbar rounded-lg shadow-2xl max-w-2xl w-full min-h-[82vh] overflow-hidden border-[0.5px] border-gray-100">
                        {/* Modal Header */}
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={closeModal}
                                className="p-2 cursor-pointer flex justify-end"
                            >
                                <FiX className="w-6 h-6 text-white" />
                            </button>
                            <div>
                                <h3 className="text-xl font-bold text-white items-center flex justify-center mt-2">
                                    {selectedApp?.appName || selectedApp?.name || selectedApp?.applicationName}
                                </h3>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto max-h-[80vh] ">
                            {phasesLoading ? (
                                <div className="flex justify-center py-8">
                                    {/* <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div> */}
                                </div>
                            ) : selectedAppPhases.length > 0 ? (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                                        {selectedAppPhases.map((phase, index) => (
                                            <div 
                                                key={phase._id || index} 
                                                className="rounded-lg bg-gradient-to-r from-[#171717] to-black p-3 items-center transition-all"
                                            >
                                                <div className="flex items-center justify-center mb-1">
                                                    <p className="text-sm font-semibold text-white">
                                                        {phase.phaseName || phase.name}
                                                    </p>
                                                </div>
                                                {phase.completionDate && (
                                                    <p className="text-xs text-white mt-2 flex justify-center">
                                                        <span className="font-medium">Completion: </span>
                                                        {new Date(phase.completionDate).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                )}
                                                {phase.description && (
                                                    <p className="text-xs text-white mt-2">
                                                        {phase.description}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-white text-6xl mb-4">📋</div>
                                    <p className="text-white text-lg">No phases configured</p>
                                    <p className="text-white text-sm mt-2">
                                        There are no implementation phases for this application.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Homeboard;


// import { useContext, useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from "../../context/AuthContext";
// // import { IoMdLogIn } from "react-icons/io";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { 
//     FiDatabase, 
//     FiBarChart, 
//     FiActivity, 
//     FiX, 
//     FiGitBranch,
//     FiLayers,
//     FiBox
// } from "react-icons/fi";

// import { MdOutlineIntegrationInstructions } from "react-icons/md";
// import {  FiCloud, FiServer, FiCpu } from "react-icons/fi";
// import { TfiAngleRight } from "react-icons/tfi";

// const Homeboard = () => {
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     axios.defaults.baseURL = backendUrl ;
//     // const {axios} = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [applications, setApplications] = useState([]);
//     const [selectedApp, setSelectedApp] = useState(null);
//     const [selectedAppPhases, setSelectedAppPhases] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [phasesLoading, setPhasesLoading] = useState(false);

//     // Integration Services - Single item as shown in reference
//     const integrationServices = [
//         {
//             id: 1,
//             name: "Microsoft Logic Apps",
//             icon: FiCloud,
//             description: "Workflow automation and Integration"
//         }
//     ];

//     // ADF Services
//     const adfServices = [
//         {
//             id: 1,
//             name: "Microsoft Fabric DW",
//             icon: FiDatabase,
//             description: "Data warehouse and analytics"
//         },
//         {
//             id: 2,
//             name: "Microsoft BI",
//             icon: FiBarChart,
//             description: "Business intelligence platform"
//         },
//         {
//             id: 3,
//             name: "Reporting Services",
//             icon: FiActivity,
//             description: "Advanced reporting and dashboards"
//         }
//     ];

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
//         console.log('✅ App clicked!', app.appName);  // ADD THIS
//         console.log('App ID:', app._id);  // ADD THIS

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
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-16 w-16 border-4 border-black border-t-transparent"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-black">
//             {/* Header - Simple centered header with minimal padding */}
//             <div className="mb-2">
//                 <div className="max-w-full mx-auto px-2">
//                     <div className="flex flex-col items-center justify-center text-center py-2">
//                         {/* Logo */}
//                         <img
//                             src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
//                             alt="Logo"
//                             className="h-15 w-auto invert mb-1"
//                         />
                        
//                         {/* Main Title */}
//                         <h1 className="text-xl font-bold text-white mb-1">
//                             IT SYSTEM LANDSCAPE
//                         </h1>
                        
//                         {/* Subtitle */}
//                         <p className="text-white text-xs">
//                             System Architecture Diagram
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Architecture Layout - Remove all padding and margins */}
//             <div className="max-w-full mx-auto p-0 m-0">
//                 {/* Three Column Layout with Zero Gap and Negative Margins */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 p-0 m-0 items-center justify-center w-full">
                    
//                     {/* INTEGRATION Column - Large Circle */}
//                     <div className="flex flex-col items-center  justify-center p-0 m-0 mr-9"> 
//                         <div className="w-115 h-115 rounded-full flex flex-col items-center justify-center p-0 m-0 relative ">
                            
//                             <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
//                                 <svg width="100%" height="100%" viewBox="0 0 580 580">
//                                     <defs>
//                                         <linearGradient id="smoothBorder-1" x1="100%" y1="100%" x2="30%" y2="0%">
//                                             <stop offset="0%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="70%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="65%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="77%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
//                                         </linearGradient>
//                                     </defs>
//                                     <circle
//                                         cx="290"
//                                         cy="290"
//                                         r="289"
//                                         fill="none"
//                                         stroke="url(#smoothBorder-1)"
//                                         strokeWidth="2.5"
//                                         strokeLinecap="round"
//                                         strokeDasharray="5, 1" // Optional: dotted effect
//                                     />
//                                 </svg>
//                             </div>


//                             {/* Your content */}
//                             <div className="text-center mb-4">
//                                 <h3 className="text-xl font-bold text-white mb-3">INTEGRATION</h3>
//                                 <div className="w-15 h-15 rounded-sm flex items-center justify-center mx-auto mb-3 bg-[#1f1f1f]">
//                                     <MdOutlineIntegrationInstructions className="w-10 h-10 text-gray-400" />
//                                 </div>
//                                 <p className="text-white text-xs">Microsoft Logic Apps</p>
//                                 <p className="text-white text-xs">Workflow & Automation Services</p>
//                             </div>
//                         </div>
                         

//                     </div>

    

//                     {/* APPLICATIONS Column - Largest Circle */}
//                     <div className="flex flex-col items-center justify-center p-0 m-0 z-10"> {/* z-index to ensure it's on top */}
                      
//                         <div className="w-[600px] h-[600px]  rounded-full px-11 flex flex-col items-center justify-center p-0 m-0 relative">

//                             <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
//                                 <svg width="100%" height="100%" viewBox="0 0 580 580">
//                                     <defs>
//                                         <linearGradient id="smoothBorder" x1="100%" y1="90%" x2="0%" y2="0%">
//                                             <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
//                                             <stop offset="70%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="75%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="90%" stopColor="#9ca3af" stopOpacity="" />
//                                             <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
//                                         </linearGradient>
//                                     </defs>
//                                     <circle
//                                         cx="290"
//                                         cy="290"
//                                         r="289"
//                                         fill="none"
//                                         stroke="url(#smoothBorder)"
//                                         strokeWidth="2.5"
//                                         strokeLinecap="round"
//                                         strokeDasharray="5, 1" // Optional: dotted effect
//                                     />
//                                 </svg>
//                             </div>

                            
//                             {/* Column Header - Without icon */}
//                             <div className="text-center mb-6">
//                                 <h3 className="text-xl font-bold text-white mb-2">APPLICATIONS</h3>
//                                 <p className="text-white text-base">Click to view implementation phases</p>
//                             </div>
                            
//                             {/* Applications Grid - 2 columns without scrollbar and without numbering */}
//                             <div className="grid grid-cols-2 gap-3 w-full px-12">
//                                 {applications.map((app) => (
                                    
//                                     <div
                                    
//                                         key={app._id}
//                                         onClick={() => handleAppClick(app)}
//                                         className="rounded-full p-3 text-center hover:text-white 
//                                         transition-all cursor-pointer group bg-gradient-to-r from-[#1f1f1f] to-black"
//                                     >
//                                         <div className='flex gap-1 items-center justify-between cursor-pointer'>
//                                             <h4 className="text-white text-base font-medium group-hover:text-white truncate "
//                                             onClick={() => handleAppClick(app)}
//                                             >
//                                                 {app.appName || app.name || app.applicationName}
//                                             </h4>
//                                             <TfiAngleRight   className='inline text-gray-200 ml-2 flex cursor-pointer' />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

                    
                    
                    
//                     <div className="flex flex-col items-center justify-center p-0 m-0 ml-9">  
//                         <div className="w-115 h-115  rounded-full p-6 flex items-center justify-center relative p-0 m-0 relative">

//                              {/* <div className="absolute inset-0 rounded-full"
//                                 style={{
//                                     background: 'conic-gradient(from -20deg, #9ca3af 10%,  #9ca3af -50%, transparent 115%, transparent 0%)',
//                                     padding: '2.5px',
//                                     mask: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
//                                     maskComposite: 'exclude'
//                                 }}
                                
//                                 >
//                             </div> */}

//                             <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
//                                 <svg width="100%" height="100%" viewBox="0 0 580 580">
//                                     <defs>
//                                         <linearGradient id="smoothBorder-1" x1="100%" y1="100%" x2="30%" y2="0%">
//                                             <stop offset="0%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="70%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="65%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="77%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
//                                         </linearGradient>
//                                     </defs>
//                                     <circle
//                                         cx="290"
//                                         cy="290"
//                                         r="289"
//                                         fill="none"
//                                         stroke="url(#smoothBorder-1)"
//                                         strokeWidth="2.5"
//                                         strokeLinecap="round"
//                                         strokeDasharray="5, 1" // Optional: dotted effect
//                                     />
//                                 </svg>
//                             </div>

//                             {/* Inner Circle in Center */}
//                             <div className="w-50 h-50  rounded-full flex flex-col items-center justify-center bg-black z-10 absolute">
                              
//                                <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
//                                 <svg width="100%" height="100%" viewBox="0 0 582 570">
//                                     <defs>
//                                         <linearGradient id="smoothBorder-2" x1="0%" y1="0%" x2="0%" y2="0%">
//                                             <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
//                                             <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
//                                             <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
//                                             <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
//                                             <stop offset="0%" stopColor="#9ca3af" stopOpacity="1" />
//                                         </linearGradient>
//                                     </defs>
//                                     <circle
//                                         cx="290"
//                                         cy="290"
//                                         r="289"
//                                         fill="none"
//                                         stroke="url(#smoothBorder-2)"
//                                         strokeWidth="6.5"
//                                         strokeLinecap="round"
//                                         strokeDasharray="5, 1" // Optional: dotted effect
//                                     />
//                                 </svg>
//                             </div>
                              
//                                 <h3 className="text-md font-bold text-white text-center">MICROSOFT</h3>
//                                 <p className="text-md font-bold text-white text-center">ADF</p>
//                                 <p className="text-white text-sm mt-5 text-center">Data Factory</p>
//                                 <p className="text-white text-sm  text-center"> & Analytics Platform</p>
//                             </div>

//       {/* Three Divided Sections in the Ring Area */}
//                         <div className="absolute inset-0 flex items-center justify-center">
//     {/* Section 1: Top Right - Keep as is */}
   
//     {/* LINES */}
//     <div className="absolute top-0 right-0 w-1/2 h-1/2 flex items-end justify-start p-1 relative">
    
    
//     {/* Left border with fade */}
//     <div className="absolute left-20 -top-28 w-px h-full bg-gray-100 -rotate-15"
//          style={{
//              mask: 'linear-gradient(to top, black 0%, transparent 100%)',
//              padding: '1.1px',
//          }}></div>
    
//     {/* Bottom border with fade */}
//     <div className="absolute bottom-26 left-30 w-full h-px bg-gray-100"
//         style={{
//             mask: 'linear-gradient(to right, black 0%, transparent 100%)',
//             padding: '1.1px',
//             }}
            
//             >
//     </div>
//     </div>

//     <div className="absolute bottom-35 -right-9 w-1/2 h-1/2 flex items-start justify-start p-4"> 
//     <div className="text-center rounded-lg p-3 hover:bg-white hover:text-black transition-all cursor-pointer group ml-2  -mt-10">
//         <h4 className="text-white text-md font-medium group-hover:text-black">Microsoft</h4>
//         <h4 className="text-white text-md font-medium group-hover:text-black">Fabric DW</h4>
//         <p className="text-white text-sm group-hover:text-black">Data warehouse</p>
//         <p className="text-white text-sm group-hover:text-black"> & analytics</p>
//     </div>  
// </div>


//     <div className="absolute top-10 left-0 w-full h-full pointer-events-none">
//     <div className="absolute bottom-1/3 left-1/3 w-[39%] h-px transform -rotate-45 -translate-x-2/4 translate-y-1/2"
//          style={{
//              background: 'linear-gradient(to right, rgba(156, 163, 175, 1) 5%, rgba(156, 163, 175, 0) 80%)',
//              padding: '0.9px',
//          }}
         
//          >
//          </div>
// </div>

//     {/* Section 2: Bottom Right */}
//     <div className="absolute -bottom-6 right-15 w-1/2 h-1/2 flex items-start justify-start p-1">
//         <div className="text-center rounded-lg  hover:bg-white hover:text-black transition-all cursor-pointer group ml-23 mt-17">
//             <h4 className="text-white text-md font-medium group-hover:text-black">Reporting</h4>
//            <p className="text-white text-md group-hover:text-black ">Services</p>
//             <p className="text-white text-sm group-hover:text-black">Advanced reporting</p>
//             <p className="text-white text-sm group-hover:text-black">and dashboards</p>
//         </div>
//     </div>

//     {/* Section 3: Left Side */}
//     <div className="absolute -left-7 w-1/2 h-full flex items-center justify-end p-2">
//         <div className="text-center rounded-lg p-3 hover:bg-white hover:text-black transition-all cursor-pointer group mr-15">
//             <h4 className="text-white text-sm font-medium group-hover:text-black">Microsoft BI</h4>
//             <p className="text-white text-md  group-hover:text-black">Business</p>
//             <p className='text-white text-sm  group-hover:text-black'>intelligence</p>
//             <p className='text-white text-sm  group-hover:text-black'>platform</p>
//         </div>
//     </div>
//     </div>


//     </div>
//     </div>
//     </div>
//     </div>

//             {/* Phase Details Modal - Black and White Theme */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black flex items-start mt-32 justify-center z-50 ">
//                     <div className="bg-black overflow-y-scrollbar rounded-lg shadow-2xl max-w-2xl w-full min-h-[82vh] overflow-hidden border-[0.5px] border-gray-100">
//                         {/* Modal Header */}
//                         <div className="flex flex-col gap-1">
//                             <button
//                                 onClick={closeModal}
//                                 className="p-2 cursor-pointer flex justify-end"
//                             >
//                                 <FiX className="w-6 h-6 text-white" />
//                             </button>
//                             <div>
//                                 <h3 className="text-xl font-bold text-white items-center flex justify-center mt-2">
//                                     {selectedApp?.appName || selectedApp?.name || selectedApp?.applicationName}
//                                 </h3>
//                             </div>
//                         </div>

//                         {/* Modal Content */}
//                         <div className="p-6 overflow-y-auto max-h-[80vh]">
//                             {phasesLoading ? (
//                                 <div className="flex justify-center py-8">
//                                     {/* <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div> */}
//                                 </div>
//                             ) : selectedAppPhases.length > 0 ? (
//                                 <div className="space-y-6">
//                                     <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
//                                         {selectedAppPhases.map((phase, index) => (
//                                             <div 
//                                                 key={phase._id || index} 
//                                                 className="rounded-lg bg-gradient-to-r from-[#1a1a1a] to-black p-3 items-center transition-all"
//                                             >
//                                                 <div className="flex items-center justify-center mb-1">
//                                                     <p className="text-sm font-semibold text-white">
//                                                         {phase.phaseName || phase.name}
//                                                     </p>
//                                                 </div>
//                                                 {phase.completionDate && (
//                                                     <p className="text-xs text-white mt-2 flex justify-center">
//                                                         <span className="font-medium">Completion: </span>
//                                                         {new Date(phase.completionDate).toLocaleDateString('en-GB', {
//                                                             day: '2-digit',
//                                                             month: '2-digit',
//                                                             year: 'numeric'
//                                                         })}
//                                                     </p>
//                                                 )}
//                                                 {phase.description && (
//                                                     <p className="text-xs text-white mt-2">
//                                                         {phase.description}
//                                                     </p>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="text-center py-8">
//                                     <div className="text-white text-6xl mb-4">📋</div>
//                                     <p className="text-white text-lg">No phases configured</p>
//                                     <p className="text-white text-sm mt-2">
//                                         There are no implementation phases for this application.
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Homeboard;

// import { useContext, useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from "../../context/AuthContext";
// import { IoMdLogIn } from "react-icons/io";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { 
//     FiDatabase, 
//     FiBarChart, 
//     FiActivity, 
//     FiX, 
//     FiGitBranch,
//     FiLayers,
//     FiBox
// } from "react-icons/fi";

// import { MdOutlineIntegrationInstructions } from "react-icons/md";
// import {  FiCloud, FiServer, FiCpu } from "react-icons/fi";
// import { TfiAngleRight } from "react-icons/tfi";

// const Homeboard = () => {
//     const navigate = useNavigate();
//     const [applications, setApplications] = useState([]);
//     const [selectedApp, setSelectedApp] = useState(null);
//     const [selectedAppPhases, setSelectedAppPhases] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [phasesLoading, setPhasesLoading] = useState(false);

//     // Integration Services - Single item as shown in reference
//     const integrationServices = [
//         {
//             id: 1,
//             name: "Microsoft Logic Apps",
//             icon: FiCloud,
//             description: "Workflow automation and Integration"
//         }
//     ];

//     // ADF Services
//     const adfServices = [
//         {
//             id: 1,
//             name: "Microsoft Fabric DW",
//             icon: FiDatabase,
//             description: "Data warehouse and analytics"
//         },
//         {
//             id: 2,
//             name: "Microsoft BI",
//             icon: FiBarChart,
//             description: "Business intelligence platform"
//         },
//         {
//             id: 3,
//             name: "Reporting Services",
//             icon: FiActivity,
//             description: "Advanced reporting and dashboards"
//         }
//     ];

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
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-black">
//             {/* Header - Simple centered header with minimal padding */}
//             <div className="mb-2">
//                 <div className="max-w-full mx-auto px-2">
//                     <div className="flex flex-col items-center justify-center text-center py-2">
//                         {/* Logo */}
//                         <img
//                             src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
//                             alt="Logo"
//                             className="h-15 w-auto invert mb-1"
//                         />
                        
//                         {/* Main Title */}
//                         <h1 className="text-xl font-bold text-white mb-1">
//                             IT SYSTEM LANDSCAPE
//                         </h1>
                        
//                         {/* Subtitle */}
//                         <p className="text-white text-xs">
//                             System Architecture Diagram
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Architecture Layout - Minimal padding */}
//             <div className="max-w-full mx-auto px-2">
//                 {/* Three Column Layout with Maximum Size Circular Containers */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 items-center justify-center">
                    
//                     {/* INTEGRATION Column - Large Circle  border border-gradient-to-r from-gray-100 to-white*/}
//                     <div className="flex flex-col items-center">
//                         <div className="w-96 h-96 border border-gray-100 rounded-full flex flex-col items-center justify-center">
//                             {/* Column Header */}
//                             <div className="text-center mb-4">
                                
//                                 <h3 className="text-xl font-bold text-white mb-3">INTEGRATION</h3>
//                                 <div className="w-15 h-15  rounded-sm flex items-center justify-center mx-auto mb-3 bg-[#1f1f1f]">
//                                     <MdOutlineIntegrationInstructions className="w-10 h-10 text-gray-400" />
//                                 </div>
//                                 <p className="text-white text-xs">Microsoft Logic Apps</p>
//                                 <p className="text-white text-xs">Workflow & Automation Services</p>
//                             </div>
                            
//                             {/* Single Service Item */}
//                             {/* <div className="text-center">
//                                 {integrationServices.map((service) => {
//                                     const IconComponent = service.icon;
//                                     return (
//                                         <div key={service.id} className="space-y-2">
//                                             <div className="flex items-center justify-center space-x-2">
//                                                 <IconComponent className="w-7 h-7 text-white" />
//                                                 <h4 className="text-xl font-semibold text-white">
//                                                     {service.name}
//                                                 </h4>
//                                             </div>
//                                             <p className="text-white text-sm">
//                                                 {service.description}
//                                             </p>
//                                         </div>
//                                     );
//                                 })}
//                             </div> */}
//                         </div>
//                     </div>

//                     {/* APPLICATIONS Column - Largest Circle */}
//                     <div className="flex flex-col items-center">
//                         <div className="w-[600px] h-[600px]  border border-gray-100 rounded-full px-11 flex flex-col items-center justify-center">
//                             {/* Column Header - Without icon */}
//                             <div className="text-center mb-6">
//                                 <h3 className="text-xl font-bold text-white mb-2">APPLICATIONS</h3>
//                                 <p className="text-white text-base">Click to view implementation phases</p>
//                             </div>
                            
//                             {/* Applications Grid - 2 columns without scrollbar and without numbering */}
//                             <div className="grid grid-cols-2 gap-3 w-full px-12">
//                                 {applications.map((app) => (
//                                     <div
//                                         key={app._id}
//                                         onClick={() => handleAppClick(app)}
//                                         className="rounded-full p-3 text-center hover:text-white 
//                                         transition-all cursor-pointer group bg-gradient-to-r from-[#1f1f1f] to-black"
//                                     >
//                                         <div className ='flex gap-1 items-center'>
//                                             <h4 className="text-white text-base font-medium group-hover:text-white truncate">
//                                                 {app.appName || app.name || app.applicationName}
//                                             </h4>
//                                             <TfiAngleRight className='inline text-gray-200 ml-2' />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

                    
//                     {/* MICROSOFT ADF Column - Large Circle */}
//                     <div className="flex flex-col items-center">
//                         <div className="w-96 h-96 border border-gray-100 rounded-full p-6 flex items-center justify-center relative">

//                             {/* Inner Circle in Center */}
//                             <div className="w-35 h-35 border border-gray-100 rounded-full flex flex-col items-center justify-center bg-black z-10 absolute">
//                                 <h3 className="text-md font-bold text-white text-center">MICROSOFT</h3>
//                                 <h3 className="text-md font-bold text-white text-center">ADF</h3>
//                                 <p className="text-white text-xs mt-1 text-center">Data Factory</p>
//                                 <p className="text-white text-xs mt-1 text-center"> & Analytics Platform</p>
//                             </div>

//                             {/* Three Divided Sections in the Ring Area - rounded-bl-full*/}
//                             <div className="absolute inset-0 flex items-center justify-center">
//                                 {/* Section 1: Top Right */}
//                                 <div className="absolute top-0 right-0 w-1/2 h-1/2 border-l border-b border-gray-100  flex items-end justify-start p-1">
//                                     <div className="text-center border rounded-lg p-3 hover:bg-white hover:text-black transition-all cursor-pointer group ml-8 mb-8">
//                                         <h4 className="text-white text-sm font-medium group-hover:text-black">Microsoft</h4>
//                                         <h4 className="text-white text-sm font-medium group-hover:text-black">Fabric DW</h4>
//                                         <p className="text-white text-xs group-hover:text-black mt-1">Data warehouse</p>
//                                         <p className="text-white text-xs group-hover:text-black mt-1"> & analytics</p>
//                                     </div>
//                                 </div>

//                                 {/* Section 2: Bottom Right */}
                               
//                                    <div className="absolute bottom-0 right-0 w-1/2 h-1/2 border-l border-t border-gray-100  flex items-start justify-start p-4">
//                                     <div className="text-center  rounded-lg p-3 hover:bg-white hover:text-black transition-all cursor-pointer group ml-3 mt-9">
//                                         <h4 className="text-white text-sm font-medium group-hover:text-black">Reporting Services</h4>
//                                         <p className="text-white text-xs group-hover:text-black mt-1">Advanced reporting</p>
//                                         <p className="text-white text-xs group-hover:text-black mt-1">and dashboards</p>
//                                     </div>
//                                 </div>
//                                 {/* Section 3: Left Side */}

//                                  <div className="absolute left-0 w-1/2 h-full border-r border-gray-100  flex items-center justify-end p-2">
//                                     <div className="text-center rounded-lg p-3 hover:bg-white hover:text-black transition-all cursor-pointer group mr-15">
//                                         <h4 className="text-white text-sm font-medium group-hover:text-black">
//                                             Microsoft BI
//                                         </h4>
//                                         <p className="text-white text-xs mt-1 group-hover:text-black">Business</p>
//                                         <p className ='text-white text-xs mt-1 group-hover:text-black'>intelligence</p>
//                                         <p className ='text-white text-xs mt-1 group-hover:text-black'>platform</p>
//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </div>  



//                 </div>
//             </div>

//             {/* Phase Details Modal - Black and White Theme */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black flex items-start mt-32 justify-center z-50">
                   
//                     <div className="bg-black rounded-lg shadow-2xl max-w-2xl w-full min-h-[82vh] overflow-hidden border-[0.5px] border-gray-100">
//                         {/* New Header */}
                        
                        
//                         {/* Modal Header */}
                       
//                         <div className="flex flex-col gap-1">
//                             <button
//                                 onClick={closeModal}
//                                 className="p-2  cursor-pointer flex justify-end"
//                             >
//                                 <FiX className="w-6 h-6 text-white" />
//                             </button>
//                             <div>
//                                 <h3 className="text-xl font-bold text-white items-center flex justify-center mt-2">
//                                     {selectedApp?.appName || selectedApp?.name || selectedApp?.applicationName}
//                                 </h3>
                              
//                             </div>
                           
//                         </div>

//                         {/* Modal Content */}
//                         <div className="p-6 overflow-y-auto max-h-[80vh]">
//                             {phasesLoading ? (
//                                 <div className="flex justify-center py-8">
//                                     {/* <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div> */}
//                                 </div>
//                             ) : selectedAppPhases.length > 0 ? (
//                                 <div className="space-y-6">
                                    
//                                     <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
//                                         {selectedAppPhases.map((phase, index) => (
//                                             <div 
//                                                 key={phase._id || index} 
//                                                 className=" rounded-lg bg-gradient-to-r from-[#1a1a1a] to-black p-4 items-center transition-all"
//                                             >
//                                                 <div className="flex items-center justify-center mb-3">
//                                                     <p className="text-sm font-semibold text-white ">
//                                                         {phase.phaseName || phase.name}
//                                                     </p>
//                                                     {/* <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border border-white text-white">
//                                                         Phase {index + 1}
//                                                     </span> */}
//                                                 </div>
//                                                 {phase.completionDate && (
//                                                     <p className="text-xs text-white hover:text-black mt-2 flex justify-center">
//                                                         <span className="font-medium">Completion: </span>
//                                                         {new Date(phase.completionDate).toLocaleDateString('en-GB', {
//                                                             day: '2-digit',
//                                                             month: '2-digit',
//                                                             year: 'numeric'
//                                                         })}
//                                                     </p>
//                                                 )}
//                                                 {phase.description && (
//                                                     <p className="text-xs text-white  mt-2">
//                                                         {phase.description}
//                                                     </p>
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="text-center py-8">
//                                     <div className="text-white text-6xl mb-4">📋</div>
//                                     <p className="text-white text-lg">No phases configured</p>
//                                     <p className="text-white text-sm mt-2">
//                                         There are no implementation phases for this application.
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
                       

//                         {/* Modal Footer */}
//                         {/* <div className="flex justify-end p-6 border-t border-white">
//                             <button
//                                 onClick={closeModal}
//                                 className="cursor-pointer px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black rounded-lg transition-all font-semibold"
//                             >
//                                 Close Details
//                             </button>
//                         </div> */}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Homeboard;
// // import { useContext, useState, useEffect } from "react";
// // import { useNavigate } from 'react-router-dom';
// // import { AuthContext } from "../../context/AuthContext";
// // import { AiOutlineLogout, AiOutlineAppstore, AiOutlineCloudServer } from "react-icons/ai";
// // import { IoMdLogIn } from "react-icons/io";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { FiLink, FiDatabase, FiBarChart, FiActivity, FiX, FiCloud, FiServer, FiBox, FiCpu, FiGitBranch } from "react-icons/fi";
// // import BottomNav from "../components/shared/BottomNav";

// // const Homeboard = () => {
// //     const navigate = useNavigate();
// //     const [applications, setApplications] = useState([]);
// //     const [selectedApp, setSelectedApp] = useState(null);
// //     const [selectedAppPhases, setSelectedAppPhases] = useState([]);
// //     const [isModalOpen, setIsModalOpen] = useState(false);
// //     const [loading, setLoading] = useState(true);
// //     const [phasesLoading, setPhasesLoading] = useState(false);

// //     // Fixed Integration Services - Based on your image
// //     const integrationServices = [
// //         {
// //             id: 1,
// //             name: "Microsoft Logic Apps",
// //             icon: FiCloud,
// //             description: "Workflow automation and integration",
// //             color: "from-blue-500 to-blue-600",
// //             bgColor: "bg-blue-50",
// //             borderColor: "border-blue-200"
// //         },
// //         // {
// //         //     id: 2,
// //         //     name: "Supervisor CSM",
// //         //     icon: FiCpu,
// //         //     description: "Control and monitoring system",
// //         //     color: "from-blue-500 to-blue-600",
// //         //     bgColor: "bg-blue-50",
// //         //     borderColor: "border-blue-200"
// //         // },
// //         // {
// //         //     id: 3,
// //         //     name: "Azure Services",
// //         //     icon: FiServer,
// //         //     description: "Cloud infrastructure services",
// //         //     color: "from-blue-500 to-blue-600",
// //         //     bgColor: "bg-blue-50",
// //         //     borderColor: "border-blue-200"
// //         // }
// //     ];

// //     // Fixed ADF Services - Based on your image
// //     const adfServices = [
// //         {
// //             id: 1,
// //             name: "Microsoft Fabric DW",
// //             icon: FiDatabase,
// //             description: "Data warehouse and analytics",
// //             color: "from-purple-500 to-purple-600",
// //             bgColor: "bg-purple-50",
// //             borderColor: "border-purple-200"
// //         },
// //         {
// //             id: 2,
// //             name: "Microsoft BI",
// //             icon: FiBarChart,
// //             description: "Business intelligence platform",
// //             color: "from-purple-500 to-purple-600",
// //             bgColor: "bg-purple-50",
// //             borderColor: "border-purple-200"
// //         },
// //         {
// //             id: 3,
// //             name: "Reporting Services",
// //             icon: FiActivity,
// //             description: "Advanced reporting and dashboards",
// //             color: "from-purple-500 to-purple-600",
// //             bgColor: "bg-purple-50",
// //             borderColor: "border-purple-200"
// //         }
// //     ];

// //     // Fetch applications
// //     const fetchApps = async () => {
// //         try {
// //             const { data } = await axios.get('/v1/api/app');
// //             if (data.success) {
// //                 setApplications(data.applications);
// //             } else {
// //                 toast.error(data.message);
// //             }
// //         } catch (error) {
// //             toast.error(error.response?.data?.message || error.message);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // Fetch phases for a specific application
// //     const fetchPhases = async (applicationId) => {
// //         if (!applicationId) return;

// //         setPhasesLoading(true);
// //         try {
// //             const { data } = await axios.get(`/v1/api/app/${applicationId}/phases`);
// //             if (data.success) {
// //                 setSelectedAppPhases(data.phases);
// //             } else {
// //                 toast.error(data.message);
// //                 setSelectedAppPhases([]);
// //             }
// //         } catch (error) {
// //             toast.error(error.response?.data?.message || error.message);
// //             setSelectedAppPhases([]);
// //         } finally {
// //             setPhasesLoading(false);
// //         }
// //     };

// //     // Handle application click
// //     const handleAppClick = async (app) => {
// //         setSelectedApp(app);
// //         setIsModalOpen(true);
// //         await fetchPhases(app._id);
// //     };

// //     // Close modal
// //     const closeModal = () => {
// //         setIsModalOpen(false);
// //         setSelectedApp(null);
// //         setSelectedAppPhases([]);
// //         setPhasesLoading(false);
// //     };

// //     useEffect(() => {
// //         fetchApps();
// //     }, []);

// //     if (loading) {
// //         return (
// //             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div>
// //             {/* Header
// //             <div className='px-4 flex justify-between bg-linear-65 from-gray-200 to-gray-600 md:hidden lg:hidden'>
// //                 <img
// //                     src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
// //                     alt="Logo"
// //                     className='w-[100px] max-sm:w-[100px] cursor-pointer'
// //                 />

// //                 <div className='flex items-center gap-1'>
// //                     <button 
// //                         onClick={() => navigate('/admin-login')}
// //                         className='cursor-pointer px-2 py-2 transition-all rounded-lg text-gray-200'
// //                     >
// //                         Admin
// //                     </button>
// //                     <IoMdLogIn 
// //                         className='inline ml-1 w-6 h-6 text-white' 
// //                         onClick={() => navigate('/admin-login')}
// //                     />
// //                 </div>
// //             </div> */}

// //             <div className="min-h-screen bg-gray-500 ">
// //                 {/* System Architecture Diagram */}
// //                 <div className="bg-white min-h-screen rounded-xl shadow-xl ">
                    
// //                     <div className ='flex flex-col bg-linear-65 from-white to-gray-600 mb-1 rounded-xs'>
// //                         <div className='flex items-center justify-between px-2'>
// //                             <img
// //                                 src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
// //                                 alt="Logo"
// //                                 className='w-[100px] max-sm:w-[70px] cursor-pointer'
// //                             />
// //                             <h2 className="text-2xl max-md:text-sm font-bold text-center text-white">
// //                                 IT SYSTEM LANDSCAPE
// //                             </h2>
// //                             <div className='flex items-center gap-1'>
// //                                 <button
// //                                     onClick={() => navigate('/admin-login')}
// //                                     className='cursor-pointer px-2 py-2 transition-all rounded-lg text-gray-200'
// //                                 >
// //                                     Admin
// //                                 </button>
// //                                 <IoMdLogIn
// //                                     className='inline ml-1 w-6 h-6 text-white'
// //                                     onClick={() => navigate('/admin-login')}
// //                                 />
// //                             </div>

// //                         </div>

// //                         <p className="text-center text-gray-900 ">System Architecture Diagram</p>

// //                     </div>
                    
                    
// //                     {/* Main Architecture Layout */}
// //                     <div className="relative">
// //                         {/* Connection Lines */}
// //                         <div className="absolute inset-0 pointer-events-none hidden lg:block">
// //                             {/* Horizontal connection lines */}
// //                             <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-black via-gray-600 to-gray-600 transform -translate-y-1/2 z-0"></div>
                            
// //                             {/* Vertical connection dots */}
// //                             <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
// //                             <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                            
// //                             {/* Arrow heads */}
// //                             <div className="absolute top-1/2 left-1/3 -ml-2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-gray-400 transform -translate-y-1/2"></div>
// //                             <div className="absolute top-1/2 left-2/3 -ml-2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-gray-400 transform -translate-y-1/2"></div>
                        
// //                         </div>

// //                         {/* Three Column Layout */}
// //                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[670px] relative z-10">
                          
// //                             {/* Left Column - Integration */}
// //                             <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-2 border-3 border-gray-300 shadow-lg">
// //                                 <div className="text-center mb-6">
// //                                     <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
// //                                         <FiGitBranch className="w-8 h-8 text-white" />
// //                                     </div>
// //                                     <h3 className="text-xl font-bold text-gray-800">INTEGRATION</h3>
// //                                     <p className="text-sm text-gray-600 mt-1 md:mb-40">Workflow & Automation Services</p>
// //                                 </div>
                                
// //                                 <div className="space-y-2">
// //                                     {integrationServices.map((service) => {
// //                                         const IconComponent = service.icon;
// //                                         return (
// //                                             <div
// //                                                 key={service.id}
// //                                                 className={`bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-gray-600 hover:border-gray-400`}
// //                                             >
// //                                                 <div className="flex items-center space-x-4">
// //                                                     <div className={`w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center shadow-sm`}>
// //                                                         <IconComponent className="w-6 h-6 text-white" />
// //                                                     </div>
// //                                                     <div className="flex-1 text-left">
// //                                                         <h4 className="font-bold text-gray-900 text-lg">{service.name}</h4>
// //                                                         <p className="text-sm text-gray-600 mt-1">{service.description}</p>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         );
// //                                     })}
// //                                 </div>
// //                             </div>

// //                             {/* Middle Column - Applications */}
// //                             <div className="bg-gradient-to-br from-gray-100 to-gray-400 rounded-2xl p-1 border-3 border-gray-400 shadow-lg">
// //                                 <div className="text-center mb-1">
// //                                     <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-1 shadow-md">
// //                                         <FiServer className="w-8 h-8 text-white" />
// //                                     </div>
// //                                     <h3 className="text-xl font-bold text-gray-800">APPLICATIONS</h3>
// //                                     <p className="text-sm text-gray-600 mt-1">Click to view implementation phases</p>
// //                                 </div>
                                
// //                                 <div className="space-y-1 max-h-[550px] overflow-y-auto pr-2">
// //                                     {applications.map((app, index) => (
// //                                         <div
// //                                             key={app._id}
// //                                             onClick={() => handleAppClick(app)}
// //                                             className="bg-white p-1 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-gray-300 hover:border-blue-400 group"
// //                                         >
// //                                             <div className="flex items-center justify-between">
// //                                                 <div className="flex items-center space-x-4">
// //                                                     <div className="w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-300 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
// //                                                         {index + 1}
// //                                                     </div>
// //                                                     <div className="text-left">
// //                                                         <h4 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
// //                                                             {app.appName || app.name || app.applicationName}
// //                                                         </h4>
// //                                                         <p className="text-xs text-gray-500 mt-1">
// //                                                             Click to view phase details
// //                                                         </p>
// //                                                     </div>
// //                                                 </div>
// //                                                 <FiBox className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
// //                                             </div>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             </div>

// //                             {/* Right Column - Microsoft ADF */}
// //                             <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-1 border-3 border-gray-300 shadow-lg">
// //                                 <div className="text-center mb-4">
// //                                     <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
// //                                         <FiDatabase className="w-8 h-8 text-white" />
// //                                     </div>
// //                                     <h3 className="text-xl font-bold text-gray-800">MICROSOFT ADF</h3>
// //                                     <p className="text-sm text-gray-600 mt-2 md:mb-10">Data Factory & Analytics Platform</p>
// //                                 </div>
                                
// //                                 <div className="space-y-4">
// //                                     {adfServices.map((service) => {
// //                                         const IconComponent = service.icon;
// //                                         return (
// //                                             <div
// //                                                 key={service.id}
// //                                                 className={`bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 border-gray-400 hover:border-gray-400`}
// //                                             >
// //                                                 <div className="flex items-center space-x-4">
// //                                                     <div className={`w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center shadow-sm`}>
// //                                                         <IconComponent className="w-6 h-6 text-white" />
// //                                                     </div>
// //                                                     <div className="flex-1 text-left">
// //                                                         <h4 className="font-bold text-gray-900 text-lg">{service.name}</h4>
// //                                                         <p className="text-sm text-gray-600 mt-1">{service.description}</p>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         );
// //                                     })}
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         {/* Data Flow Labels */}
// //                         {/* <div className="mt-6 text-center hidden lg:block">
// //                             <div className="flex justify-between items-center px-12">
// //                                 <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Data Input</span>
// //                                 <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">Processing</span>
// //                                 <span className="text-sm font-semibold text-purple bg-purple-100 px-3 py-1 rounded-full">Output & Analytics</span>
// //                             </div>
// //                         </div> */}
// //                     </div>
// //                 </div>

// //                 {/* Phase Details Modal */}
// //                 {isModalOpen && (
// //                     <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50"
// //                     style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
// //                     >
// //                         <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
// //                             {/* Modal Header */}
// //                             <div className="flex justify-between items-center p-6 border-b border-gray-200">
// //                                 <div>
// //                                     <h3 className="text-xl font-semibold text-gray-900">
// //                                         {selectedApp?.appName || selectedApp?.name || selectedApp?.applicationName}
// //                                     </h3>
// //                                     <p className="text-sm text-gray-500 mt-1">
// //                                         Phase Details
// //                                     </p>
// //                                 </div>
// //                                 <button
// //                                     onClick={closeModal}
// //                                     className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
// //                                 >
// //                                     <FiX className="w-6 h-6 text-gray-500" />
// //                                 </button>
// //                             </div>

// //                             {/* Modal Content */}
// //                             <div className="p-6 overflow-y-auto max-h-[60vh]">
// //                                 {phasesLoading ? (
// //                                     <div className="flex justify-center py-8">
// //                                         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
// //                                     </div>
// //                                 ) : selectedAppPhases.length > 0 ? (
// //                                     <div className="space-y-4">
// //                                         <div className="flex justify-between items-center mb-4">
// //                                             <h4 className="font-medium text-gray-900">
// //                                                 Phases ({selectedAppPhases.length})
// //                                             </h4>
// //                                         </div>
// //                                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //                                             {selectedAppPhases.map((phase, index) => (
// //                                                 <div 
// //                                                     key={phase._id || index} 
// //                                                     className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
// //                                                 >
// //                                                     <div className="flex items-start justify-between mb-2">
// //                                                         <p className="text-sm font-medium text-gray-900">
// //                                                             {phase.phaseName || phase.name}
// //                                                         </p>
// //                                                         <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-500 text-white">
// //                                                             Phase {index + 1}
// //                                                         </span>
// //                                                     </div>
// //                                                     {phase.completionDate && (
// //                                                         <p className="text-xs text-gray-600 mt-2">
// //                                                             <span className="font-medium">Completion Date: </span>
// //                                                             {new Date(phase.completionDate).toLocaleDateString('en-GB', {
// //                                                                 day: '2-digit',
// //                                                                 month: '2-digit',
// //                                                                 year: 'numeric'
// //                                                             })}
// //                                                         </p>
// //                                                     )}
// //                                                     {phase.description && (
// //                                                         <p className="text-xs text-gray-500 mt-2">
// //                                                             {phase.description}
// //                                                         </p>
// //                                                     )}
// //                                                 </div>
// //                                             ))}
// //                                         </div>
// //                                     </div>
// //                                 ) : (
// //                                     <div className="text-center py-8">
// //                                         <div className="text-gray-400 text-6xl mb-4">📋</div>
// //                                         <p className="text-gray-500 text-lg">No phases found</p>
// //                                         <p className="text-gray-400 text-sm mt-2">
// //                                             There are no phases configured for this application.
// //                                         </p>
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             {/* Modal Footer */}
// //                             <div className="flex justify-end p-6 border-t border-gray-200 bg-gray-50">
// //                                 <button
// //                                     onClick={closeModal}
// //                                     className="cursor-pointer px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
// //                                 >
// //                                     Close
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // }

// // export default Homeboard;