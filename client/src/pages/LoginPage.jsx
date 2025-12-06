import React, { useContext, useState } from 'react' ;
import { AuthContext } from '../../context/AuthContext';
import { GiFastBackwardButton } from "react-icons/gi";
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    
    const [currentState, setCurrentState] = useState("login");
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDataSubmitted, setIsDataSubmitted] = useState(false);
    const navigate = useNavigate();

    // login endPoint
    const { login } = useContext(AuthContext);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (currentState === 'Sign up' && !isDataSubmitted) {
            setIsDataSubmitted(true)
            return ;
        }

        login(currentState === "Sign up" ? "signup" : "login", {fullName , email, password})
    };

    return (
        <div className='min-h-screen  flex items-center justify-center
                gap-8 sm:justify-evenly max-sm:flex-col max-sm:gap-1 max-sm:items-center'>
            {/** left */}
            <img src={"https://qhog2afd8z.ufs.sh/f/QPIkmpwp4jFOx6o6LSCCNTz3wnyR1iYbmJcFrVvhHMXdG9SP"} alt=""
                className='w-[400px] max-sm:w-[100px] cursor-pointer ' 
            />

            {/** right */}
            <form
                onSubmit={onSubmitHandler}
                className='border-2 bg-white/8 text-[#1a1a1a] border-gray-200 p-6 flex flex-col
                        gap-6 rounded-lg shadow-lg cursor-pointer'>
                <h2 className='font-bold text-2xl flex justify-between items-center text-gray-500'>
                    {currentState}
                    {isDataSubmitted &&
                        <FaArrowAltCircleLeft
                            onClick={() => setIsDataSubmitted(false)}
                            className='inline ml-2 text-white' />}

                </h2>

                {currentState === 'Sign up' && !isDataSubmitted && (

                    <input
                        onChange={(e) => setFullName(e.target.value)}
                        value={fullName}
                        type='text' className='p-2 border border-gray-200 rounded-md
                                focus:outline-none focus:ring-2 focus:ring-gray-400'
                        placeholder='Full name'
                        required
                    />
                )}

                {!isDataSubmitted && (
                    <>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Email Address"
                            required
                            className='p-2 border border-gray-200 rounded-md focus:outline-none
                                    focus:ring-2 focus:ring-gray-400'
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Password"
                            required
                            className='p-2 border border-gray-200 rounded-md focus:outline-none
                                    focus:ring-2 focus:ring-gray-400'
                        />
                    </>
                )}

                {currentState === "Sign up" && isDataSubmitted && (
                    <textarea
                        row={4}
                        className='p-2 border border-gray-200 rounded-md focus:outline-none
                               focus:ring-2 focus:ring-[#f6b100]'
                        placeholder='provide a short bio...'
                        required
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                    >

                    </textarea>
                )}

                <button
                    type='submit'
                    className='bg-gradient-to-r from-gray-600 to-white p-3 text-white
                            rounded-sm cursor-pointer'>
                    {currentState === "Sign up" ? "Create account" : "Login Now"}
                </button>

                <div className='flex items-center gap-2 text-sm text-gray-200'>
                    <input type='checkbox' hidden/>
                    <p className ='hidden'>Agree to the terms of use & privacy policy.</p>
                </div>

                <div className='flex flex-col gap-2'>
                    {currentState === "Sign up" ?
                        (<p className='text-sm text-gray-400'>Already have an account ?
                            <span
                                onClick={() => { setCurrentState('Login'); setIsDataSubmitted(false) }}
                                className='font-bold text-gray-500 cursor-pointer'> Login here</span></p>) :
                        (<p className='text-sm text-gray-400'>Create a new account
                            <span
                                onClick={() => setCurrentState('Sign up')}
                                className='font-bold text-gray-500 cursor-pointer'> Click here</span></p>)
                    }
                    
                    <div className ='flex items-start justify-between mt-2 p-3 bg-gradient-to-r from-white to-gray-600'>
                        <GiFastBackwardButton 
                            onClick={()=> navigate('/')}
                            className ='w-5 h-5 text-gray-600'
                        />
                        <p 
                            onClick={()=> navigate('/')}
                            className ='text-sm text-white'
                            >Go Home</p>
                    </div>
                    

                </div>

            </form>
        </div>
    )
};


export default LoginPage ;