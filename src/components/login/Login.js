import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../../supabase/supabase'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/functions/auth'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authSlice)
    const [errorMsg, setErrorMsg] = useState("")
    const [authInfo, setAuthInfo] = useState({ email: null, password: null })
    const [showPassword, setShowPassword] = useState('text')

    const loginUser = async (e) => {
        e.preventDefault()

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: authInfo.email,
                password: authInfo.password,
            })
            if (error !== null) {
                setErrorMsg(error.toString())
                setTimeout(() => {
                    setErrorMsg("")
                }, 3000);
            }
            if (data.user !== null) {
                dispatch(login({ user_id: data.user.id, email: data.user.email }))
                localStorage.setItem("user", JSON.stringify({ user_id: data.user.id, email: data.user.email }))
                navigate('/')
            }
        } catch (error) {
            setErrorMsg(error.toString())
            setTimeout(() => {
                setErrorMsg("")
            }, 3000);
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <div className='border border-[#C1C1C1] rounded-2xl sm:p-12 p-5 mt-10 sm:w-[34rem] w-[90%]'>
            <h1 className='md:text-3xl text-2xl font-bold w-full text-center mb-8'>Login</h1>
            <h3 className='md:text-[1.3rem] text-xl font-medium w-full text-center mb-2'>Welcome back to ECOMMERCE</h3>
            <p className='md:text-sm text-2xl font-normal w-full text-center mb-8'>The next gen business marketplace</p>
            <form onSubmit={loginUser} className='flex flex-col gap-5 sm:mb-10 mb-2'>
                {/* Email     */}
                <div class="sm:col-span-3">
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div class="mt-1">
                        <input required onChange={(e) => {
                            setAuthInfo(prevState => ({
                                ...prevState,
                                email: e.target.value
                            }));
                        }} type="email" name="name" id="name" autocomplete="given-name" placeholder='Enter' class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1C1C1] sm:text-[16px] sm:leading-6" />
                    </div>
                </div>
                {/* Password     */}
                <div class="sm:col-span-3">
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-1 flex relative">
                        <input onChange={(e) => {
                            setAuthInfo(prevState => ({
                                ...prevState,
                                password: e.target.value
                            }));
                        }} type={showPassword} name="name" id="name" autocomplete="given-name" placeholder='Enter' class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1C1C1] sm:text-[16px] sm:leading-6" />
                        <span onClick={() => showPassword === "text" ? setShowPassword('password') : setShowPassword('text')} className='text-[#000000] text-xs font-medium cursor-pointer transition-all ml-3 select-none absolute right-2 top-[20%]'>{showPassword === "text" ?<VisibilityOffIcon/> : <VisibilityIcon/>}</span>
                    </div>
                    {/* error texts */}
                    <p className="text-red-600 mt-2 text-sm font-medium text-center w-full">
                        {errorMsg}
                    </p>
                </div>
                <div className=''>
                    <button
                        type="submit"
                        class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-normal leading-7 text-white hover:bg-black/80"
                    >
                        LOGIN
                    </button>
                </div>
                <div className='bg-[#C1C1C1] w-full mt-3 h-[0.09rem]'></div>
                <p className='text-[#333333] text-center font-normal
                '>Don’t have an Account?<span onClick={() => { navigate('/signup') }} className='text-[#000000] font-medium cursor-pointer hover:underline transition-all ml-3 select-none'>SIGN UP</span></p>
            </form >
        </div >
    )
}

export default Login