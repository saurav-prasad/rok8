import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/functions/auth';
import { faker } from '@faker-js/faker';
import emailjs from "@emailjs/browser";

function OtpScreen() {
    const otpInputs = document.querySelectorAll('.otp-input');
    const [otp, setOtp] = useState("")
    const [inputOtp, setInputOtp] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const authData = useSelector(state => state.otpSlice)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    otpInputs.forEach((input, index) => {
        try {

            input.addEventListener('input', () => {
                if (input.value.length === 1) {
                    if (index < otpInputs.length - 1) {
                        otpInputs[index + 1].focus();
                    }
                    setInputOtp(() => inputOtp + input.value);
                }
            });

            input.addEventListener('keydown', (e) => {
                console.log(e);
                if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                    otpInputs[index - 1].focus();
                    setInputOtp(() => inputOtp.slice(0, inputOtp.length - 2));
                }
            });
        } catch (error) {
            console.log(error);
        }
    });

    const onOtpSubmit = async (e) => {
        e.preventDefault()
        try {
            if (inputOtp !== otp) {
                throw new Error("Please enter a valid otp")
            }
            const { data, error } = await supabase.auth.signUp({
                email: authData.email,
                password: authData.password,
            })

            if (error !== null) {
                setErrorMsg(error.toString())
                setTimeout(() => {
                    setErrorMsg("")
                }, 3000);
            }
            if (data.user !== null) {
                navigate('/')
                dispatch(login({ user_id: data.user.id, email: data.user.email, password: data }))
                localStorage.setItem("user", JSON.stringify({ user_id: data.user.id, email: data.user.email }))
            }
        } catch (error) {
            console.log(error);
            setErrorMsg(error.toString())
            setTimeout(() => {
                setErrorMsg("")
            }, 3000);
        }
    }

    useEffect(() => {
        if (authData.email.length === 0) {
            navigate('/signup')
            return
        }
        async function sendData() {
            const freshOtp = faker.internet.password({
                length: 8,
                pattern: /[a-z]/
            })
            setOtp(freshOtp)

            await emailjs.send(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPELATE_ID,
                {
                    from_name: "saurav",
                    from_email: 'sauravprasad2050@gmail.com',
                    to_email: authData.email,
                    message: freshOtp,
                },
                process.env.REACT_APP_PUBLIC_ID
            );
        }
        return () => sendData()

    }, [authData])

    return (
        <form onSubmit={onOtpSubmit} className='border border-[#C1C1C1] rounded-2xl sm:p-12 p-5 mt-10 sm:w-[34rem] w-[90%]'>
            <h1 className='md:text-3xl text-2xl font-bold w-full text-center mb-8'>Verify your email</h1>
            <p className='md:text-[1rem] text-lg font-normal w-full text-center'>Enter the 8 digit code you have received on </p>
            <h3 className='md:text-[1rem] text-sm font-medium w-full text-center mb-2'>{authData.email}</h3>
            {/* otp */}
            <div className='flex gap-1 w-full items-start justify-center flex-col mt-16'>
                <p className='text-[1rem] font-normal pl-1'>Code</p>
                <div class="otp-inputs flex gap-2 w-full">
                    <input type="text" maxlength="1" class="otp-input text-center text-xl sm:w-12 sm:h-12 w-8 h-8 rounded-md border border-[#C1C1C1]" />
                    <input type="text" maxlength="1" class="otp-input text-center text-xl sm:w-12 sm:h-12 w-8 h-8 rounded-md border border-[#C1C1C1]" />
                    <input type="text" maxlength="1" class="otp-input text-center text-xl sm:w-12 sm:h-12 w-8 h-8 rounded-md border border-[#C1C1C1]" />
                    <input type="text" maxlength="1" class="otp-input text-center text-xl sm:w-12 sm:h-12 w-8 h-8 rounded-md border border-[#C1C1C1]" />
                    <input type="text" maxlength="1" class="otp-input text-center text-xl sm:w-12 sm:h-12 w-8 h-8 rounded-md border border-[#C1C1C1]" />
                    <input type="text" maxlength="1" class="otp-input text-center text-xl sm:w-12 sm:h-12 w-8 h-8 rounded-md border border-[#C1C1C1]" />
                    <input type="text" maxlength="1" class="otp-input text-center text-xl sm:w-12 sm:h-12 w-8 h-8 rounded-md border border-[#C1C1C1]" />
                    <input type="text" maxlength="1" class="otp-input text-center text-xl sm:w-12 sm:h-12 w-8 h-8 rounded-md border border-[#C1C1C1]" />
                </div>
                {/* error texts */}
                <p className="text-red-600 text-sm font-medium text-center w-full">
                    {errorMsg}
                </p>
            </div>

            {/* btn */}
            <div className='w-full mt-14'>
                <button
                    type="submit"
                    class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-normal leading-7 text-white hover:bg-black/80"
                >
                    VERIFY
                </button>
            </div>
        </form>
    )
}

export default OtpScreen