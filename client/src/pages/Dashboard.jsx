import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineLogout, AiOutlineAppstore } from "react-icons/ai";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdOutlinePhonelink, MdOutlineIntegrationInstructions } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [phases, setPhases] = useState({});
    const [loading, setLoading] = useState(true);
    const [phasesLoading, setPhasesLoading] = useState({});
    const [expandedApp, setExpandedApp] = useState(null);

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
        if (expandedApp === appId) {
            setExpandedApp(null);
        } else {
            setExpandedApp(appId);
            if (!phases[appId] && !phasesLoading[appId]) {
                fetchPhases(appId);
            }
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    const getPhaseCount = (appId) => {
        return phases[appId] ? phases[appId].length : 0;
    };

    const handleLogout = () => {
        logout();
        navigate('/admin-login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-taupe border-t-transparent"></div>
            </div>
        );
    }

    return (
        // <div className="min-h-screen bg-black text-white w-full">
            <section className='overflow-y-scroll scrollbar-hidden bg-black text-white pl-0 w-full'>
 
            {/* Header */}
            <div className="bg-white/5 border-b border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">Admin Dashboard</h1>
                            <p className="text-gray-400 mt-1">Manage applications and phases</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-taupe to-taupe/70 flex items-center justify-center">
                                    <span className="font-bold">
                                        {user?.name?.charAt(0) || user?.email?.charAt(0) || 'A'}
                                    </span>
                                </div>
                                <div className="hidden md:block">
                                    <p className="font-medium text-white">{user?.name || 'Admin'}</p>
                                    <p className="text-sm text-gray-400">{user?.email || 'admin@example.com'}</p>
                                </div>
                            </div>
                            
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-gray-700"
                            >
                                <AiOutlineLogout className="w-5 h-5" />
                                <span className="hidden md:inline">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/5 border border-gray-800 rounded-xl p-6 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-taupe/20 flex items-center justify-center">
                                <AiOutlineAppstore className="w-6 h-6 text-taupe" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Applications</p>
                                <p className="text-2xl font-bold text-white">{applications.length}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/5 border border-gray-800 rounded-xl p-6 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-taupe/20 flex items-center justify-center">
                                <MdOutlineIntegrationInstructions className="w-6 h-6 text-taupe" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Total Phases</p>
                                <p className="text-2xl font-bold text-white">
                                    {applications.reduce((total, app) => total + getPhaseCount(app._id), 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/5 border border-gray-800 rounded-xl p-6 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-taupe/20 flex items-center justify-center">
                                <MdOutlinePhonelink className="w-6 h-6 text-taupe" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Active Systems</p>
                                <p className="text-2xl font-bold text-white">
                                    {applications.filter(app => getPhaseCount(app._id) > 0).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                <div className="bg-white/5 border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800">
                        <h2 className="text-xl font-bold text-white">Applications</h2>
                        <p className="text-gray-400 text-sm">Click to view implementation phases</p>
                    </div>
                    
                    <div className="divide-y divide-gray-800">
                        {applications.length === 0 ? (
                            <div className="p-8 text-center">
                                <AiOutlineAppstore className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">No applications found</p>
                                <p className="text-gray-500 text-sm mt-1">Create your first application to get started</p>
                            </div>
                        ) : (
                            applications.map((app) => (
                                <div key={app._id} className="hover:bg-white/5 transition-colors">
                                    <button
                                        onClick={() => togglePhases(app._id)}
                                        className="w-full p-6 flex flex-col md:flex-row md:items-center justify-between text-left"
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-taupe/20 flex items-center justify-center">
                                                    <AiOutlineAppstore className="w-6 h-6 text-taupe" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-lg">
                                                        {app.appName || app.name || app.applicationName || 'Unnamed Application'}
                                                    </h3>
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        {app.description || 'No description provided'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                                            <div className="px-3 py-1 rounded-full bg-taupe/20 text-taupe text-sm font-medium">
                                                {getPhaseCount(app._id)} phases
                                            </div>
                                            <div className="text-gray-400">
                                                {expandedApp === app._id ? (
                                                    <FiChevronUp className="w-5 h-5" />
                                                ) : (
                                                    <FiChevronDown className="w-5 h-5" />
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                    
                                    {/* Phases List */}
                                    {expandedApp === app._id && (
                                        <div className="px-6 pb-6">
                                            {phasesLoading[app._id] ? (
                                                <div className="flex items-center justify-center py-8">
                                                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-taupe border-t-transparent"></div>
                                                </div>
                                            ) : phases[app._id] && phases[app._id].length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {phases[app._id].map((phase, index) => (
                                                        <div 
                                                            key={phase._id || index} 
                                                            className="bg-white/5 border border-gray-800 rounded-lg p-4 hover:bg-white/10 transition-colors"
                                                        >
                                                            <div className="flex items-start justify-between mb-2">
                                                                <h4 className="font-medium text-white">
                                                                    {phase.phaseName || phase.name || `Phase ${index + 1}`}
                                                                </h4>
                                                                {phase.status && (
                                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                                                        phase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                                                        phase.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                        'bg-gray-500/20 text-gray-400'
                                                                    }`}>
                                                                        {phase.status}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            
                                                            {phase.description && (
                                                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                                                    {phase.description}
                                                                </p>
                                                            )}
                                                            
                                                            {phase.completionDate && (
                                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                    </svg>
                                                                    {new Date(phase.completionDate).toLocaleDateString('en-GB', {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        year: 'numeric'
                                                                    })}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-8 border border-gray-800 rounded-lg">
                                                    <MdOutlineIntegrationInstructions className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                                    <p className="text-gray-400">No phases configured</p>
                                                    <p className="text-gray-500 text-sm mt-1">
                                                        Add implementation phases for this application
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
                
                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-gray-800 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                <span className="text-white">Add New Application</span>
                                <AiOutlineAppstore className="w-5 h-5" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                <span className="text-white">Manage Phases</span>
                                <MdOutlineIntegrationInstructions className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="bg-white/5 border border-gray-800 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-4">System Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Applications</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-white">All Systems Operational</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">API Service</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-white">Online</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400">Database</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="text-white">Connected</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-800 mt-8 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Alain Company. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Admin Dashboard v1.0</span>
                            <span>•</span>
                            <span>Last updated: {new Date().toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;