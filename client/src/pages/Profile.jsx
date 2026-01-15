import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-hot-toast';
import { FiEdit2, FiCamera, FiSave, FiX, FiLock, FiMail, FiUser } from "react-icons/fi";

const Profile = () => {
    const { user, setUser, axios, token, fetchUser } = useContext(AuthContext);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(user?.image || '');

    useEffect(() => {
        if (image) {
            setPreviewImage(URL.createObjectURL(image));
        } else if (user?.image) {
            setPreviewImage(user.image);
        }
    }, [image, user?.image]);

    const UpdateProfileData = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('fullName', user.fullName || '');
            formData.append('email', user.email || '');
            
            // Only append password if it has a value
            if (user.password && user.password.trim() !== '') {
                formData.append('password', user.password);
            }
            
            if (image) {
                formData.append('image', image);
            }

            const { data } = await axios.post('/v1/api/auth/update-profile', formData, {
                headers: { token }
            });

            if (data.success) {
                toast.success(data.message);
                await fetchUser();
                setIsEdit(false);
                setImage(null);
                // Clear password field after successful update
                setUser(prev => ({ ...prev, password: '' }));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        setImage(null);
        setPreviewImage(user?.image || '');
        // Reset password field
        setUser(prev => ({ ...prev, password: '' }));
    };

    return (
        <div className="min-h-screen bg-black p-4 md:p-6 w-full">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Profile Settings</h1>
                    <p className="text-gray-400">Manage your account information and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Column - Profile Picture */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 border border-gray-800 rounded-xl p-6">
                            <div className="text-center">
                                <div className="relative inline-block mb-4">
                                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-gray-700 mx-auto">
                                        <img 
                                            className="w-full h-full object-cover"
                                            src={previewImage || "https://via.placeholder.com/400x400?text=No+Image"} 
                                            alt="Profile" 
                                        />
                                    </div>
                                    
                                    {isEdit && (
                                        <label 
                                            htmlFor="image-upload"
                                            className="absolute bottom-2 right-2 md:bottom-3 md:right-3 w-10 h-10 bg-taupe rounded-full flex items-center justify-center cursor-pointer hover:bg-taupe/90 transition-colors"
                                        >
                                            <FiCamera className="w-5 h-5 text-white" />
                                            <input 
                                                id="image-upload"
                                                type="file" 
                                                accept="image/*"
                                                onChange={(e) => setImage(e.target.files[0])} 
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                                
                                <h2 className="text-xl font-bold text-white mb-1">
                                    {user?.fullName || 'User'}
                                </h2>
                                <p className="text-gray-400 text-sm mb-4">
                                    {user?.role || 'Admin'}
                                </p>
                                
                                {!isEdit && (
                                    <button
                                        onClick={() => setIsEdit(true)}
                                        className="inline-flex items-center gap-2 bg-taupe hover:bg-taupe/90 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full justify-center"
                                    >
                                        <FiEdit2 className="w-5 h-5" />
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Profile Information */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/5 border border-gray-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-white">Personal Information</h3>
                                {isEdit && (
                                    <button
                                        onClick={handleCancelEdit}
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <FiX className="w-6 h-6" />
                                    </button>
                                )}
                            </div>

                            <form className="space-y-6">
                                {/* Full Name Field */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                        <FiUser className="w-4 h-4" />
                                        Full Name
                                    </label>
                                    {isEdit ? (
                                        <input
                                            className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent transition-all"
                                            type="text"
                                            onChange={(e) => setUser(prev => ({ ...prev, fullName: e.target.value }))}
                                            value={user?.fullName || ''}
                                            placeholder="Enter your full name"
                                        />
                                    ) : (
                                        <p className="p-3 bg-white/5 border border-gray-700 rounded-lg text-white">
                                            {user?.fullName || 'Not set'}
                                        </p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                        <FiMail className="w-4 h-4" />
                                        Email Address
                                    </label>
                                    {isEdit ? (
                                        <input
                                            className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent transition-all"
                                            type="email"
                                            onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                                            value={user?.email || ''}
                                            placeholder="Enter your email"
                                        />
                                    ) : (
                                        <p className="p-3 bg-white/5 border border-gray-700 rounded-lg text-white">
                                            {user?.email || 'Not set'}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                        <FiLock className="w-4 h-4" />
                                        Password
                                    </label>
                                    {isEdit ? (
                                        <input
                                            className="w-full p-3 bg-white/5 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent transition-all"
                                            type="password"
                                            onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
                                            value={user?.password || ''}
                                            placeholder="Leave blank to keep current password"
                                        />
                                    ) : (
                                        <p className="p-3 bg-white/5 border border-gray-700 rounded-lg text-white">
                                            ••••••••
                                        </p>
                                    )}
                                </div>

                                {/* Account Details */}
                                {!isEdit && (
                                    <div className="pt-6 border-t border-gray-800 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Account ID</span>
                                            <span className="text-white font-mono text-sm">
                                                {user?._id?.substring(0, 12)}...
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Member Since</span>
                                            <span className="text-white">
                                                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Last Updated</span>
                                            <span className="text-white">
                                                {user?.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                {isEdit && (
                                    <div className="flex gap-3 pt-6 border-t border-gray-800">
                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors"
                                            disabled={loading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            onClick={UpdateProfileData}
                                            disabled={loading || !user?.fullName?.trim() || !user?.email?.trim()}
                                            className="flex-1 bg-taupe hover:bg-taupe/90 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                    <span>Saving...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FiSave className="w-5 h-5" />
                                                    <span>Save Changes</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Security Note */}
                        <div className="mt-6 bg-white/5 border border-gray-800 rounded-xl p-4 md:p-6">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-taupe/20 flex items-center justify-center flex-shrink-0">
                                    <FiLock className="w-4 h-4 text-taupe" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-white mb-2">Security Note</h4>
                                    <p className="text-sm text-gray-400">
                                        Your profile information is securely stored and encrypted. 
                                        For password changes, leave the password field blank to keep your current password. 
                                        All changes are logged for security purposes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import { toast } from 'react-hot-toast' ;
// import BottomNav from "../components/shared/BottomNav";

// const Profile = () => {

//     const {user, setUser, axios, token, fetchUser} = useContext(AuthContext);
//     const [isEdit, setIsEdit] = useState(false);
//     const [image, setImage] = useState(false);

//     const UpdateProfileData = async() =>{
//         try {
//             const formData = new FormData()

//             formData.append('fullName', user.fullName)
//             formData.append('email', user.email)
//             // Only append password if it has a value (not empty)
//             if (user.password && user.password.trim() !== '') {
//                 formData.append('password', user.password)
//             }
//             image && formData.append('image', image)

//             const { data } = await axios.post('/v1/api/auth/update-profile', formData, 
//                 {headers:{token}}
//             )
//             if (data.success) {
//                 // Log all form data values
//                 for (let [key, value] of formData.entries()) {
//                     console.log(key, value);
//                 }

//                 toast.success(data.message)
//                 await fetchUser()
//                 setIsEdit(false)
//                 setImage(false)
//             } else {
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             console.log(error)
//             toast.error(error.message)  
//         }
//     };

// //     On other way : 
// //     const handleUpdateProfile = async () => {
// //     const updateData = {
// //         fullName: user.fullName,
// //         email: user.email,
// //         password: user.password || undefined // Send undefined if empty
// //     };

// //     const result = await updateProfile(updateData);
    
// //     // Clear password field after successful update
// //     if (result.success) {
// //         setUser(prev => ({ ...prev, password: '' }));
// //     }
// // };

//     return (
//        <div className ='max-w-lg flex flex-col gap-2 text-sm px-5 mt-10'>
//             {
//                 isEdit
//                     ?
//                     <label htmlFor="image">
//                         <div className='inline-block relative cursor-pointer'>
//                             <img className='w-28  h-28 rounded-full opacity-75' src={image ? URL.createObjectURL(image) : user.image} alt="" />
//                             <img className='w-10 absolute bottom-12 right-12' src={image ? '' : "https://utfs.io/f/c61ec63c-42b1-4939-a7fb-ed04d43e23ee-2558r.png"} alt="" />
//                         </div>
//                         <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
//                     </label>
//                     :
//                     <img className='w-28 h-28 rounded-full border border-gray-500 p-1' src={user.image} alt='' />
//             }

//             {
//                 isEdit
//                     ?
//                     <input

//                         className='bg-gray-100 text-lg font-medium max-w-60 mt-4 px-2 rounded-sm'
//                         type='text'
//                         onChange={(e) => setUser(prev => ({ ...prev, fullName: e.target.value }))}
//                         value={user.fullName}
//                     />
//                     :
//                     <p className='font-medium text-lg text-neutral-800 m-4'>{user.fullName}</p>
//             }

//             {
//                 isEdit
//                     ?
//                     <input
//                         className='bg-gray-100 text-lg font-medium max-w-60 mt-2 px-2 rounded-sm' type='text'
//                         onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
//                         value={user.email}
//                     />
//                     :
//                     <p className='font-medium text-md text-neutral-800'>{user.email}</p>
//             }

//             {
//                 isEdit
//                     ?
//                     <input
//                         className='bg-gray-100 text-lg font-medium max-w-60 mt-4 px-2 rounded-sm' type='password'
//                         onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
//                         // value={user.password}
//                         value ={user.password}
//                     />
//                     :
//                     <p className='font-medium text-md text-neutral-800'>*******</p>
//             }

//             <hr className ='bg-zinc-400 h-[1px] border-none mt-2'/>

//             <div className='mt-10'>
//                 {
//                     isEdit
//                         ?
//                         <button className='border border-gray-200 px-8 py-2 rounded-full hover:bg-gray-500
//           hover:text-white transition-all text-white cursor-pointer bg-linear-65 from-gray-500 to-white'

//                             onClick={UpdateProfileData}
//                         >
//                             Save Information
//                         </button>
//                         :
//                         <button className='border border-gray-500 px-8 py-2 rounded-full hover:bg-gray-500 
//           hover:text-gray-500 transition-all text-gray-600 cursor-pointer bg-linear-65 from-gray-200 to-white'

//                             onClick={() => setIsEdit(true)}
//                         >
//                             Update Information
//                         </button>
//                 }

//             </div>

//             <BottomNav/>

//        </div>

      
//     );
// }


// export default Profile ;