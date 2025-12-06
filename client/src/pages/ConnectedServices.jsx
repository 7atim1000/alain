import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-hot-toast';
import { FiPlus, FiEdit, FiTrash2, FiLink, FiDatabase, FiBarChart, FiActivity } from "react-icons/fi";
import BottomNav from "../components/shared/BottomNav";

const ConnectedServices = () => {
    const { axios } = useContext(AuthContext);

    const [apps, setApps] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [connectedServices, setConnectedServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [newService, setNewService] = useState({
        serviceName: ''
    });

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

    // Fetch all applications
    const fetchApps = async () => {
        try {
            const { data } = await axios.get('/v1/api/app');
            if (data.success) {
                setApps(data.applications);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Fetch connected services for a specific application - SIMPLIFIED
    const fetchConnectedServices = async (applicationId) => {
        if (!applicationId) return;

        setLoading(true);
        try {
            // Use the correct endpoint for your connected services
            const { data } = await axios.get(`/v1/api/connected-services/${applicationId}`);
            console.log('API Response:', data);
            
            // Handle both "success" and "sucess" spelling from your API
            if (data.success || data.sucess) {
                const services = data.services || [];
                setConnectedServices(services);
                setSelectedApp(applicationId);
                console.log('Loaded services:', services);
            } else {
                toast.error(data.message);
                setConnectedServices([]);
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            toast.error(error.response?.data?.message || error.message);
            setConnectedServices([]);
        } finally {
            setLoading(false);
        }
    };

    // Add new service connection - SIMPLIFIED
    const addServiceConnection = async (e) => {
        e.preventDefault();
        if (!selectedApp) return;

        try {
            const { data } = await axios.post('/v1/api/connected-services', {
                applicationId: selectedApp,
                serviceName: newService.serviceName
            });

            if (data.success || data.sucess) {
                toast.success('Service connection added successfully');
                setShowAddServiceModal(false);
                setNewService({ serviceName: '' });
                // Refresh services list
                fetchConnectedServices(selectedApp);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Update service connection - SIMPLIFIED
    const updateServiceConnection = async (e) => {
        e.preventDefault();
        if (!editingService) return;

        try {
            const { data } = await axios.put(`/v1/api/connected-services/`, {
                serviceId: editingService._id, // Add this line
                applicationId: editingService.applicationId,
                serviceName: editingService.serviceName
            });

            if (data.success || data.sucess) {
                toast.success('Service connection updated successfully');
                setEditingService(null);
                fetchConnectedServices(selectedApp);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Delete service connection
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const deleteServiceConnection = async (connectionId, serviceName) => {
        // if (!window.confirm(`Are you sure you want to delete "${serviceName}"?`)) {
        //     return;
        // }

        try {
            const { data } = await axios.delete(`/v1/api/connected-services/${connectionId}`);
            if (data.success || data.sucess) {
                toast.success('Service connection deleted successfully');
                // Refresh services list
                fetchConnectedServices(selectedApp);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Handle application selection
    const handleAppClick = (appId) => {
        fetchConnectedServices(appId);
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

    // Get service type info
    const getServiceTypeInfo = (serviceType) => {
        return serviceTypes.find(st => st.value === serviceType) || serviceTypes[0];
    };

    useEffect(() => {
        fetchApps();
    }, []);

    return (
        <div className="p-6 pb-20">
            <div className ='px-1 shadow-lg'>
                <h1 className="text-2xl max-md:text-xl font-bold mb-3">Connected Services</h1>
            </div>
            
            {/* Applications List */}
            <div className="mb-8">
                <h2 className="text-xl max-md:text-lg font-semibold mb-4 text-gray-500">Applications</h2>
                <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-4">
                    {apps.map((app) => (
                        <div
                            key={app._id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                                selectedApp === app._id 
                                    ? 'bg-gray-200 border-gray-400' 
                                    : 'bg-white border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => handleAppClick(app._id)}
                        >
                            <h3 className="font-semibold text-md max-md:text-sm">{app.appName}</h3>
                            {/* <p className="text-sm text-gray-600">
                                {app.serviceConnections?.length || 0} connected services
                            </p> */}
                        </div>
                    ))}
                </div>
            </div>



            {/* Connected Services List */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl max-md:text-sm text-gray-500 font-semibold">
                        Connected Services {selectedApp && `- ${apps.find(app => app._id === selectedApp)?.appName}`}
                    </h2>
                    <div className="flex gap-2">
                        {loading && <span className="text-blue-500">Loading...</span>}
                        {selectedApp && (
                            <button
                                onClick={() => setShowAddServiceModal(true)}
                                className="flex items-center gap-2 max-md:text-sm bg-green-500 text-white max-md:px-2 px-4 py-2 rounded-lg hover:bg-green-600 transition-colors cursor-pointer"
                            >
                                <FiPlus size={16} className ='text-white font-bold' />
                                Connect Service
                            </button>
                        )}
                    </div>
                </div>

                {selectedApp ? (
                    connectedServices.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {connectedServices.map((service) => {
                                // Map service name to type since your schema doesn't have serviceType
                                const serviceType = mapServiceNameToType(service.serviceName);
                                const serviceInfo = getServiceTypeInfo(serviceType);
                                const IconComponent = serviceInfo.icon;
                                
                                return (
                                    <div
                                        key={service._id}
                                        className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm relative"
                                    >
                                        {/* Service Icon and Header */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-3 rounded-full ${
                                                serviceInfo.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                                serviceInfo.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                                serviceInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                                                serviceInfo.color === 'green' ? 'bg-green-100 text-green-600' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                                <IconComponent size={24} />
                                            </div>

                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{service.serviceName}</h3>
                                                <p className="text-sm text-gray-600">{serviceInfo.label}</p>
                                            </div>
                                        </div>

                                        {/* Service Details - SIMPLIFIED for basic schema */}
                                        <div className="space-y-3 text-sm">
                                            {/* <div className="flex justify-between items-center">
                                                <span className="font-medium">Application ID:</span>
                                                <span className="text-gray-600 text-xs">
                                                    {service.applicationId}
                                                </span>
                                            </div> */}
                                            
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">Created:</span>
                                                <span className="text-gray-600">
                                                    {service.createdAt ? new Date(service.createdAt).toLocaleDateString() : 'Unknown'}
                                                </span>
                                            </div>
                                            
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">Last Updated:</span>
                                                <span className="text-gray-600">
                                                    {service.updatedAt ? new Date(service.updatedAt).toLocaleDateString() : 'Unknown'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons - SIMPLIFIED */}
                                        <div className="flex justify-end items-center mt-6 pt-4 border-t border-gray-200">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditingService(service)}
                                                    className="cursor-pointer p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                                                    title="Edit Service"
                                                >
                                                    <FiEdit size={14} />
                                                </button>
                                                <button
                                                    // onClick={() => deleteServiceConnection(service._id, service.serviceName)}
                                                    onClick ={()=> {setSelectedService(service); setDeleteModalOpen(true)}}
                                                    className="cursor-pointer p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                                    title="Delete Service"
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        !loading && (
                            <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                                <FiLink className="mx-auto text-gray-400 mb-4" size={48} />
                                <p className="text-gray-500 text-lg mb-2">No connected services</p>
                                <p className="text-gray-400 mb-4">Connect your first service to get started</p>
                                <button
                                    onClick={() => setShowAddServiceModal(true)}
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Connect Service
                                </button>
                            </div>
                        )
                    )
                ) : (
                    <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                        <FiDatabase className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-gray-500">Select an application to view connected services</p>
                    </div>
                )}
            </div>

            {/* Add Service Connection Modal - SIMPLIFIED */}
            {showAddServiceModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
                 style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
                   
                   
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Connect New Service</h3>
                        <form onSubmit={addServiceConnection}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Service Name</label>
                                    <input
                                        type="text"
                                        value={newService.serviceName}
                                        onChange={(e) => setNewService({serviceName: e.target.value})}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter service name (e.g., Microsoft Logic Apps)"
                                        required
                                    />
                                </div>
                                <p className="text-sm text-gray-500">
                                    This will create a basic service connection with the application.
                                </p>
                            </div>

                            <div className="flex gap-2 mt-6">
                                <button
                                    type="submit"
                                    className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
                                >
                                    Connect Service
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddServiceModal(false)}
                                    className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Service Connection Modal - SIMPLIFIED */}
            {editingService && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" 
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>

                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Edit Service Connection</h3>
                        <form onSubmit={updateServiceConnection}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Service Name</label>
                                    <input
                                        type="text"
                                        value={editingService.serviceName}
                                        onChange={(e) => setEditingService({...editingService, serviceName: e.target.value})}
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 mt-6">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Update Service
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingService(null)}
                                    className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* deleteServiceConnection */}
            <ConfirmModal
                open= {deleteModalOpen}
                serviceName= {selectedService?.serviceName}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    deleteServiceConnection(selectedService._id);
                    setDeleteModalOpen(false);
                }}
            />

            <BottomNav />

        </div>
    );
};

const ConfirmModal = ({ open, onClose, onConfirm, serviceName }) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
        >

            <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
                {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
                <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-red-600">{serviceName}</span>?</p>
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


export default ConnectedServices;

// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { toast } from 'react-hot-toast';
// import { FiPlus, FiEdit, FiTrash2, FiPlay, FiRefreshCw, FiLink, FiDatabase, FiBarChart, FiActivity } from "react-icons/fi";

// const ConnectedServices = () => {
//     const { axios } = useContext(AuthContext);

//     const [apps, setApps] = useState([]);
//     const [selectedApp, setSelectedApp] = useState(null);
//     const [connectedServices, setConnectedServices] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [testingConnection, setTestingConnection] = useState(null);
//     const [syncingConnection, setSyncingConnection] = useState(null);
//     const [showAddServiceModal, setShowAddServiceModal] = useState(false);
//     const [editingService, setEditingService] = useState(null);
//     const [newService, setNewService] = useState({
//         serviceType: 'logic-apps',
//         serviceName: '',
     
//         configuration: {
//             endpoint: '',
//             apiKey: '',
//             settings: {}
//         },
//         metadata: {
//             description: '',
//             version: '',
//             supportedOperations: []
//         }
//     });

//     // Service type configurations
//     const serviceTypes = [
//         { value: 'logic-apps', label: 'Microsoft Logic Apps', icon: FiActivity, color: 'blue' },
//         { value: 'fabric-dw', label: 'Microsoft Fabric DW', icon: FiDatabase, color: 'purple' },
//         { value: 'power-bi', label: 'Microsoft Power BI', icon: FiBarChart, color: 'yellow' },
//         { value: 'reporting', label: 'Microsoft Reporting', icon: FiBarChart, color: 'green' },
//         { value: 'azure-sql', label: 'Azure SQL', icon: FiDatabase, color: 'blue' },
//         { value: 'api', label: 'Custom API', icon: FiLink, color: 'gray' },
//         { value: 'custom', label: 'Custom Service', icon: FiLink, color: 'gray' }
//     ];


//     // Fetch all applications
//     const fetchApps = async () => {
//         try {
//             const { data } = await axios.get('/v1/api/app');
//             if (data.success) {
//                 setApps(data.applications);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     // Fetch connected services for a specific application
//     const fetchConnectedServices = async (applicationId) => {
//     if (!applicationId) return;

//     setLoading(true);
//     try {
//         const { data } = await axios.get(`/v1/api/app/${applicationId}`);
//         console.log('API Response:', data); // Debug log
        
//         if (data.success) {
//             // Ensure serviceConnections is always an array
//             const services = data.application?.serviceConnections || [];
//             setConnectedServices(services);
//             setSelectedApp(applicationId);
//             console.log('Loaded services:', services); // Debug log
//         } else {
//             toast.error(data.message);
//             setConnectedServices([]); // Reset to empty array on error
//         }
//     } catch (error) {
//         console.error('Error fetching services:', error);
//         toast.error(error.response?.data?.message || error.message);
//         setConnectedServices([]); // Reset to empty array on error
//     } finally {
//         setLoading(false);
//     }
// };

//     // Add new service connection
//     const addServiceConnection = async (e) => {
//         e.preventDefault();
//         if (!selectedApp) return;

//         try {
//             const { data } = await axios.post('/v1/api/app/service-connections', {
//                 applicationId: selectedApp,
//                 serviceType: newService.serviceType,
//                 serviceName: newService.serviceName,
//                 configuration: newService.configuration,
//                 metadata: newService.metadata
//             });

//             if (data.success) {
//                 toast.success('Service connection added successfully');
//                 setShowAddServiceModal(false);
//                 setNewService({
//                     serviceType: 'logic-apps',
//                     serviceName: '',
//                     configuration: { endpoint: '', apiKey: '', settings: {} },
//                     metadata: { description: '', version: '', supportedOperations: [] }
//                 });
//                 // Refresh services list
//                 fetchConnectedServices(selectedApp);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     // Update service connection
//     const updateServiceConnection = async (e) => {
//         e.preventDefault();
//         if (!editingService) return;

//         try {
//             const { data } = await axios.put('/v1/api/app/service-connections', {
//                 connectionId: editingService._id,
//                 serviceName: editingService.serviceName,
//                 connectionStatus: editingService.connectionStatus,
//                 configuration: editingService.configuration,
//                 metadata: editingService.metadata
//             });

//             if (data.success) {
//                 toast.success('Service connection updated successfully');
//                 setEditingService(null);
//                 // Refresh services list
//                 fetchConnectedServices(selectedApp);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     // Delete service connection
//     const deleteServiceConnection = async (connectionId, serviceName) => {
//         if (!window.confirm(`Are you sure you want to delete "${serviceName}"?`)) {
//             return;
//         }

//         try {
//             const { data } = await axios.delete(`/v1/api/app/service-connections/${connectionId}`);
//             if (data.success) {
//                 toast.success('Service connection deleted successfully');
//                 // Refresh services list
//                 fetchConnectedServices(selectedApp);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     // Test service connection
//     const testServiceConnection = async (connectionId) => {
//         setTestingConnection(connectionId);
//         try {
//             const { data } = await axios.post('/v1/api/app/service-connections/test', {
//                 connectionId
//             });

//             if (data.success) {
//                 toast.success(data.message);
//                 // Refresh services list to update status
//                 fetchConnectedServices(selectedApp);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         } finally {
//             setTestingConnection(null);
//         }
//     };

//     // Sync service connection
//     const syncServiceConnection = async (connectionId) => {
//         setSyncingConnection(connectionId);
//         try {
//             const { data } = await axios.post('/v1/api/app/service-connections/sync', {
//                 connectionId
//             });

//             if (data.success) {
//                 toast.success(data.message);
//                 // Refresh services list to update sync status
//                 fetchConnectedServices(selectedApp);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         } finally {
//             setSyncingConnection(null);
//         }
//     };

//     // Handle application selection
//     const handleAppClick = (appId) => {
//         fetchConnectedServices(appId);
//     };

//     // Get service type info
//     const getServiceTypeInfo = (serviceType) => {
//         return serviceTypes.find(st => st.value === serviceType) || serviceTypes[0];
//     };

//     // Get status color
//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'connected': return 'bg-green-100 text-green-800 border-green-200';
//             case 'disconnected': return 'bg-red-100 text-red-800 border-red-200';
//             case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
//             case 'error': return 'bg-red-100 text-red-800 border-red-200';
//             default: return 'bg-gray-100 text-gray-800 border-gray-200';
//         }
//     };

//     // Get sync status color
//     const getSyncStatusColor = (status) => {
//         switch (status) {
//             case 'success': return 'bg-green-100 text-green-800';
//             case 'failed': return 'bg-red-100 text-red-800';
//             case 'in-progress': return 'bg-blue-100 text-blue-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     useEffect(() => {
//         fetchApps();
//     }, []);

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-6">Connected Services</h1>
            
//             {/* Applications List */}
//             <div className="mb-8">
//                 <h2 className="text-xl font-semibold mb-4">Applications</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {apps.map((app) => (
//                         <div
//                             key={app._id}
//                             className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                                 selectedApp === app._id 
//                                     ? 'bg-blue-100 border-blue-500' 
//                                     : 'bg-white border-gray-300 hover:bg-gray-50'
//                             }`}
//                             onClick={() => handleAppClick(app._id)}
//                         >
//                             <h3 className="font-semibold text-lg">{app.appName}</h3>
//                             <p className="text-sm text-gray-600">
//                                 {app.serviceConnections?.length || 0} connected services
//                             </p>
//                             <div className="mt-2 flex flex-wrap gap-1">
//                                 {app.serviceConnections?.slice(0, 3).map((service, index) => {
//                                     const serviceInfo = getServiceTypeInfo(service.serviceType);
//                                     const IconComponent = serviceInfo.icon;
//                                     return (
//                                         <span
//                                             key={index}
//                                             className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
//                                                 serviceInfo.color === 'blue' ? 'bg-blue-100 text-blue-800' :
//                                                 serviceInfo.color === 'purple' ? 'bg-purple-100 text-purple-800' :
//                                                 serviceInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
//                                                 serviceInfo.color === 'green' ? 'bg-green-100 text-green-800' :
//                                                 'bg-gray-100 text-gray-800'
//                                             }`}
//                                         >
//                                             <IconComponent size={10} />
//                                             {serviceInfo.label.split(' ').pop()}
//                                         </span>
//                                     );
//                                 })}
//                                 {app.serviceConnections?.length > 3 && (
//                                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
//                                         +{app.serviceConnections.length - 3} more
//                                     </span>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Connected Services List */}
//             <div>
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-semibold">
//                         Connected Services {selectedApp && `- ${apps.find(app => app._id === selectedApp)?.appName}`}
//                     </h2>
//                     <div className="flex gap-2">
//                         {loading && <span className="text-blue-500">Loading...</span>}
//                         {selectedApp && (
//                             <button
//                                 onClick={() => setShowAddServiceModal(true)}
//                                 className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
//                             >
//                                 <FiPlus size={16} />
//                                 Connect Service
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {selectedApp ? (
//                     connectedServices.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {connectedServices.map((service) => {
//                                 const serviceInfo = getServiceTypeInfo(service.serviceType);
//                                 const IconComponent = serviceInfo.icon;
                                
//                                 return (
//                                     <div
//                                         key={service._id}
//                                         className="p-6 border border-gray-300 rounded-lg bg-white shadow-sm relative"
//                                     >
//                                         {/* Service Icon and Header */}
//                                         <div className="flex items-center gap-3 mb-4">
//                                             <div className={`p-3 rounded-full ${
//                                                 serviceInfo.color === 'blue' ? 'bg-blue-100 text-blue-600' :
//                                                 serviceInfo.color === 'purple' ? 'bg-purple-100 text-purple-600' :
//                                                 serviceInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
//                                                 serviceInfo.color === 'green' ? 'bg-green-100 text-green-600' :
//                                                 'bg-gray-100 text-gray-600'
//                                             }`}>
//                                                 <IconComponent size={24} />
//                                             </div>
//                                             <div className="flex-1">
//                                                 <h3 className="font-semibold text-lg">{service.serviceName}</h3>
//                                                 <p className="text-sm text-gray-600">{serviceInfo.label}</p>
//                                             </div>
//                                         </div>

//                                         {/* Service Details */}
//                                         <div className="space-y-3 text-sm">
//                                             <div className="flex justify-between items-center">
//                                                 <span className="font-medium">Status:</span>
//                                                 <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(service.connectionStatus)}`}>
//                                                     {service.connectionStatus}
//                                                 </span>
//                                             </div>
                                            
//                                             <div className="flex justify-between items-center">
//                                                 <span className="font-medium">Last Sync:</span>
//                                                 <span className="text-gray-600">
//                                                     {service.lastSync ? new Date(service.lastSync).toLocaleDateString() : 'Never'}
//                                                 </span>
//                                             </div>
                                            
//                                             {service.syncStatus && (
//                                                 <div className="flex justify-between items-center">
//                                                     <span className="font-medium">Sync Status:</span>
//                                                     <span className={`px-2 py-1 rounded text-xs ${getSyncStatusColor(service.syncStatus)}`}>
//                                                         {service.syncStatus}
//                                                     </span>
//                                                 </div>
//                                             )}

//                                             {service.metadata?.description && (
//                                                 <div>
//                                                     <span className="font-medium">Description:</span>
//                                                     <p className="text-gray-600 mt-1">{service.metadata.description}</p>
//                                                 </div>
//                                             )}
//                                         </div>

//                                         {/* Action Buttons */}
//                                         <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
//                                             <div className="flex gap-2">
//                                                 <button
//                                                     onClick={() => testServiceConnection(service._id)}
//                                                     disabled={testingConnection === service._id}
//                                                     className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors disabled:opacity-50"
//                                                     title="Test Connection"
//                                                 >
//                                                     <FiPlay size={14} />
//                                                     {testingConnection === service._id ? 'Testing...' : 'Test'}
//                                                 </button>
//                                                 <button
//                                                     onClick={() => syncServiceConnection(service._id)}
//                                                     disabled={syncingConnection === service._id}
//                                                     className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors disabled:opacity-50"
//                                                     title="Sync Data"
//                                                 >
//                                                     <FiRefreshCw size={14} />
//                                                     {syncingConnection === service._id ? 'Syncing...' : 'Sync'}
//                                                 </button>
//                                             </div>
//                                             <div className="flex gap-2">
//                                                 <button
//                                                     onClick={() => setEditingService(service)}
//                                                     className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
//                                                     title="Edit Service"
//                                                 >
//                                                     <FiEdit size={14} />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => deleteServiceConnection(service._id, service.serviceName)}
//                                                     className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
//                                                     title="Delete Service"
//                                                 >
//                                                     <FiTrash2 size={14} />
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     ) : (
//                         !loading && (
//                             <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
//                                 <FiLink className="mx-auto text-gray-400 mb-4" size={48} />
//                                 <p className="text-gray-500 text-lg mb-2">No connected services</p>
//                                 <p className="text-gray-400 mb-4">Connect your first service to get started</p>
//                                 <button
//                                     onClick={() => setShowAddServiceModal(true)}
//                                     className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
//                                 >
//                                     Connect Service
//                                 </button>
//                             </div>
//                         )
//                     )

//                 ) : (
//                     <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
//                         <FiDatabase className="mx-auto text-gray-400 mb-4" size={48} />
//                         <p className="text-gray-500">Select an application to view connected services</p>
//                     </div>
//                 )}
//             </div>

//             {/* Add Service Connection Modal */}
//             {showAddServiceModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//                         <h3 className="text-xl font-semibold mb-4">Connect New Service</h3>
//                         <form onSubmit={addServiceConnection}>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {/* Service Type */}
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium mb-2">Service Type</label>
//                                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                                         {serviceTypes.map((serviceType) => {
//                                             const IconComponent = serviceType.icon;
//                                             return (
//                                                 <div
//                                                     key={serviceType.value}
//                                                     className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
//                                                         newService.serviceType === serviceType.value
//                                                             ? `border-${serviceType.color}-500 bg-${serviceType.color}-50`
//                                                             : 'border-gray-300 hover:border-gray-400'
//                                                     }`}
//                                                     onClick={() => setNewService({...newService, serviceType: serviceType.value})}
//                                                 >
//                                                     <IconComponent 
//                                                         size={24} 
//                                                         className={`mx-auto mb-2 ${
//                                                             newService.serviceType === serviceType.value 
//                                                                 ? `text-${serviceType.color}-600` 
//                                                                 : 'text-gray-400'
//                                                         }`} 
//                                                     />
//                                                     <p className="text-sm text-center font-medium">{serviceType.label}</p>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>

//                                 {/* Service Name */}
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium mb-1">Service Name</label>
//                                     <input
//                                         type="text"
//                                         value={newService.serviceName}
//                                         onChange={(e) => setNewService({...newService, serviceName: e.target.value})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder="Enter service name"
//                                         required
//                                     />
//                                 </div>

//                                 {/* Configuration */}
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium mb-2">Configuration</label>
//                                     <div className="space-y-3">
//                                         <input
//                                             type="url"
//                                             value={newService.configuration.endpoint}
//                                             onChange={(e) => setNewService({
//                                                 ...newService, 
//                                                 configuration: {...newService.configuration, endpoint: e.target.value}
//                                             })}
//                                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             placeholder="Endpoint URL"
//                                         />
//                                         <input
//                                             type="password"
//                                             value={newService.configuration.apiKey}
//                                             onChange={(e) => setNewService({
//                                                 ...newService, 
//                                                 configuration: {...newService.configuration, apiKey: e.target.value}
//                                             })}
//                                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             placeholder="API Key / Token"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Metadata */}
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium mb-1">Description</label>
//                                     <textarea
//                                         value={newService.metadata.description}
//                                         onChange={(e) => setNewService({
//                                             ...newService, 
//                                             metadata: {...newService.metadata, description: e.target.value}
//                                         })}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder="Service description"
//                                         rows="3"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Version</label>
//                                     <input
//                                         type="text"
//                                         value={newService.metadata.version}
//                                         onChange={(e) => setNewService({
//                                             ...newService, 
//                                             metadata: {...newService.metadata, version: e.target.value}
//                                         })}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder="1.0.0"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex gap-2 mt-6">
//                                 <button
//                                     type="submit"
//                                     className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
//                                 >
//                                     Connect Service
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowAddServiceModal(false)}
//                                     className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Edit Service Connection Modal */}
//             {editingService && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//                         <h3 className="text-xl font-semibold mb-4">Edit Service Connection</h3>
//                         <form onSubmit={updateServiceConnection}>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {/* Service Info */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Service Name</label>
//                                     <input
//                                         type="text"
//                                         value={editingService.serviceName}
//                                         onChange={(e) => setEditingService({...editingService, serviceName: e.target.value})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Connection Status</label>
//                                     <select
//                                         value={editingService.connectionStatus}
//                                         onChange={(e) => setEditingService({...editingService, connectionStatus: e.target.value})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     >
//                                         <option value="connected">Connected</option>
//                                         <option value="disconnected">Disconnected</option>
//                                         <option value="pending">Pending</option>
//                                         <option value="error">Error</option>
//                                     </select>
//                                 </div>

//                                 {/* Configuration */}
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium mb-2">Configuration</label>
//                                     <div className="space-y-3">
//                                         <input
//                                             type="url"
//                                             value={editingService.configuration?.endpoint || ''}
//                                             onChange={(e) => setEditingService({
//                                                 ...editingService, 
//                                                 configuration: {...editingService.configuration, endpoint: e.target.value}
//                                             })}
//                                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             placeholder="Endpoint URL"
//                                         />
//                                         <input
//                                             type="password"
//                                             value={editingService.configuration?.apiKey || ''}
//                                             onChange={(e) => setEditingService({
//                                                 ...editingService, 
//                                                 configuration: {...editingService.configuration, apiKey: e.target.value}
//                                             })}
//                                             className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                             placeholder="API Key / Token"
//                                         />
//                                     </div>
//                                 </div>

//                                 {/* Metadata */}
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium mb-1">Description</label>
//                                     <textarea
//                                         value={editingService.metadata?.description || ''}
//                                         onChange={(e) => setEditingService({
//                                             ...editingService, 
//                                             metadata: {...editingService.metadata, description: e.target.value}
//                                         })}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         rows="3"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex gap-2 mt-6">
//                                 <button
//                                     type="submit"
//                                     className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
//                                 >
//                                     Update Service
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setEditingService(null)}
//                                     className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ConnectedServices;