import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-hot-toast';
import { FiEdit, FiTrash2, FiPlus, FiX } from "react-icons/fi";

const Phases = () => {
    const { axios } = useContext(AuthContext);
    
    const [phases, setPhases] = useState([]);
    const [apps, setApps] = useState([]);
    const [selectedApp, setSelectedApp] = useState(null);
    const [loading, setLoading] = useState(false);
    const [editingPhase, setEditingPhase] = useState(null);
    const [showAddPhaseModal, setShowAddPhaseModal] = useState(false);
    const [newPhase, setNewPhase] = useState({
        phaseName: '',
        description: '',
        completionDate: '',
        status: 'pending',
        order: 0
    });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedPhase, setSelectedPhase] = useState(null);

    // Fetch all applications
    const fetchApps = async () => {
        try {
            const { data } = await axios.get('/v1/api/app');
            data.success ? setApps(data.applications) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Fetch phases for a specific application
    const fetchPhases = async (applicationId) => {
        if (!applicationId) return;
        
        setLoading(true);
        try {
            const { data } = await axios.get(`/v1/api/app/${applicationId}/phases`);
            if (data.success) {
                setPhases(data.phases);
                setSelectedApp(applicationId);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete phase
    const deletePhase = async (phaseId) => {
        try {
            const { data } = await axios.delete(`/v1/api/app/phases/${phaseId}`);
            if (data.success) {
                toast.success('Phase deleted successfully');
                fetchPhases(selectedApp);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Update phase
    const updatePhase = async (e) => {
        e.preventDefault();
        if (!editingPhase) return;

        try {
            const { data } = await axios.put('/v1/api/app/phases', {
                phaseId: editingPhase._id,
                phaseName: editingPhase.phaseName,
                completionDate: editingPhase.completionDate,
            });

            if (data.success) {
                toast.success('Phase updated successfully');
                setEditingPhase(null);
                fetchPhases(selectedApp);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Add new phase
    const addNewPhase = async (e) => {
        e.preventDefault();
        if (!selectedApp) return;

        try {
            const { data } = await axios.post('/v1/api/app/phases', {
                applicationId: selectedApp,
                phaseName: newPhase.phaseName,
                completionDate: newPhase.completionDate,
            });

            if (data.success) {
                toast.success('Phase added successfully');
                setShowAddPhaseModal(false);
                setNewPhase({
                    phaseName: '',
                    description: '',
                    completionDate: '',
                    status: 'pending',
                    order: 0
                });
                fetchPhases(selectedApp);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Handle application button click
    const handleAppClick = (appId) => {
        fetchPhases(appId);
    };

    // Start editing a phase
    const startEditPhase = (phase) => {
        setEditingPhase({
            ...phase,
            completionDate: phase.completionDate.split('T')[0]
        });
    };

    useEffect(() => {
        fetchApps();
    }, []);

    return (
        <div className="min-h-screen bg-black p-4 md:p-6 w-full border-l border-taupe">
            {/* Header */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Applications & Phases</h1>
                <p className="text-gray-400">Manage application phases and implementation timelines</p>
            </div>
            
            {/* Applications List */}
            <div className="mb-8">
                <h2 className="text-lg md:text-xl font-semibold text-white mb-4">Select Application</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                    {apps.map((app) => (
                        <button
                            key={app._id}
                            onClick={() => handleAppClick(app._id)}
                            className={`p-3 md:p-4 border rounded-xl transition-all text-left ${
                                selectedApp === app._id 
                                    ? 'bg-taupe border-taupe text-white' 
                                    : 'bg-white/5 border-gray-700 text-gray-300 hover:bg-white/10 hover:border-taupe/50'
                            }`}
                        >
                            <h3 className="font-bold text-sm md:text-base mb-1 truncate">
                                {app.appName || app.name || 'Unnamed App'}
                            </h3>
                            <p className="text-xs md:text-sm opacity-75">
                                {app.phases?.length || 0} phase{app.phases?.length !== 1 ? 's' : ''}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Phases Section */}
            <div className="bg-white/5 border border-gray-800 rounded-xl p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-white">
                            {selectedApp ? (
                                `Phases - ${apps.find(app => app._id === selectedApp)?.appName}`
                            ) : (
                                'Phases'
                            )}
                        </h2>
                        {selectedApp && (
                            <p className="text-gray-400 text-sm mt-1">
                                Manage implementation phases for this application
                            </p>
                        )}
                    </div>
                    
                    {selectedApp && (
                        <button
                            onClick={() => setShowAddPhaseModal(true)}
                            className="flex items-center gap-2 bg-taupe hover:bg-taupe/90 text-white px-4 py-3 rounded-lg transition-colors w-full sm:w-auto justify-center"
                        >
                            <FiPlus size={18} />
                            <span>Add New Phase</span>
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-taupe border-t-transparent"></div>
                    </div>
                ) : selectedApp ? (
                    phases.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                            {phases.map((phase) => (
                                <div
                                    key={phase._id}
                                    className="bg-black border border-gray-700 rounded-xl p-4 hover:border-taupe/50 transition-colors group relative"
                                >
                                    {/* Action Buttons */}
                                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => startEditPhase(phase)}
                                            className="p-1.5 cursor-pointer bg-taupe/20 hover:bg-taupe/30 text-taupe rounded-lg transition-colors"
                                            title="Edit Phase"
                                        >
                                            <FiEdit size={14} />
                                        </button>
                                        <button
                                            onClick={() => {setSelectedPhase(phase); setDeleteModalOpen(true)}}
                                            className="p-1.5 cursor-pointer bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                            title="Delete Phase"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>

                                    <h3 className="font-semibold text-white text-lg pr-10 mb-3">{phase.phaseName}</h3>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm text-gray-300">
                                                {new Date(phase.completionDate).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        
                                        {phase.description && (
                                            <div className="pt-3 border-t border-gray-800">
                                                <p className="text-sm text-gray-400 line-clamp-2">{phase.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-taupe/20 flex items-center justify-center">
                                <FiPlus className="w-8 h-8 text-taupe" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">No Phases Yet</h3>
                            <p className="text-gray-400 mb-4">Start by adding your first implementation phase</p>
                            <button
                                onClick={() => setShowAddPhaseModal(true)}
                                className="inline-flex items-center gap-2 bg-taupe hover:bg-taupe/90 text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                <FiPlus size={18} />
                                Add First Phase
                            </button>
                        </div>
                    )
                ) : (
                    <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-taupe/20 flex items-center justify-center">
                            <svg className="w-8 h-8 text-taupe" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Select an Application</h3>
                        <p className="text-gray-400">Choose an application from above to view and manage its phases</p>
                    </div>
                )}
            </div>

            {/* Edit Phase Modal */}
            {editingPhase && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-black border border-gray-800 rounded-xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Edit Phase</h3>
                            <button
                                onClick={() => setEditingPhase(null)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={updatePhase} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Phase Name</label>
                                <input
                                    type="text"
                                    value={editingPhase.phaseName}
                                    onChange={(e) => setEditingPhase({...editingPhase, phaseName: e.target.value})}
                                    className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Completion Date</label>
                                <input
                                    type="date"
                                    value={editingPhase.completionDate}
                                    onChange={(e) => setEditingPhase({...editingPhase, completionDate: e.target.value})}
                                    className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-taupe hover:bg-taupe/90 text-white py-3 rounded-lg font-medium transition-colors"
                                >
                                    Update Phase
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingPhase(null)}
                                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Phase Modal */}
            {showAddPhaseModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-black border border-gray-800 rounded-xl p-6 w-full max-w-md">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Add New Phase</h3>
                            <button
                                onClick={() => setShowAddPhaseModal(false)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <FiX size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={addNewPhase} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Phase Name</label>
                                <input
                                    type="text"
                                    value={newPhase.phaseName}
                                    onChange={(e) => setNewPhase({...newPhase, phaseName: e.target.value})}
                                    className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent transition-all"
                                    placeholder="Enter phase name"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Completion Date</label>
                                <input
                                    type="date"
                                    value={newPhase.completionDate}
                                    onChange={(e) => setNewPhase({...newPhase, completionDate: e.target.value})}
                                    className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent transition-all"
                                    required
                                />
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-taupe hover:bg-taupe/90 text-white py-3 rounded-lg font-medium transition-colors"
                                >
                                    Add Phase
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddPhaseModal(false)}
                                    className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                open={deleteModalOpen}
                phaseName={selectedPhase?.phaseName}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                    deletePhase(selectedPhase._id);
                    setDeleteModalOpen(false);
                }}
            />
        </div>
    );
};

const ConfirmModal = ({ open, onClose, onConfirm, phaseName }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-black border border-gray-800 rounded-xl p-6 w-full max-w-md">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                        <FiTrash2 className="w-8 h-8 text-red-400" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">Delete Phase</h3>
                    <p className="text-gray-300 mb-6">
                        Are you sure you want to delete <span className="font-semibold text-white">{phaseName}</span>? This action cannot be undone.
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
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Phases;

// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { toast } from 'react-hot-toast';
// import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
// import BottomNav from "../components/shared/BottomNav";

// const Phases = () => {
//     const { axios } = useContext(AuthContext);
    
//     const [phases, setPhases] = useState([]);
//     const [apps, setApps] = useState([]);
//     const [selectedApp, setSelectedApp] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [editingPhase, setEditingPhase] = useState(null);
//     const [showAddPhaseModal, setShowAddPhaseModal] = useState(false);
//     const [newPhase, setNewPhase] = useState({
//         phaseName: '',
//         description: '',
//         completionDate: '',
//         status: 'pending',
//         order: 0
//     });

//     // Fetch all applications
//     const fetchApps = async () => {
//         try {
//             const { data } = await axios.get('/v1/api/app');
//             data.success ? setApps(data.applications) : toast.error(data.message);
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };




//     // Fetch phases for a specific application
//     const fetchPhases = async (applicationId) => {
//         if (!applicationId) return;
        
//         setLoading(true);
//         try {
//             const { data } = await axios.get(`/v1/api/app/${applicationId}/phases`);
//             if (data.success) {
//                 setPhases(data.phases);
//                 setSelectedApp(applicationId);
//             } else {
//                 toast.error(data.message);
//             }
            
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Delete phase
//     const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//     const [selectedPhase, setSelectedPhase] = useState(null);

//     const deletePhase = async (phaseId, phaseName) => {
     

//         try {
//             const { data } = await axios.delete(`/v1/api/app/phases/${phaseId}`);
//             if (data.success) {
//                 toast.success('Phase deleted successfully');
//                 // Refresh phases list
//                 fetchPhases(selectedApp);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     // Update phase
//     const updatePhase = async (e) => {
//         e.preventDefault();
//         if (!editingPhase) return;

//         try {
//             const { data } = await axios.put('/v1/api/app/phases', {
//                 phaseId: editingPhase._id,
//                 phaseName: editingPhase.phaseName,
//                 // description: editingPhase.description,
//                 completionDate: editingPhase.completionDate,
//                 // status: editingPhase.status,
//                 // order: editingPhase.order
//             });

//             if (data.success) {
//                 toast.success('Phase updated successfully');
//                 setEditingPhase(null);
//                 // Refresh phases list
//                 fetchPhases(selectedApp);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     // Add new phase
//     const addNewPhase = async (e) => {
//         e.preventDefault();
//         if (!selectedApp) return;

//         try {
//             const { data } = await axios.post('/v1/api/app/phases', {
//                 applicationId: selectedApp,
//                 phaseName: newPhase.phaseName,
//                 // description: newPhase.description,
//                 completionDate: newPhase.completionDate,
//                 // status: newPhase.status,
//                 // order: newPhase.order
//             });

//             if (data.success) {
//                 toast.success('Phase added successfully');
//                 setShowAddPhaseModal(false);
//                 setNewPhase({
//                     phaseName: '',
//                     description: '',
//                     completionDate: '',
//                     status: 'pending',
//                     order: 0
//                 });
//                 // Refresh phases list
//                 fetchPhases(selectedApp);
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || error.message);
//         }
//     };

//     // Handle application button click
//     const handleAppClick = (appId) => {
//         fetchPhases(appId);
//     };

//     // Start editing a phase
//     const startEditPhase = (phase) => {
//         setEditingPhase({
//             ...phase,
//             completionDate: phase.completionDate.split('T')[0] // Format date for input
//         });
//     };

//     useEffect(() => {
//         fetchApps();
//     }, []);

//     return (
//         <div className="p-6">
//             <div className ='shadow-lg px-1'>
//                 <h1 className="text-2xl max-md:text-xl font-bold mb-4">Applications & Phases</h1>
//             </div>
            
            
//             {/* Applications List */}
//             <div className="mb-8">
//                 <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 gap-4">
//                     {apps.map((app) => (
//                         <div
//                             key={app._id}
//                             className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                                 selectedApp === app._id 
//                                     ? 'bg-taupe border-taupe' 
//                                     : 'bg-white border-gray-300 hover:bg-gray-50'
//                             }`}
//                             onClick={() => handleAppClick(app._id)}
//                         >
//                             <h3 className="font-bold text-md max-md:text-sm">{app.appName}</h3>
//                             <p className="text-sm text-white font-bold">
//                                 {app.phases?.length || 0} phases
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Phases List */}
//             <div>
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl max-md:text-sm font-bold text-black">
//                         Phases {selectedApp && `- ${apps.find(app => app._id === selectedApp)?.appName}`}
//                     </h2>
//                     <div className="flex gap-2">
//                         {loading && <span className="text-tauph">Loading...</span>}
//                         {selectedApp && (
//                             <button
//                                 onClick={() => setShowAddPhaseModal(true)}
//                                 className="flex cursor-pointer items-center gap-2 bg-taupe text-white px-4 py-2 rounded-lg  transition-colors"
//                             >
//                                 <FiPlus size={16} />
//                                 Add Phase
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {selectedApp ? (
//                     phases.length > 0 ? (
//                         <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4">
//                             {phases.map((phase) => (
//                                 <div
//                                     key={phase._id}
//                                     className="p-4 border border-taupe rounded-lg bg-white shadow-sm relative bg-taupe"
//                                 >
//                                     {/* Action Buttons */}
//                                     <div className="absolute top-3 right-3 flex gap-2">
//                                         <button
//                                             onClick={() => startEditPhase(phase)}
//                                             className="p-1.5 cursor-pointer bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
//                                             title="Edit Phase "
//                                         >
//                                             <FiEdit size={14} />
//                                         </button>
//                                         <button
//                                             // onClick={() => deletePhase(phase._id, phase.phaseName)}
//                                             onClick ={()=> {setSelectedPhase(phase); setDeleteModalOpen(true)}}
                                            
//                                             className="p-1.5 cursor-pointer bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
//                                             title="Delete Phase"
//                                         >
//                                             <FiTrash2 size={14} />
//                                         </button>
//                                     </div>

//                                     <h3 className="font-semibold text-md max-md:text-sm mb-2 pr-16">{phase.phaseName}</h3>
//                                     <div className="space-y-2 text-sm">
//                                         {/* <p>
//                                             <span className="font-medium">Status:</span> 
//                                             <span className={`ml-2 px-2 py-1 rounded text-xs ${
//                                                 phase.status === 'completed' 
//                                                     ? 'bg-green-100 text-green-800'
//                                                     : phase.status === 'in-progress'
//                                                     ? 'bg-yellow-100 text-yellow-800'
//                                                     : 'bg-gray-100 text-gray-800'
//                                             }`}>
//                                                 {phase.status}
//                                             </span>
//                                         </p> */}
//                                         <p>
//                                             <span className="font-medium">Completion Date:</span> 
//                                             <span className="ml-2">
//                                                 {new Date(phase.completionDate).toLocaleDateString()}
//                                             </span>
//                                         </p>
//                                         {/* <p>
//                                             <span className="font-medium">Order:</span> 
//                                             <span className="ml-2">{phase.order}</span>
//                                         </p> */}
//                                         {phase.description && (
//                                             <p>
//                                                 <span className="font-medium">Description:</span> 
//                                                 <span className="ml-2">{phase.description}</span>
//                                             </p>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : (
//                         !loading && (
//                             <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
//                                 <p className="text-gray-500">No phases found for this application.</p>
//                             </div>
//                         )
//                     )
//                 ) : (
//                     <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
//                         <p className="text-gray-500">Select an application to view its phases.</p>
//                     </div>
//                 )}
//             </div>

//             {/* Edit Phase Modal */}
//             {editingPhase && (
//                 <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4"
//                 style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>

//                     <div className="bg-white rounded-lg p-6 w-full max-w-md">
//                         <h3 className="text-xl font-semibold mb-4">Edit Phase</h3>
//                         <form onSubmit={updatePhase}>
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Phase Name</label>
//                                     <input
//                                         type="text"
//                                         value={editingPhase.phaseName}
//                                         onChange={(e) => setEditingPhase({...editingPhase, phaseName: e.target.value})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 {/* <div>
//                                     <label className="block text-sm font-medium mb-1">Description</label>
//                                     <textarea
//                                         value={editingPhase.description || ''}
//                                         onChange={(e) => setEditingPhase({...editingPhase, description: e.target.value})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         rows="3"
//                                     />
//                                 </div> */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Completion Date</label>
//                                     <input
//                                         type="date"
//                                         value={editingPhase.completionDate}
//                                         onChange={(e) => setEditingPhase({...editingPhase, completionDate: e.target.value})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 {/* <div>
//                                     <label className="block text-sm font-medium mb-1">Status</label>
//                                     <select
//                                         value={editingPhase.status}
//                                         onChange={(e) => setEditingPhase({...editingPhase, status: e.target.value})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     >
//                                         <option value="pending">Pending</option>
//                                         <option value="in-progress">In Progress</option>
//                                         <option value="completed">Completed</option>
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Order</label>
//                                     <input
//                                         type="number"
//                                         value={editingPhase.order}
//                                         onChange={(e) => setEditingPhase({...editingPhase, order: parseInt(e.target.value)})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                         min="0"
//                                     />
//                                 </div> */}
//                             </div>
//                             <div className="flex gap-2 mt-6">
//                                 <button
//                                     type="submit"
//                                     className="flex-1 cursor-pointer bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
//                                 >
//                                     Update Phase
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setEditingPhase(null)}
//                                     className="flex-1 cursor-pointer bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Add Phase Modal */}
//             {showAddPhaseModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//                 style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>

//                     <div className="bg-white rounded-lg p-6 w-full max-w-md">
//                         <h3 className="text-xl font-semibold mb-4">Add New Phase</h3>
//                         <form onSubmit={addNewPhase}>
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Phase Name</label>
//                                     <input
//                                         type="text"
//                                         value={newPhase.phaseName}
//                                         onChange={(e) => setNewPhase({...newPhase, phaseName: e.target.value})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder="Enter phase name"
//                                         required
//                                     />
//                                 </div>
//                                 {/* <div>
//                                     <label className="block text-sm font-medium mb-1">Description</label>
//                                     <textarea
//                                         value={newPhase.description}
//                                         onChange={(e) => setNewPhase({...newPhase, description: e.target.value})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         placeholder="Enter phase description"
//                                         rows="3"
//                                     />
//                                 </div> */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Completion Date</label>
//                                     <input
//                                         type="date"
//                                         value={newPhase.completionDate}
//                                         onChange={(e) => setNewPhase({...newPhase, completionDate: e.target.value})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                     />
//                                 </div>
//                                 {/* <div>
//                                     <label className="block text-sm font-medium mb-1">Status</label>
//                                     <select
//                                         value={newPhase.status}
//                                         onChange={(e) => setNewPhase({...newPhase, status: e.target.value})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                     >
//                                         <option value="pending">Pending</option>
//                                         <option value="in-progress">In Progress</option>
//                                         <option value="completed">Completed</option>
//                                     </select>
//                                 </div> */}
//                                 {/* <div>
//                                     <label className="block text-sm font-medium mb-1">Order</label>
//                                     <input
//                                         type="number"
//                                         value={newPhase.order}
//                                         onChange={(e) => setNewPhase({...newPhase, order: parseInt(e.target.value) || 0})}
//                                         className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                         required
//                                         min="0"
//                                     />
//                                 </div> */}
//                             </div>
//                             <div className="flex gap-2 mt-6">
//                                 <button
//                                     type="submit"
//                                     className="flex-1 cursor-pointer bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
//                                 >
//                                     Add Phase
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowAddPhaseModal(false)}
//                                     className="flex-1 cursor-pointer bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition-colors"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//                <ConfirmModal
//                 open= {deleteModalOpen}
//                 phaseName= {selectedPhase?.phaseName}
//                 onClose={() => setDeleteModalOpen(false)}
//                 onConfirm={() => {
//                     deletePhase(selectedPhase._id);
//                     setDeleteModalOpen(false);
//                 }}
//             />

//             {/* <BottomNav /> */}
//         </div>
//     );
// };

// const ConfirmModal = ({ open, onClose, onConfirm, phaseName }) => {
//     if (!open) return null;

//     return (
//         <div
//             className="fixed inset-0 flex items-center justify-center z-50"
//             style={{ backgroundColor: 'rgba(243, 216, 216, 0.4)' }}  //rgba(0,0,0,0.4)
//         >

//             <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
//                 {/* <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2> */}
//                 <p className="mb-6">Are you sure you want to remove <span className="font-semibold text-red-600">{phaseName}</span>?</p>
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


// export default Phases;