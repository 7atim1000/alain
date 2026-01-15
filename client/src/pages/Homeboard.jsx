import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FiX } from "react-icons/fi";
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
            <div className="zoom-proof-container">
                {/* Header */}
                <div className="mb-1 md:mb-2 px-2">
                    <div className="flex flex-col items-center justify-center text-center py-1 md:py-2">
                        {/* Logo */}
                        <img
                            src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
                            alt="Logo"
                            className="h-12 md:h-15 w-auto invert mb-0.5 md:mb-1"
                        />
                        
                        {/* Main Title */}
                        <h1 className="text-lg md:text-2xl font-bold text-white/50 mb-0.5 md:mb-1">
                            IT SYSTEM LANDSCAPE
                        </h1>
                        
                        {/* Subtitle */}
                        <p className="text-white/50 text-md font-bold">
                            System Architecture Diagram
                        </p>
                    </div>
                </div>

                {/* Main Architecture Layout */}
                <div className="w-full max-w-[95vw] mx-auto p-0 m-0 overflow-hidden">
                    <div className="w-full max-w-7xl mx-auto px-0">
                        {/* Grid with 0 gap - Original layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0  md:gap-42 lg:gap-42 items-center justify-center w-full">
                            
                            {/* INTEGRATION Column - Left Circle */}
                            <div className="flex justify-center">
                                <div className="relative w-[32vw] h-[32vw] max-w-[380px] max-h-[380px] min-w-[550px] min-h-[280px] rounded-full flex flex-col items-center justify-center">
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

                            {/* APPLICATIONS Column - Center Circle - Original size */}
                            <div className="flex justify-center z-10">
                                <div className="w-[42vw] h-[42vw] max-w-[600px] max-h-[590px] min-w-[750px] min-h-[350px] rounded-full flex flex-col items-center justify-center relative">
                                    
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
                                    <div className="text-center mb-4 md:mb-6 -mt-5 md:-mt-30 px-4">
                                        <h3 className="text-lg md:text-2xl font-bold text-white mb-1">APPLICATIONS</h3>
                                        <p className="text-white text-lg">Click to view implementation phases</p>
                                    </div>
                                    
                                    {/* Applications Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3 w-full px-60 md:px-35 mt-4 md:mt-5">
                                        {applications.map((app) => (
                                            <div
                                                key={app._id}
                                                onClick={() => handleAppClick(app)}
                                                className="rounded-full p-2 md:p-2 text-center hover:text-white transition-all cursor-pointer group bg-gradient-to-l from-black via-black via-50% to-[rgb(124,111,99)]"
                                            >
                                                <div className='flex items-center justify-between cursor-pointer max-md:flex-row max-md:gap-5 md:py-3'>
                                                    <h4 className="text-white text-lg font-medium group-hover:text-white truncate max-md:text-xs"
                                                        onClick={() => handleAppClick(app)}
                                                    >
                                                        {app.appName || app.name || app.applicationName}
                                                    </h4>
                                                    <TfiAngleRight className='inline text-taupe md:ml-2 flex cursor-pointer w-4 h-4 font-bold' />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* ADF Column - Right Circle */}
                            <div className="flex justify-center">
                                <div className="relative w-[32vw] h-[32vw] max-w-[380px] max-h-[380px] min-w-[550px] min-h-[280px] rounded-full flex items-center justify-center">
                                    
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
                                            
                                            <div className="absolute bottom-[25%] left-[22%] w-full h-px bg-gray-100"
                                                style={{
                                                    mask: 'linear-gradient(to right, black 10%, transparent 100%)',
                                                    padding: '1.1px',
                                                }}>
                                            </div>
                                        </div>

                                        <div className="absolute max-md:bottom-[30%] bottom-[25%] -right-[5%] md:-right-[9%] w-1/2 h-1/2 flex items-start justify-start p-2 md:p-4"> 
                                            <div className="text-center rounded-lg p-2 md:p-3 transition-all cursor-pointer group ml-1 md:ml-2 -mt-8 md:-mt-10">
                                                <h4 className="text-white text-xs md:text-lg font-medium">Microsoft</h4>
                                                <h4 className="text-white text-xs md:text-md font-medium">Fabric DW</h4>
                                                <p className="text-white text-xs md:text-sm">Data</p>
                                                <p className="text-white text-xs md:text-sm">warehouse</p>
                                                <p className="text-white text-xs md:text-sm">& analytics</p>
                                            </div>  
                                        </div>

                                        <div className="absolute top-[5%] left-0 w-full h-full pointer-events-none">
                                            <div className="absolute bottom-1/3 left-1/3 w-[24%] h-px transform -rotate-45 -translate-x-2/4 translate-y-1/2"
                                                style={{
                                                    background: 'linear-gradient(to right, rgba(156, 163, 175, 1) 5%, rgba(156, 163, 175, 0) 75%)',
                                                    padding: '.9px',
                                                }}>
                                            </div>
                                        </div>

                                        {/* Bottom Right Section */}
                                        <div className="absolute -bottom-[1%] md:-bottom-[11%] right-[20%] md:right-[18%] w-1/2 h-1/2 flex items-start justify-start p-1">
                                            <div className="text-center rounded-lg transition-all cursor-pointer group ml-[55%] md:ml-[23%] mt-[35%] md:mt-[17%]">
                                                <h4 className="max-md:hidden text-white text-xs md:text-lg font-medium">Reporting</h4>
                                                <h4 className="md:hidden text-white text-xs md:text-md font-medium">Reporting & Services</h4>
                                            
                                                <p className="max-md:hidden text-white text-xs md:text-md">Services</p>
                                                <p className="text-white text-xs md:text-sm">Advanced reporting</p>
                                                <p className="max-md:hidden text-white text-xs md:text-sm">and dashboards</p>
                                            </div>
                                        </div>

                                        {/* Left Side Section */}
                                        <div className="absolute -left-[3%] md:-left-[6%] w-1/2 h-full flex items-center justify-end p-1 md:p-2">
                                            <div className="text-center rounded-lg p-2 md:p-3 transition-all cursor-pointer group mr-[30%] md:mr-[15%]">
                                                <h4 className="text-white text-sm md:text-lg font-medium">Microsoft BI</h4>
                                                <p className="text-white text-xs md:text-md">Business</p>
                                                <p className='text-white text-xs md:text-sm'>intelligence</p>
                                                <p className='text-white text-xs md:text-sm'>platform</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phase Details Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0a0a0a] rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-taupe">
                        {/* Modal Header */}
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={closeModal}
                                className="p-4 cursor-pointer flex justify-end"
                            >
                                <FiX className="w-6 h-6 text-white" />
                            </button>
                            <div>
                                <h3 className="text-xl font-bold text-white text-center mb-2">
                                    {selectedApp?.appName || selectedApp?.name || selectedApp?.applicationName}
                                </h3>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 md:p-6 overflow-y-auto max-h-[70vh]">
                            {phasesLoading ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
                                </div>
                            ) : selectedAppPhases.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-3">
                                        {selectedAppPhases.map((phase, index) => (
                                            <div 
                                                key={phase._id || index} 
                                                className="rounded-lg bg-gradient-to-l from-black via-black via-60% to-[rgb(124,111,99)] p-4 transition-all"
                                            >
                                                <div className="flex items-center justify-center mb-2">
                                                    <p className="text-lg font-semibold text-white text-center">
                                                        {phase.phaseName || phase.name}
                                                    </p>
                                                </div>
                                                {phase.completionDate && (
                                                    <p className="text-sm text-white mt-2 flex justify-center">
                                                        <span className="font-medium">Completion : </span>
                                                        {new Date(phase.completionDate).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric'
                                                        })}
                                                    </p>
                                                )}
                                                {phase.description && (
                                                    <p className="text-xs text-white mt-2 text-center">
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
// import { TfiAngleRight } from "react-icons/tfi";


// const Homeboard = () => {
    
    
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     axios.defaults.baseURL = backendUrl;
//     const navigate = useNavigate();
//     const [applications, setApplications] = useState([]);
//     const [selectedApp, setSelectedApp] = useState(null);
//     const [selectedAppPhases, setSelectedAppPhases] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [phasesLoading, setPhasesLoading] = useState(false);

//     // Integration Services
//     const integrationServices = [
//         {
//             id: 1,
//             name: "Microsoft Logic Apps",
//             icon: MdOutlineIntegrationInstructions,
//             description: "Workflow automation and Integration"
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
//         console.log('✅ App clicked!', app.appName);
//         console.log('App ID:', app._id);

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
//     <div className="min-h-screen bg-[#0a0a0a] w-full overflow-x-hidden">
//         {/* ADD THIS CONTAINER - it's missing! */}
//         <div className="zoom-proof-container">
//             {/* Header */}
//             <div className="mb-1 md:mb-2">
//                 <div className="w-full px-2">
//                     <div className="flex flex-col items-center justify-center text-center py-1 md:py-2">
//                         {/* Logo */}
//                         <img
//                             src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
                            
//                             alt="Logo"
//                             className="h-12 md:h-15 w-auto invert mb-0.5 md:mb-1"
//                         />
                        
//                         {/* Main Title */}
//                         <h1 className="text-lg md:text-2xl font-bold text-white/50 mb-0.5 md:mb-1">
//                             IT SYSTEM LANDSCAPE
//                         </h1>
                        
//                         {/* Subtitle */}
//                         <p className="text-white/50 text-md font-bold">
//                             System Architecture Diagram
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Architecture Layout */}
//             <div className="w-full max-w-[95vw] mx-auto p-0 m-0 overflow-hidden">
//                 <div className="w-full max-w-7xl mx-auto px-4">
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-47 items-center justify-center">
                        
//                         {/* INTEGRATION Column - Left Circle */}
//                         <div className="flex justify-center">
//                             <div className="relative w-[32vw] h-[32vw] max-w-[380px] max-h-[380px] min-w-[380px] min-h-[280px] rounded-full flex flex-col items-center justify-center relative aspect-square">
//                                 {/* SVG Border */}
//                                 <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
//                                     <svg width="100%" height="100%" viewBox="0 0 580 580">
//                                         <defs>
//                                             <linearGradient id="smoothBorder-1" x1="100%" y1="100%" x2="30%" y2="0%">
//                                                 <stop offset="0%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 <stop offset="70%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 <stop offset="65%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 <stop offset="77%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
//                                             </linearGradient>
//                                         </defs>
//                                         <circle
//                                             cx="290"
//                                             cy="290"
//                                             r="289"
//                                             fill="none"
//                                             stroke="url(#smoothBorder-1)"
//                                             strokeWidth="2.5"
//                                             strokeLinecap="round"
//                                             strokeDasharray="5, 1"
//                                         />
//                                     </svg>
//                                 </div>

//                                 {/* Content */}
//                                 <div className="text-center mb-2 md:mb-4 px-2">
//                                     <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">INTEGRATION</h3>
//                                     <div className="w-12 h-12 md:w-15 md:h-15 rounded-sm flex items-center justify-center mx-auto mb-2 md:mb-3 bg-[#1f1f1f]">
//                                         <MdOutlineIntegrationInstructions className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
//                                     </div>
//                                     <p className="text-white text-xs md:text-sm">Microsoft Logic Apps</p>
//                                     <p className="text-white text-xs md:text-sm">Workflow & Automation Services</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* APPLICATIONS Column - Center Circle */}
//                         <div className="flex justify-center lg:scale-155">
//                             <div className="w-[42vw] h-[42vw] max-w-[600px] max-h-[600px] min-w-[375px] min-h-[350px] rounded-full flex flex-col items-center justify-center relative">
                                
                            
//                                 {/* SVG Border */}
//                                 <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
//                                     <svg width="100%" height="100%" viewBox="0 0 580 580">
//                                         <defs>
//                                             <linearGradient id="smoothBorder" x1="100%" y1="90%" x2="0%" y2="0%">
//                                                 <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
//                                                 <stop offset="70%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 <stop offset="75%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 <stop offset="90%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
//                                             </linearGradient>
//                                         </defs>
//                                         <circle
//                                             cx="290"
//                                             cy="290"
//                                             r="289"
//                                             fill="none"
//                                             stroke="url(#smoothBorder)"
//                                             strokeWidth="2.5"
//                                             strokeLinecap="round"
//                                             strokeDasharray="5, 1"
//                                         />
//                                     </svg>
//                                 </div>
                                
//                                 {/* Column Header */}
//                                 <div className="text-center mb-4 md:mb-6 md:-mt-20 -mt-5 px-4">
//                                     <h3 className="text-lg md:text-lg font-bold text-white mb-1 md:mb-1">APPLICATIONS</h3>
//                                     <p className="text-white text-sm">Click to view implementation phases</p>
//                                 </div>
                                
//                                 {/* Applications Grid */}
//                                 <div className="grid grid-cols-2 md:grid-cols-2 mt-5 md:mt-2 gap-2 md:gap-3 w-full px-10">
//                                     {applications.map((app) => (
//                                         <div
//                                             key={app._id}
//                                             onClick={() => handleAppClick(app)}
//                                             className="rounded-full p-2 md:p-2 text-center hover:text-white transition-all cursor-pointer group bg-gradient-to-l from-black via-black via-50% to-[rgb(124,111,99)]"
//                                         >
//                                             <div className='flex items-center justify-between cursor-pointer max-md:flex-row max-md:gap-5'>
//                                                 <h4 className="recase text-white text-xs font-medium group-hover:text-white truncate max-md:text-xs"
//                                                     onClick={() => handleAppClick(app)}
//                                                 >
//                                                     {app.appName || app.name || app.applicationName}
//                                                 </h4>
//                                                 <TfiAngleRight className='inline text-taupe md:ml-2 flex cursor-pointer w-4 h-4 font-bold' />
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* ADF Column - Right Circle */}
//                         <div className="flex justify-center">
//                             <div className="relative w-[32vw] h-[32vw] max-w-[380px] max-h-[380px] min-w-[380px] min-h-[280px] rounded-full flex items-center justify-center">
                                
//                                 {/* SVG Border */}
//                                 <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
//                                     <svg width="100%" height="100%" viewBox="0 0 580 580">
//                                         <defs>
//                                             <linearGradient id="smoothBorder-2" x1="100%" y1="100%" x2="30%" y2="0%">
//                                                 <stop offset="0%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 <stop offset="70%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 <stop offset="65%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 <stop offset="77%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 <stop offset="100%" stopColor="#9ca3af" stopOpacity="0" />
//                                             </linearGradient>
//                                         </defs>
//                                         <circle
//                                             cx="290"
//                                             cy="290"
//                                             r="289"
//                                             fill="none"
//                                             stroke="url(#smoothBorder-2)"
//                                             strokeWidth="2.5"
//                                             strokeLinecap="round"
//                                             strokeDasharray="5, 1"
//                                         />
//                                     </svg>
//                                 </div>

//                                 {/* Inner Circle */}
//                                 <div className="w-[14vw] h-[14vw] max-w-[180px] max-h-[180px] min-w-[120px] min-h-[120px] rounded-full flex flex-col items-center justify-center bg-[#0a0a0a] z-10 absolute">
//                                     <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
//                                         <svg width="100%" height="100%" viewBox="0 0 582 571">
//                                             <defs>
//                                                 <linearGradient id="smoothBorder-3" x1="0%" y1="0%" x2="0%" y2="0%">
//                                                     <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
//                                                     <stop offset="100%" stopColor="#9ca3af" stopOpacity="1" />
//                                                 </linearGradient>
//                                             </defs>
//                                             <circle
//                                                 cx="290"
//                                                 cy="290"
//                                                 r="289"
//                                                 fill="none"
//                                                 stroke="url(#smoothBorder-3)"
//                                                 strokeWidth="3.5"
//                                                 strokeLinecap="round"
//                                                 strokeDasharray="5, 1"
//                                             />
//                                         </svg>
//                                     </div>
                                
//                                     <h3 className="text-xs md:text-lg font-bold text-white text-center">MICROSOFT</h3>
//                                     <p className="text-xs md:text-md font-bold text-white text-center">ADF</p>
//                                     <p className="text-white text-xs md:text-sm mt-2 md:mt-5 text-center">Data Factory</p>
//                                     <p className="text-white text-xs md:text-sm text-center">& Analytics Platform</p>
//                                 </div>

//                                 {/* Three Sections in the Ring */}
//                                 <div className="absolute inset-0 flex items-center justify-center">
                                    
//                                     {/* Top Right Section */}
//                                     <div className="absolute top-0 right-0 w-1/2 h-1/2 flex items-end justify-start p-1 relative">
//                                         <div className="absolute left-[35%] -top-[45%] w-px h-full bg-gray-100 -rotate-15"
//                                             style={{
//                                                 mask: 'linear-gradient(to top, black 0%, transparent 100%)',
//                                                 padding: '1.1px',
//                                             }}>
//                                         </div>
                                        
//                                         <div className="absolute bottom-[25%] left-[42%] w-full h-px bg-gray-100"
//                                             style={{
//                                                 mask: 'linear-gradient(to right, black 10%, transparent 100%)',
//                                                 padding: '1.1px',
//                                             }}>
//                                         </div>
//                                     </div>

//                                     <div className="absolute max-md:bottom-[30%] bottom-[25%] -right-[5%] md:-right-[11%] w-1/2 h-1/2 flex items-start justify-start p-2 md:p-4"> 
//                                         <div className="text-center rounded-lg p-2 md:p-3 transition-all cursor-pointer group ml-1 md:ml-2 -mt-8 md:-mt-10">
//                                             <h4 className="text-white text-xs md:text-lg font-medium">Microsoft</h4>
//                                             <h4 className="text-white text-xs md:text-md font-medium">Fabric DW</h4>
//                                             <p className="text-white text-xs md:text-sm">Data warehouse</p>
//                                             <p className="text-white text-xs md:text-sm">& analytics</p>
//                                         </div>  
//                                     </div>

//                                     <div className="absolute top-[5%] left-0 w-full h-full pointer-events-none">
//                                         <div className="absolute bottom-1/3 left-1/3 w-[45%] h-px transform -rotate-45 -translate-x-2/4 translate-y-1/2"
//                                             style={{
//                                                 background: 'linear-gradient(to right, rgba(156, 163, 175, 1) 5%, rgba(156, 163, 175, 0) 55%)',
//                                                 padding: '.9px',
//                                             }}>
//                                         </div>
//                                     </div>

//                                     {/* Bottom Right Section */}
//                                     <div className="absolute -bottom-[1%] md:-bottom-[15%] right-[20%] md:right-[18%] w-1/2 h-1/2 flex items-start justify-start p-1">
//                                         <div className="text-center rounded-lg transition-all cursor-pointer group ml-[55%] md:ml-[23%] mt-[35%] md:mt-[17%]">
//                                             <h4 className="max-md:hidden text-white text-xs md:text-lg font-medium">Reporting</h4>
//                                             <h4 className="md:hidden text-white text-xs md:text-md font-medium">Reporting & Services</h4>
                                        
//                                             <p className="max-md:hidden text-white text-xs md:text-md">Services</p>
//                                             <p className="text-white text-xs md:text-sm">Advanced reporting</p>
//                                             <p className="max-md:hidden text-white text-xs md:text-sm">and dashboards</p>
//                                         </div>
//                                     </div>

//                                     {/* Left Side Section */}
//                                     <div className="absolute -left-[3%] md:-left-[12%] w-1/2 h-full flex items-center justify-end p-1 md:p-2">
//                                         <div className="text-center rounded-lg p-2 md:p-3 transition-all cursor-pointer group mr-[30%] md:mr-[15%]">
//                                             <h4 className="text-white text-sm md:text-lg font-medium">Microsoft BI</h4>
//                                             <p className="text-white text-xs md:text-md">Business</p>
//                                             <p className='text-white text-xs md:text-sm'>intelligence</p>
//                                             <p className='text-white text-xs md:text-sm'>platform</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div> {/* End of zoom-proof-container - THIS WAS MISSING */}



//             {/* Phase Details Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black flex items-start mt-32 justify-center z-50 ">
//                     <div className="bg-[#0a0a0a] overflow-y-scrollbar rounded-lg shadow-2xl max-w-2xl w-full min-h-[82vh] overflow-hidden border-[0.5px] border-taupe">
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
//                         <div className="p-6 overflow-y-auto max-h-[80vh] ">
//                             {phasesLoading ? (
//                                 <div className="flex justify-center py-8">
//                                     {/* <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div> */}
//                                 </div>
//                             ) : selectedAppPhases.length > 0 ? (
//                                 <div className="space-y-6">
//                                     {/* from [#171717] */}
//                                     <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
//                                         {selectedAppPhases.map((phase, index) => (
//                                             <div 
//                                                 key={phase._id || index} 
//                                                 className="rounded-lg bg-gradient-to-l from-black via-black via-60% to-[rgb(124,111,99)] p-3 items-center transition-all"
//                                             >
//                                                 <div className="flex items-center justify-center mb-1">
//                                                     <p className="text-lg font-semibold text-white">
//                                                         {phase.phaseName || phase.name}
//                                                     </p>
//                                                 </div>
//                                                 {phase.completionDate && (
//                                                     <p className="text-sm text-white mt-2 flex justify-center">
//                                                         <span className="font-medium">Completion : </span>
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
// import axios from "axios";
// import { toast } from "react-toastify";
// import { FiX } from "react-icons/fi";
// import { MdOutlineIntegrationInstructions } from "react-icons/md";
// import { TfiAngleRight } from "react-icons/tfi";

// const Homeboard = () => {
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     axios.defaults.baseURL = backendUrl;
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

//     // Fetch phases
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

//     const handleAppClick = async (app) => {
//         setSelectedApp(app);
//         setIsModalOpen(true);
//         await fetchPhases(app._id);
//     };

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
//         <div className="min-h-screen bg-[#0a0a0a] w-full overflow-x-hidden">
//             {/* Header */}
//             <div className="mb-4 md:mb-8">
//                 <div className="w-full px-4">
//                     <div className="flex flex-col items-center justify-center text-center py-4 md:py-8">
//                         <img
//                             src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
//                             alt="Logo"
//                             className="h-16 md:h-24 w-auto invert mb-2 md:mb-4"
//                         />
//                         <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
//                             IT SYSTEM LANDSCAPE
//                         </h1>
//                         <p className="text-gray-300 text-sm md:text-base">
//                             System Architecture Diagram
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Layout - Using responsive units */}
//             <div className="w-full max-w-7xl mx-auto px-4">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-5 items-center justify-center">
                    
//                     {/* INTEGRATION Column */}
//                     <div className="flex justify-center">
//                         <div className="relative w-full max-w-md aspect-square">
//                             {/* Responsive circle */}
//                             <div className="absolute inset-0 rounded-full border-2 border-gray-600/30 flex flex-col items-center justify-center p-8">
//                                 <h3 className="text-xl md:text-2xl font-bold text-white mb-4">INTEGRATION</h3>
//                                 <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center mx-auto mb-4 bg-gray-900">
//                                     <MdOutlineIntegrationInstructions className="w-10 h-10 md:w-12 md:h-12 text-gray-400" />
//                                 </div>
//                                 <p className="text-white text-base md:text-lg">Microsoft Logic Apps</p>
//                                 <p className="text-gray-300 text-sm md:text-base">Workflow & Automation Services</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* APPLICATIONS Column */}
//                     <div className="flex justify-center lg:scale-110">
//                         <div className="relative w-full max-w-lg aspect-square">
//                             <div className="absolute inset-0 rounded-full border-2 border-gray-600/30 flex flex-col items-center justify-center p-8">
//                                 <div className="text-center mb-8">
//                                     <h3 className="text-xl md:text-2xl font-bold text-white mb-2">APPLICATIONS</h3>
//                                     <p className="text-gray-300 text-sm md:text-base">Click to view implementation phases</p>
//                                 </div>
                                
//                                 <div className="grid grid-cols-2 gap-3 w-full px-8">
//                                     {applications.map((app) => (
//                                         <div
//                                             key={app._id}
//                                             onClick={() => handleAppClick(app)}
//                                             className="rounded-xl p-3 text-center hover:bg-gray-900 transition-all cursor-pointer bg-gray-950/50 border border-gray-800"
//                                         >
//                                             <div className='flex items-center justify-between'>
//                                                 <h4 className="text-white text-sm font-medium truncate">
//                                                     {app.appName || app.name || app.applicationName}
//                                                 </h4>
//                                                 <TfiAngleRight className='text-gray-400 ml-2 w-4 h-4' />
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* ADF Column */}
//                     <div className="flex justify-center">
//                         <div className="relative w-full max-w-md aspect-square">
//                             <div className="absolute inset-0 rounded-full border-2 border-gray-600/30 flex items-center justify-center">
//                                 {/* Inner Circle */}
//                                 <div className="absolute w-1/2 h-1/2 rounded-full bg-gray-950 border border-gray-700 flex flex-col items-center justify-center">
//                                     <h3 className="text-lg font-bold text-white">MICROSOFT</h3>
//                                     <p className="text-lg font-bold text-white">ADF</p>
//                                     <p className="text-gray-300 text-sm mt-2">Data Factory</p>
//                                     <p className="text-gray-300 text-sm">& Analytics Platform</p>
//                                 </div>

//                                 {/* Three Sections */}
//                                 <div className="absolute top-4 right-8 text-right">
//                                     <h4 className="text-white text-sm font-medium">Microsoft</h4>
//                                     <h4 className="text-white text-sm font-medium">Fabric DW</h4>
//                                     <p className="text-gray-300 text-xs">Data warehouse</p>
//                                     <p className="text-gray-300 text-xs">& analytics</p>
//                                 </div>
                                
//                                 <div className="absolute bottom-8 right-12 text-right">
//                                     <h4 className="text-white text-sm font-medium">Reporting</h4>
//                                     <p className="text-gray-300 text-xs">Services</p>
//                                     <p className="text-gray-300 text-xs">Advanced reporting</p>
//                                     <p className="text-gray-300 text-xs">and dashboards</p>
//                                 </div>
                                
//                                 <div className="absolute left-8 text-left">
//                                     <h4 className="text-white text-sm font-medium">Microsoft BI</h4>
//                                     <p className="text-gray-300 text-xs">Business</p>
//                                     <p className="text-gray-300 text-xs">intelligence</p>
//                                     <p className="text-gray-300 text-xs">platform</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//                     <div className="bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
//                         <div className="p-6">
//                             <div className="flex justify-between items-center mb-6">
//                                 <h3 className="text-2xl font-bold text-white">
//                                     {selectedApp?.appName || selectedApp?.name}
//                                 </h3>
//                                 <button onClick={closeModal} className="p-2 hover:bg-gray-800 rounded-lg">
//                                     <FiX className="w-6 h-6 text-white" />
//                                 </button>
//                             </div>
                            
//                             <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
//                                 {phasesLoading ? (
//                                     <div className="flex justify-center py-8">
//                                         <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"></div>
//                                     </div>
//                                 ) : selectedAppPhases.length > 0 ? (
//                                     selectedAppPhases.map((phase, index) => (
//                                         <div key={phase._id || index} className="bg-gray-800 rounded-lg p-4">
//                                             <p className="text-white font-semibold">{phase.phaseName || phase.name}</p>
//                                             {phase.completionDate && (
//                                                 <p className="text-gray-300 text-sm mt-2">
//                                                     Completion: {new Date(phase.completionDate).toLocaleDateString()}
//                                                 </p>
//                                             )}
//                                             {phase.description && (
//                                                 <p className="text-gray-400 text-sm mt-2">{phase.description}</p>
//                                             )}
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="text-center py-8">
//                                         <p className="text-white text-lg">No phases configured</p>
//                                     </div>
//                                 )}
//                             </div>
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
// import { TfiAngleRight } from "react-icons/tfi";

// const useZoomProof = () => {
//   useEffect(() => {
//     const container = document.querySelector('.zoom-proof-container');
//     if (!container) return;
    
//     const handleZoom = () => {
//       const zoom = window.outerWidth / window.innerWidth;
      
//       if (zoom !== 1) {
//         // Apply inverse scaling
//         const scale = 1 / zoom;
//         container.style.transform = `scale(${scale})`;
//         container.style.transformOrigin = 'top center';
//         container.style.width = `${zoom * 100}%`;
        
//         // IMPORTANT: Prevent scaling of inline styles
//         const elementsWithInlineStyles = container.querySelectorAll('[style]');
//         elementsWithInlineStyles.forEach(el => {
//           // Remove any transform from child elements
//           if (el.style.transform && el.style.transform.includes('scale')) {
//             el.style.transform = 'none';
//           }
//         });
//       } else {
//         container.style.transform = 'none';
//         container.style.width = '100%';
//       }
      
//       // Force browser to recalculate
//       void container.offsetHeight;
//     };
    
//     handleZoom();
    
//     // Use a debounced resize handler
//     let timeoutId;
//     const handleResize = () => {
//       clearTimeout(timeoutId);
//       timeoutId = setTimeout(handleZoom, 100);
//     };
    
//     window.addEventListener('resize', handleResize);
    
//     return () => {
//       clearTimeout(timeoutId);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
// };

// const Homeboard = () => {
//     useZoomProof(); 
//     // At the top of your component
//     useEffect(() => {
//         // Prevent zoom via keyboard
//         const handleKeyDown = (e) => {
//             if ((e.ctrlKey || e.metaKey) &&
//                 (e.key === '+' || e.key === '-' || e.key === '0' || e.key === '=')) {
//                 e.preventDefault();
//                 alert('Zoom is disabled on this page to preserve the design layout.');
//             }
//         };

//         // Prevent zoom via mouse wheel
//         const handleWheel = (e) => {
//             if (e.ctrlKey) {
//                 e.preventDefault();
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         window.addEventListener('wheel', handleWheel, { passive: false });

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             window.removeEventListener('wheel', handleWheel);
//         };
//     }, []);
    
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     axios.defaults.baseURL = backendUrl;
//     const navigate = useNavigate();
//     const [applications, setApplications] = useState([]);
//     const [selectedApp, setSelectedApp] = useState(null);
//     const [selectedAppPhases, setSelectedAppPhases] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [phasesLoading, setPhasesLoading] = useState(false);

//     // Integration Services
//     const integrationServices = [
//         {
//             id: 1,
//             name: "Microsoft Logic Apps",
//             icon: MdOutlineIntegrationInstructions,
//             description: "Workflow automation and Integration"
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
//         console.log('✅ App clicked!', app.appName);
//         console.log('App ID:', app._id);

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
    
//         <div className="min-h-screen bg-[#0a0a0a] w-full overflow-x-hidden">
            
//             {/* ADD THIS CONTAINER - it's missing! */}
//             <div className="zoom-proof-container">
            
//             {/* Header */}
//             <div className="mb-1 md:mb-2">
//                 <div className="w-full px-2">
//                     <div className="flex flex-col items-center justify-center text-center py-1 md:py-2">
//                         {/* Logo */}
//                         <img
//                             src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"}
//                             alt="Logo"
//                             className="h-12 md:h-15 w-auto invert mb-0.5 md:mb-1"
//                         />
                        
//                         {/* Main Title */}
//                         <h1 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1">
//                             IT SYSTEM LANDSCAPE
//                         </h1>
                        
//                         {/* Subtitle */}
//                         <p className="text-white text-xs">
//                             System Architecture Diagram
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Architecture Layout */}
//             <div className="w-full max-w-[95vw] mx-auto p-0 m-0 overflow-hidden">
//                 {/* Three Column Layout - Zero gap, touch edges */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 p-0 m-0   items-center justify-center w-full min-h-[60vh]">
                    
//                     {/* INTEGRATION Column - Left Circle */}
//                     <div className="flex flex-col items-center justify-center p-0 m-0 md:-ml-3.5 relative">
//                         <div className="w-[32vw] h-[32vw] max-w-[380px] max-h-[380px] min-w-[280px] min-h-[280px] rounded-full flex flex-col items-center justify-center relative">
                            
//                             {/* SVG Border */}
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
//                                         strokeDasharray="5, 1"
//                                     />
//                                 </svg>
//                             </div>

//                             {/* Content */}
//                             <div className="text-center mb-2 md:mb-4 px-2">
//                                 <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">INTEGRATION</h3>
//                                 <div className="w-12 h-12 md:w-15 md:h-15 rounded-sm flex items-center justify-center mx-auto mb-2 md:mb-3 bg-[#1f1f1f]">
//                                     <MdOutlineIntegrationInstructions className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
//                                 </div>
//                                 <p className="text-white text-xs md:text-sm">Microsoft Logic Apps</p>
//                                 <p className="text-white text-xs md:text-sm">Workflow & Automation Services</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* APPLICATIONS Column - Center Circle */}
//                     <div className="flex flex-col items-center justify-center p-0 m-0 relative z-10 -mx-2 md:-mx-4 lg:-mx-8">
//                         <div className="w-[42vw] h-[42vw] max-w-[600px] max-h-[600px] min-w-[350px] min-h-[350px] rounded-full flex flex-col items-center justify-center relative">
                            
//                             {/* SVG Border */}
//                             <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
//                                 <svg width="100%" height="100%" viewBox="0 0 580 580">
//                                     <defs>
//                                         <linearGradient id="smoothBorder" x1="100%" y1="90%" x2="0%" y2="0%">
//                                             <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
//                                             <stop offset="70%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="75%" stopColor="#9ca3af" stopOpacity="1" />
//                                             <stop offset="90%" stopColor="#9ca3af" stopOpacity="1" />
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
//                                         strokeDasharray="5, 1"
//                                     />
//                                 </svg>
//                             </div>
                            
//                             {/* Column Header */}
//                             <div className="text-center mb-4 md:mb-6 md:-mt-20 -mt-5 px-4">
//                                 <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-1">APPLICATIONS</h3>
//                                 <p className="text-white text-sm md:text-base">Click to view implementation phases</p>
//                             </div>
                            
//                             {/* Applications Grid */}
//                             <div className="grid grid-cols-2 md:grid-cols-2 md:mt-5 gap-2 md:gap-3 w-full px-15 px-1 md:px-25 px-1">
//                             {/* <div className="grid grid-cols-2 md:grid-cols-3 md:mt-5 gap-2 md:gap-3 w-full px-15 px-1 md:px-10 px-1"> */}
//                                 {applications.map((app) => (
//                                     <div
//                                         key={app._id}
//                                         onClick={() => handleAppClick(app)}
//                                         className="rounded-full p-2 md:p-3 text-center hover:text-white transition-all cursor-pointer group bg-gradient-to-r from-[#171717] to-black"
//                                     >
//                                         <div className='flex items-center justify-between cursor-pointer max-md:flex-row max-md:gap-5'>
//                                             <h4 className="text-white text-sm md:text-base font-medium group-hover:text-white truncate
//                                             max-md:text-xs 
//                                             "
//                                                 onClick={() => handleAppClick(app)}
//                                             >
//                                                 {app.appName || app.name || app.applicationName}
//                                             </h4>
//                                             <TfiAngleRight className='inline text-gray-200  md:ml-2 flex cursor-pointer w-3 h-3 w-4  h-4' />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     {/* ADF Column - Right Circle */}
//                     <div className="flex flex-col items-center justify-center p-0 m-0 md:-mr-3.5 relative">
//                         <div className="w-[32vw] h-[32vw] max-w-[380px] max-h-[380px] min-w-[280px] min-h-[280px] rounded-full flex items-center justify-center relative">
                            
//                             {/* SVG Border */}
//                             <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
//                                 <svg width="100%" height="100%" viewBox="0 0 580 580">
//                                     <defs>
//                                         <linearGradient id="smoothBorder-2" x1="100%" y1="100%" x2="30%" y2="0%">
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
//                                         stroke="url(#smoothBorder-2)"
//                                         strokeWidth="2.5"
//                                         strokeLinecap="round"
//                                         strokeDasharray="5, 1"
//                                     />
//                                 </svg>
//                             </div>

//                             {/* Inner Circle */}
//                             <div className="w-[14vw] h-[14vw] max-w-[180px] max-h-[180px] min-w-[120px] min-h-[120px] rounded-full flex flex-col items-center justify-center bg-[#0a0a0a] z-10 absolute">
//                                 <div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
//                                     <svg width="100%" height="100%" viewBox="0 0 582 571">
//                                         <defs>
//                                             <linearGradient id="smoothBorder-3" x1="0%" y1="0%" x2="0%" y2="0%">
//                                                 <stop offset="0%" stopColor="#9ca3af" stopOpacity="0" />
//                                                 <stop offset="100%" stopColor="#9ca3af" stopOpacity="1" />
//                                             </linearGradient>
//                                         </defs>
//                                         <circle
//                                             cx="290"
//                                             cy="290"
//                                             r="289"
//                                             fill="none"
//                                             stroke="url(#smoothBorder-3)"
//                                             strokeWidth="3.5"
//                                             strokeLinecap="round"
//                                             strokeDasharray="5, 1"
//                                         />
//                                     </svg>
//                                 </div>
                              
//                                 <h3 className="text-xs md:text-lg font-bold text-white text-center">MICROSOFT</h3>
//                                 <p className="text-xs md:text-md font-bold text-white text-center">ADF</p>
//                                 <p className="text-white text-xs md:text-sm mt-2 md:mt-5 text-center">Data Factory</p>
//                                 <p className="text-white text-xs md:text-sm text-center">& Analytics Platform</p>
//                             </div>

//                             {/* Three Sections in the Ring */}
//                             <div className="absolute inset-0 flex items-center justify-center">
                                
//                                 {/* Top Right Section */}
//                                 <div className="absolute top-0 right-0 w-1/2 h-1/2 flex items-end justify-start p-1 relative">
//                                     <div className="absolute left-[35%] -top-[45%] w-px h-full bg-gray-100 -rotate-15"
//                                         style={{
//                                             mask: 'linear-gradient(to top, black 0%, transparent 100%)',
//                                             padding: '1.1px',
//                                         }}>
//                                     </div>
                                    
//                                     <div className="absolute bottom-[25%] left-[42%] w-full h-px bg-gray-100"
//                                         style={{
//                                             mask: 'linear-gradient(to right, black 10%, transparent 100%)',
//                                             padding: '1.1px',
//                                         }}>
//                                     </div>
//                                 </div>

//                                 <div className="absolute max-md:bottom-[30%] bottom-[25%] -right-[5%] md:-right-[11%] w-1/2 h-1/2 flex items-start justify-start p-2 md:p-4"> 
//                                     <div className="text-center rounded-lg p-2 md:p-3 transition-all cursor-pointer group ml-1 md:ml-2 -mt-8 md:-mt-10">
//                                         <h4 className="text-white text-xs md:text-lg font-medium">Microsoft</h4>
//                                         <h4 className="text-white text-xs md:text-md font-medium">Fabric DW</h4>
//                                         <p className="text-white text-xs md:text-sm">Data warehouse</p>
//                                         <p className="text-white text-xs md:text-sm">& analytics</p>
//                                     </div>  
//                                 </div>

//                                 <div className="absolute top-[5%] left-0 w-full h-full pointer-events-none">
//                                     <div className="absolute bottom-1/3 left-1/3 w-[45%] h-px transform -rotate-45 -translate-x-2/4 translate-y-1/2"
//                                         style={{
//                                             background: 'linear-gradient(to right, rgba(156, 163, 175, 1) 5%, rgba(156, 163, 175, 0) 55%)',
//                                             padding: '.9px',
//                                         }}>
//                                     </div>
//                                 </div>

//                                 {/* Bottom Right Section */}
//                                 <div className="absolute -bottom-[1%] md:-bottom-[15%] right-[20%] md:right-[18%] w-1/2 h-1/2 flex items-start justify-start p-1">
//                                     <div className="text-center rounded-lg  transition-all cursor-pointer group ml-[55%] md:ml-[23%] mt-[35%] md:mt-[17%]">
//                                         <h4 className="max-md:hidden text-white text-xs md:text-lg font-medium ">Reporting</h4>
//                                         <h4 className="md:hidden text-white text-xs md:text-md font-medium ">Reporting & Services</h4>
                                       
//                                         <p className="max-md:hidden text-white text-xs md:text-md">Services</p>
//                                         <p className="text-white text-xs md:text-sm ">Advanced reporting</p>
//                                         <p className="max-md:hidden text-white text-xs md:text-sm ">and dashboards</p>
//                                     </div>
//                                 </div>

//                                 {/* Left Side Section */}
//                                 <div className="absolute -left-[3%] md:-left-[12%] w-1/2 h-full flex items-center justify-end p-1 md:p-2">
//                                     <div className="text-center rounded-lg p-2 md:p-3 transition-all cursor-pointer group mr-[30%] md:mr-[15%]">
//                                         <h4 className="text-white text-sm md:text-lg font-medium ">Microsoft BI</h4>
//                                         <p className="text-white text-xs md:text-md ">Business</p>
//                                         <p className='text-white text-xs md:text-sm '>intelligence</p>
//                                         <p className='text-white text-xs md:text-sm '>platform</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             </div> {/* End of zoom-proof-container */}


//             {/* Phase Details Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black flex items-start mt-32 justify-center z-50 ">
//                     <div className="bg-[#0a0a0a] overflow-y-scrollbar rounded-lg shadow-2xl max-w-2xl w-full min-h-[82vh] overflow-hidden border-[0.5px] border-gray-100">
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
//                         <div className="p-6 overflow-y-auto max-h-[80vh] ">
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
//                                                 className="rounded-lg bg-gradient-to-r from-[#171717] to-black p-3 items-center transition-all"
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

