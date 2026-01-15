import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get redirect message from state if available
    const redirectMessage = location.state?.message;

    const { login } = useContext(AuthContext);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        login("login", { email, password });
    };

    return (
        <div className='min-h-screen bg-black flex items-center justify-center p-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 max-w-4xl xl:max-w-6xl w-full items-center'>
                
                {/** Left Section - Brand/Logo */}
                <div className='flex flex-col items-center justify-center p-4 md:p-8 order-2 lg:order-1'>
                    <div className='mb-4 md:mb-8'>
                        <img 
                            src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOx6o6LSCCNTz3wnyR1iYbmJcFrVvhHMXdG9SP"} 
                            alt="Company Logo" 
                            className='w-48 h-48 md:w-64 md:h-64 object-contain cursor-pointer transition-transform hover:scale-105'
                            onClick={() => navigate('/')}
                        />
                    </div>
                    
                    <div className='text-center px-2'>
                        <h1 className='text-2xl md:text-3xl xl:text-4xl font-bold text-taupe mb-2 md:mb-4 tracking-tight'>
                            Admin Portal
                        </h1>
                        <p className='text-taupe text-sm md:text-base lg:text-lg'>
                            Secure access to system management
                        </p>
                    </div>
                </div>

                {/** Right Section - Login Form */}
                <div className='bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl overflow-hidden border border-gray-800 order-1 lg:order-2'>
                    <div className='p-6 md:p-8 lg:p-12'>
                        {/* Header */}
                        <div className='mb-6 md:mb-8 text-center'>
                            <h2 className='text-2xl md:text-3xl font-bold text-black mb-3'>
                                Admin Login
                            </h2>
                            
                            {redirectMessage && (
                                <div className='mb-3 md:mb-4 p-3 bg-black text-white text-xs md:text-sm rounded-lg border border-gray-700'>
                                    {redirectMessage}
                                </div>
                            )}
                            
                            <p className='text-gray-600 text-sm md:text-base'>
                                Enter your credentials to access the admin panel
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={onSubmitHandler} className='space-y-4 md:space-y-6'>
                            {/* Email Field */}
                            <div>
                                <label className='block text-sm md:text-base font-medium text-gray-700 mb-2'>
                                    Email Address
                                </label>

                                <div className='relative'>
                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        placeholder="admin@example.com"
                                        className='w-full p-3 md:p-4 pl-10 md:pl-12 border border-taupe rounded-lg bg-taupe text-white placeholder-gray-200  '
                                        
                                        required
                                        autoComplete='off'
                                    />
                                    
                                    <div className='absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2'>
                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Password Field */}
                            <div>
                                <label className='block text-sm md:text-base font-medium text-gray-700 mb-2'>
                                    Password
                                </label>

                                <div className='relative'>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        type="password"
                                        placeholder="Enter your password"
                                        className='w-full p-3 md:p-4 pl-10 md:pl-12 border border-taupe rounded-lg bg-taupe text-white placeholder-gray-200  '
                                        
                                        autoComplete='off'
                                    />
                                    
                                    <div className='absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2'>
                                        <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type='submit'
                                className='w-full bg-black text-white p-3 md:p-4 rounded-lg font-medium hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 text-sm md:text-base'
                            >
                                Login to Account
                            </button>

                            {/* Divider */}
                            <div className='relative py-2 md:py-4'>
                                <div className='absolute inset-0 flex items-center'>
                                    <div className='w-full border-t border-gray-300'></div>
                                </div>
                                <div className='relative flex justify-center text-xs md:text-sm'>
                                    <span className='px-2 bg-white font-semibold text-taupe'>Secure Admin Access</span>
                                </div>
                            </div>

                            {/* Back to Home Button */}
                            <div className='pt-2 md:pt-4'>
                                <button
                                    type='button'
                                    onClick={() => navigate('/')}
                                    className='flex items-center justify-center gap-2 md:gap-3 w-full p-2 md:p-3 text-gray-600 hover:text-black transition-colors group text-sm md:text-base'
                                >
                                    <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                    </svg>
                                    <span className='font-medium text-taupe'>Back to Homepage</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    {/* Footer */}
                    <div className='bg-gray-50 px-4 md:px-8 py-3 md:py-4 border-t border-gray-300'>
                        <div className='text-center'>
                            <p className='text-xs md:text-sm text-gray-500 mb-1 md:mb-2'>
                                For security reasons, please log out when finished
                            </p>
                            <p className='text-xs text-gray-400'>
                                © {new Date().getFullYear()} Alain Company. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
// import React, { useContext, useState } from 'react' ;
// import { AuthContext } from '../../context/AuthContext';
// import { GiFastBackwardButton } from "react-icons/gi";
// import { useNavigate } from 'react-router-dom'

// const LoginPage = () => {
    
//     const [currentState, setCurrentState] = useState("login");
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isDataSubmitted, setIsDataSubmitted] = useState(false);
//     const navigate = useNavigate();

//     // login endPoint
//     const { login } = useContext(AuthContext);

//     const onSubmitHandler = (event) => {
//         event.preventDefault();

//         if (currentState === 'Sign up' && !isDataSubmitted) {
//             setIsDataSubmitted(true)
//             return ;
//         }

//         login(currentState === "Sign up" ? "signup" : "login", {fullName , email, password})
//     };

//     return (
//         <div className='min-h-screen  flex items-center justify-center
//                 gap-8 sm:justify-evenly max-sm:flex-col max-sm:gap-1 max-sm:items-center'>
//             {/** left */}
//             <img src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOx6o6LSCCNTz3wnyR1iYbmJcFrVvhHMXdG9SP"} alt=""
//                 className='w-[400px] max-sm:w-[100px] cursor-pointer ' 
//             />

//             {/** right */}
//             <form
//                 onSubmit={onSubmitHandler}
//                 className='border-2 bg-white/8 text-[#1a1a1a] border-gray-200 p-6 flex flex-col
//                         gap-6 rounded-lg shadow-lg cursor-pointer'>
//                 <h2 className='font-bold text-2xl flex justify-between items-center text-gray-500'>
//                     {currentState}
//                     {isDataSubmitted &&
//                         <FaArrowAltCircleLeft
//                             onClick={() => setIsDataSubmitted(false)}
//                             className='inline ml-2 text-white' />}

//                 </h2>

//                 {currentState === 'Sign up' && !isDataSubmitted && (

//                     <input
//                         onChange={(e) => setFullName(e.target.value)}
//                         value={fullName}
//                         type='text' className='p-2 border border-gray-200 rounded-md
//                                 focus:outline-none focus:ring-2 focus:ring-gray-400'
//                         placeholder='Full name'
//                         required
//                     />
//                 )}

//                 {!isDataSubmitted && (
//                     <>
//                         <input
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                             type="email"
//                             placeholder="Email Address"
//                             required
//                             className='p-2 border border-gray-200 rounded-md focus:outline-none
//                                     focus:ring-2 focus:ring-gray-400'
//                         />
//                         <input
//                             onChange={(e) => setPassword(e.target.value)}
//                             value={password}
//                             type="password"
//                             placeholder="Password"
//                             required
//                             className='p-2 border border-gray-200 rounded-md focus:outline-none
//                                     focus:ring-2 focus:ring-gray-400'
//                         />
//                     </>
//                 )}

//                 {currentState === "Sign up" && isDataSubmitted && (
//                     <textarea
//                         row={4}
//                         className='p-2 border border-gray-200 rounded-md focus:outline-none
//                                focus:ring-2 focus:ring-[#f6b100]'
//                         placeholder='provide a short bio...'
//                         required
//                         onChange={(e) => setBio(e.target.value)}
//                         value={bio}
//                     >

//                     </textarea>
//                 )}

//                 <button
//                     type='submit'
//                     className='bg-gradient-to-r from-gray-600 to-white p-3 text-white
//                             rounded-sm cursor-pointer'>
//                     {currentState === "Sign up" ? "Create account" : "Login Now"}
//                 </button>

//                 <div className='flex items-center gap-2 text-sm text-gray-200'>
//                     <input type='checkbox' hidden/>
//                     <p className ='hidden'>Agree to the terms of use & privacy policy.</p>
//                 </div>

//                 <div className='flex flex-col gap-2'>
//                     {currentState === "Sign up" ?
//                         (<p className='text-sm text-gray-400'>Already have an account ?
//                             <span
//                                 onClick={() => { setCurrentState('Login'); setIsDataSubmitted(false) }}
//                                 className='font-bold text-gray-500 cursor-pointer'> Login here</span></p>) :
//                         (<p className='text-sm text-gray-400'>Create a new account
//                             <span
//                                 onClick={() => setCurrentState('Sign up')}
//                                 className='font-bold text-gray-500 cursor-pointer'> Click here</span></p>)
//                     }
                    
//                     <div className ='flex items-start justify-between mt-2 p-3 bg-gradient-to-r from-white to-gray-600'>
//                         <GiFastBackwardButton 
//                             onClick={()=> navigate('/')}
//                             className ='w-5 h-5 text-gray-600'
//                         />
//                         <p 
//                             onClick={()=> navigate('/')}
//                             className ='text-sm text-white'
//                             >Go Home</p>
//                     </div>
                    

//                 </div>

//             </form>
//         </div>
//     )
// };


// export default LoginPage ;