import React from 'react'

function Banner() {
    return (
        <section className='bg-[#F4F4F4] flex justify-center items-center py-2 mt-3'>
            <div className='flex justify-between items-center gap-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-[#000000] cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>

                <span className='text-[#000000] text-sm font-medium'>Get 10% off on business sign up</span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-[#000000] cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>

            </div>
        </section>
    )
}

export default Banner