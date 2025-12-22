import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-hot-toast' ;
import BottomNav from "../components/shared/BottomNav";

const Profile = () => {

    const {user, setUser, axios, token, fetchUser} = useContext(AuthContext);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);

    const UpdateProfileData = async() =>{
        try {
            const formData = new FormData()

            formData.append('fullName', user.fullName)
            formData.append('email', user.email)
            // Only append password if it has a value (not empty)
            if (user.password && user.password.trim() !== '') {
                formData.append('password', user.password)
            }
            image && formData.append('image', image)

            const { data } = await axios.post('/v1/api/auth/update-profile', formData, 
                {headers:{token}}
            )
            if (data.success) {
                // Log all form data values
                for (let [key, value] of formData.entries()) {
                    console.log(key, value);
                }

                toast.success(data.message)
                await fetchUser()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)  
        }
    };

//     On other way : 
//     const handleUpdateProfile = async () => {
//     const updateData = {
//         fullName: user.fullName,
//         email: user.email,
//         password: user.password || undefined // Send undefined if empty
//     };

//     const result = await updateProfile(updateData);
    
//     // Clear password field after successful update
//     if (result.success) {
//         setUser(prev => ({ ...prev, password: '' }));
//     }
// };

    return (
       <div className ='max-w-lg flex flex-col gap-2 text-sm px-5 mt-10'>
            {
                isEdit
                    ?
                    <label htmlFor="image">
                        <div className='inline-block relative cursor-pointer'>
                            <img className='w-28  h-28 rounded-full opacity-75' src={image ? URL.createObjectURL(image) : user.image} alt="" />
                            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : "https://utfs.io/f/c61ec63c-42b1-4939-a7fb-ed04d43e23ee-2558r.png"} alt="" />
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                    :
                    <img className='w-28 h-28 rounded-full border border-gray-500 p-1' src={user.image} alt='' />
            }

            {
                isEdit
                    ?
                    <input

                        className='bg-gray-100 text-lg font-medium max-w-60 mt-4 px-2 rounded-sm'
                        type='text'
                        onChange={(e) => setUser(prev => ({ ...prev, fullName: e.target.value }))}
                        value={user.fullName}
                    />
                    :
                    <p className='font-medium text-lg text-neutral-800 m-4'>{user.fullName}</p>
            }

            {
                isEdit
                    ?
                    <input
                        className='bg-gray-100 text-lg font-medium max-w-60 mt-2 px-2 rounded-sm' type='text'
                        onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                        value={user.email}
                    />
                    :
                    <p className='font-medium text-md text-neutral-800'>{user.email}</p>
            }

            {
                isEdit
                    ?
                    <input
                        className='bg-gray-100 text-lg font-medium max-w-60 mt-4 px-2 rounded-sm' type='password'
                        onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
                        // value={user.password}
                        value ={user.password}
                    />
                    :
                    <p className='font-medium text-md text-neutral-800'>*******</p>
            }

            <hr className ='bg-zinc-400 h-[1px] border-none mt-2'/>

            <div className='mt-10'>
                {
                    isEdit
                        ?
                        <button className='border border-gray-200 px-8 py-2 rounded-full hover:bg-gray-500
          hover:text-white transition-all text-white cursor-pointer bg-linear-65 from-gray-500 to-white'

                            onClick={UpdateProfileData}
                        >
                            Save Information
                        </button>
                        :
                        <button className='border border-gray-500 px-8 py-2 rounded-full hover:bg-gray-500 
          hover:text-gray-500 transition-all text-gray-600 cursor-pointer bg-linear-65 from-gray-200 to-white'

                            onClick={() => setIsEdit(true)}
                        >
                            Update Information
                        </button>
                }

            </div>

            <BottomNav/>

       </div>

      
    );
}


export default Profile ;