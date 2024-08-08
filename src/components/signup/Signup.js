import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { otp } from '../../redux/functions/otp'

function Signup() {
    const navigate = useNavigate()
    const [authInfo, setAuthInfo] = useState({ email: null, password: null })
    const { user } = useSelector(state => state.authSlice)
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState('text')

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    const signUpUser = async (e) => {
        e.preventDefault()
        dispatch(otp({ email: authInfo.email, password: authInfo.password }))
        navigate('/otp')
    }

    return (
        <div className='border border-[#C1C1C1] rounded-2xl sm:p-12 p-5 mt-10 sm:w-[34rem] w-[90%]'>
            <h1 className='md:text-3xl text-2xl font-bold w-full text-center mb-8'>Create your account</h1>
            <form onSubmit={signUpUser} className='flex flex-col gap-5 sm:mb-10 mb-2'>
                {/* Name     */}
                <div class="sm:col-span-3">
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                    <div class="mt-1">
                        <input type="text" name="name" id="name" autocomplete="given-name" placeholder='Enter' class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1C1C1] sm:text-[16px] sm:leading-6" />
                    </div>
                </div>
                {/* Email     */}
                <div class="sm:col-span-3">
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div class="mt-1">
                        <input required onChange={(e) => {
                            setAuthInfo(prevState => ({
                                ...prevState,
                                email: e.target.value
                            }));
                        }} type="email" name="email" id="email" autocomplete="given-email" placeholder='Enter' class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1C1C1] sm:text-[16px] sm:leading-6" />
                    </div>
                </div>
                {/* Password     */}
                <div class="sm:col-span-3">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-1 flex relative">
                        <input onChange={(e) => {
                            setAuthInfo(prevState => ({
                                ...prevState,
                                password: e.target.value
                            }));
                        }} minLength={6} type={showPassword} name="name" id="name" autocomplete="given-name" placeholder='Enter' class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#C1C1C1] sm:text-[16px] sm:leading-6" />
                        <span onClick={() => showPassword === "text" ? setShowPassword('password') : setShowPassword('text')} className='text-[#000000] text-xs font-medium cursor-pointer hover:underline transition-all ml-3 select-none absolute right-2 top-[20%]'>{showPassword === "text" ? <VisibilityOffIcon /> : <VisibilityIcon />}</span>
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-normal leading-7 text-white hover:bg-black/80"
                    >
                        CREATE ACCOUNT
                    </button>
                </div>
                <p className='text-[#333333] text-center mt-8 font-normal
                '>Have an Account? <span onClick={() => { navigate('/login') }} className='text-[#000000] font-medium cursor-pointer hover:underline transition-all ml-3 select-none'>LOGIN</span></p>
            </form>

        </div>
    )
}

export default Signup