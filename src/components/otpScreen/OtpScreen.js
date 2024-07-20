import React from 'react'

function OtpScreen() {
    const otpInputs = document.querySelectorAll('.otp-input');

    otpInputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            if (input.value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });

    return (
        <div className='border border-[#C1C1C1] rounded-2xl sm:p-12 p-5 mt-10 sm:w-[34rem] w-[90%]'>
            <h1 className='md:text-3xl text-2xl font-bold w-full text-center mb-8'>Verify your email</h1>
            <p className='md:text-[1rem] text-lg font-normal w-full text-center'>Enter the 8 digit code you have received on </p>
            <h3 className='md:text-[1rem] text-sm font-medium w-full text-center mb-2'>swa***@gmail.com</h3>
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
            </div>

            {/* btn */}
            <div className='w-full mt-14'>
                <button
                    type="button"
                    class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-normal leading-7 text-white hover:bg-black/80"
                >
                    VERIFY
                </button>
            </div>
        </div>
    )
}

export default OtpScreen