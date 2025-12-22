import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineLogout, AiOutlineAppstore, AiOutlineCloudServer } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import {  FiLink, FiDatabase, FiBarChart, FiActivity } from "react-icons/fi";
import BottomNav from "../components/shared/BottomNav";


const Dashboard = () => {
    const { logout, user } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [connectedServices, setConnectedServices] = useState({});
    const [phases, setPhases] = useState({});
    const [loading, setLoading] = useState(true);
    const [servicesLoading, setServicesLoading] = useState({});
    const [phasesLoading, setPhasesLoading] = useState({});

    // Fetch applications
    const fetchApps = async () => {
        try {
            const { data } = await axios.get('/v1/api/app');
            if (data.success) {
                setApplications(data.applications);
                // Automatically load services for all applications
                data.applications.forEach(app => {
                    fetchConnectedServices(app._id);
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch connected services for an application
    const fetchConnectedServices = async (applicationId) => {
        if (!applicationId) return;

        setServicesLoading(prev => ({ ...prev, [applicationId]: true }));
        try {
            const { data } = await axios.get(`/v1/api/connected-services/${applicationId}`);
            
            if (data.success || data.sucess) {
                const services = data.services || data.connectedServices || [];
                setConnectedServices(prev => ({
                    ...prev,
                    [applicationId]: services
                }));
            } else {
                toast.error(data.message);
                setConnectedServices(prev => ({
                    ...prev,
                    [applicationId]: []
                }));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            setConnectedServices(prev => ({
                ...prev,
                [applicationId]: []
            }));
        } finally {
            setServicesLoading(prev => ({ ...prev, [applicationId]: false }));
        }
    };

    

    // Fetch phases for a specific application
    const fetchPhases = async (applicationId) => {
        if (!applicationId) return;
        
        setPhasesLoading(prev => ({ ...prev, [applicationId]: true }));
        try {
            const { data } = await axios.get(`/v1/api/app/${applicationId}/phases`);
            if (data.success) {
                setPhases(prev => ({
                    ...prev,
                    [applicationId]: data.phases
                }));
            } else {
                toast.error(data.message);
                setPhases(prev => ({
                    ...prev,
                    [applicationId]: []
                }));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            setPhases(prev => ({
                ...prev,
                [applicationId]: []
            }));
        } finally {
            setPhasesLoading(prev => ({ ...prev, [applicationId]: false }));
        }
    };

    // Toggle phases visibility
    const togglePhases = (appId) => {
        if (!phases[appId] && !phasesLoading[appId]) {
            fetchPhases(appId);
        } else {
            // If phases already loaded, just toggle visibility by setting to empty array
            setPhases(prev => ({
                ...prev,
                [appId]: phases[appId] ? null : prev[appId]
            }));
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    const getServiceCount = (appId) => {
        return connectedServices[appId] ? connectedServices[appId].length : 0;
    };

    const getPhaseCount = (appId) => {
        return phases[appId] ? phases[appId].length : 0;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    };




    // Helper function to map service name to service type
    const mapServiceNameToType = (serviceName) => {
        if (!serviceName) return 'custom';
        const name = serviceName.toLowerCase();
        if (name.includes('logic apps')) return 'logic-apps';
        if (name.includes('fabric')) return 'fabric-dw';
        if (name.includes('bi') || name.includes('reporting')) return 'power-bi';
        if (name.includes('azure')) return 'azure-sql';
        return 'custom';
    };

     // Service type configurations - simplified to match your schema
    const serviceTypes = [
        { value: 'logic-apps', label: 'Microsoft Logic Apps', icon: FiActivity, color: 'blue' },
        { value: 'fabric-dw', label: 'Microsoft Fabric DW', icon: FiDatabase, color: 'purple' },
        { value: 'power-bi', label: 'Microsoft Power BI', icon: FiBarChart, color: 'yellow' },
        { value: 'reporting', label: 'Microsoft Reporting', icon: FiBarChart, color: 'green' },
        { value: 'azure-sql', label: 'Azure SQL', icon: FiDatabase, color: 'blue' },
        { value: 'api', label: 'Custom API', icon: FiLink, color: 'gray' },
        { value: 'custom', label: 'Custom Service', icon: FiLink, color: 'gray' }
    ];

    // Get service type info
    const getServiceTypeInfo = (serviceType) => {
        return serviceTypes.find(st => st.value === serviceType) || serviceTypes[0];
    };
       const getServiceColorClasses = (color) => {
        const colorMap = {
            blue: 'bg-blue-50 border-blue-200 text-blue-700',
            purple: 'bg-purple-50 border-purple-200 text-purple-700',
            yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
            green: 'bg-green-50 border-green-200 text-green-700',
            gray: 'bg-gray-50 border-gray-200 text-gray-700'
        };
        return colorMap[color] || colorMap.gray;
    };


    return (
        <div className ='pb-10'>
            {/* Keep the original header */}
            <div className='py-2 px-4 flex justify-between border-b-2 border-gray-300 bg-linear-65 from-gray-300 to-white '>
                <img 
                    src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOrz0Arj9RjXHmoUKDyA4pcMs0bTvPBrwkxq1G"} 
                    alt="Logo"
                    className='w-[120px] max-sm:w-[100px] cursor-pointer' 
                />

                <div className='flex items-center gap-6'>
                    <button
                        onClick={() => {
                            if (user) {
                                logout();
                            } 
                        }}
                        className={`cursor-pointer px-2 py-2 transition-all rounded-lg ${
                            user ? 'text-gray-700' : 'text-primary'
                        }`}
                    >
                        {user ? 'Logout' : 'Login'}
                        {user ? 
                            <AiOutlineLogout className='inline ml-1 text-[#be3e3f] w-5 h-5' /> : 
                            <IoMdLogIn className='inline ml-1 w-5 h-5' />
                        }
                    </button>
                    {/* <p>{user.fullName}</p> */}
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="min-h-screen bg-gray-50 p-2">
                {/* Stats Overview */}
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <AiOutlineAppstore className="text-blue-600" size={24} />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                                <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <AiOutlineCloudServer className="text-green-600" size={24} />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Services</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {applications.reduce((acc, app) => acc + getServiceCount(app._id), 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <AiOutlineAppstore className="text-purple-600" size={24} />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Phases</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {applications.reduce((acc, app) => acc + getPhaseCount(app._id), 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Applications List */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-3 shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-900">Applications Overview</h2>
                    </div>
                    
                    <div className="divide-y-red-500">
                        {applications.map((app) => (
                            <div key={app._id} className="p-3">
                                {/* Application Header */}
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            {app.appName || app.name || app.applicationName}
                                        </h3>
                                        {/* <p className="text-sm text-gray-500 mt-1">
                                            ID: {app._id}
                                        </p> */}
                                    </div>
                                    
                                    {/* <button 
                                        onClick={() => togglePhases(app._id)}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer transition-colors"
                                    >
                                        {phases[app._id] ? 'Hide Phases' : 'View Phases'}
                                    </button> */}

                                    <button
                                        onClick={() => togglePhases(app._id)}
                                        className={`px-4 py-2 rounded-lg  cursor-pointer transition-colors max-md:text-sm ${phases[app._id]
                                                ? 'bg-red-100 text-[#be3e3f] hover:bg-gray-400 hover:text-white'  // Hide Phases style
                                                : 'bg-gray-500 text-white hover:bg-gray-600'  // View Phases style
                                            }`}
                                    >
                                        {phases[app._id] ? 'Hide Phases' : 'View Phases'}
                                    </button>
                                </div>

                                {/* Services Section - Always visible */}
                                <div className="mb-1">
                                    {/* <h4 className="font-medium text-gray-900 mb-3">
                                        Connected Services ({getServiceCount(app._id)})
                                    </h4> */}
                                    {servicesLoading[app._id] ? (
                                        <div className="flex justify-center py-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-200"></div>
                                        </div>
                                    ) : connectedServices[app._id] && connectedServices[app._id].length > 0 ? (
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                           
                                            {/* {connectedServices[app._id].map((service, index) => (
                                                <div key={service._id || index} className="bg-gray-100 p-3 rounded-lg border border-gray-100">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {service.serviceName || service.name}
                                                    </p>
                                                </div>
                                            ))} */}

                                             {connectedServices[app._id].map((service, index) => {
                                                // Map service name to type since your schema doesn't have serviceType
                                                const serviceType = mapServiceNameToType(service.serviceName);
                                                const serviceInfo = getServiceTypeInfo(serviceType);
                                                const IconComponent = serviceInfo.icon;
                                                const colorClasses = getServiceColorClasses(serviceInfo.color);
                                                
                                                return (
                                                    <div 
                                                        key={service._id || index} 
                                                        className={`p-3 rounded-lg border ${colorClasses} flex items-center space-x-3`}
                                                    >
                                                        <IconComponent className="flex-shrink-0" size={18} />
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-medium truncate">
                                                                {service.serviceName || service.name}
                                                            </p>
                                                            <p className="text-xs opacity-75 truncate">
                                                                {serviceInfo.label}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500 italic">No services connected</p>
                                    )}
                                </div>
                                <hr className ='text-gray-200'/>

                                {/* Phases Section - Visible when toggled */}
                                {phasesLoading[app._id] ? (
                                    <div className="flex justify-center py-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                                    </div>
                                ) : phases[app._id] && phases[app._id].length > 0 ? (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <h4 className="font-medium text-gray-900 mb-3">
                                            Phases ({phases[app._id].length})
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                                            {phases[app._id].map((phase, index) => (
                                                <div key={phase._id || index} className="bg-white p-3 rounded-lg border">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {phase.phaseName || phase.name}
                                                    </p>
                                                    {phase.completionDate && (
                                                       
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            <span>Completion Date : {new Date(phase.completionDate).toLocaleDateString('en-GB')}</span>
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : phases[app._id] ? (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-500 italic">No phases found</p>
                                    </div>
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {applications.length === 0 && (
                    <div className="text-center py-12">
                        <AiOutlineAppstore className="mx-auto text-gray-400" size={48} />
                        <h3 className="mt-4 text-lg font-medium text-gray-900">No applications found</h3>
                        <p className="mt-2 text-gray-500">Get started by creating your first application.</p>
                    </div>
                )}
            </div>

            <BottomNav />
        </div>
    );
};

export default Dashboard;