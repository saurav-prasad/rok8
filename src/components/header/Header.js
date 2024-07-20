import { } from '@heroicons/react/16/solid'
import React from 'react'
import Banner from '../banner/Banner'
import { useDispatch, useSelector } from 'react-redux'
import sliceString from '../../function/sliceString'
import { logout } from '../../redux/functions/auth'
import { useNavigate } from 'react-router-dom'

function Header() {
    const { user } = useSelector(state => state.authSlice)
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const logoutBtn = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    return (
        <>
            <header className='flex flex-col md:px-8 px-2 py-3 bg-white gap-2'>
                {/* first header */}
                <div className='flex justify-end items-center'>
                    <ul className='text-[#333333] font-medium text-sm flex gap-3 items-center'>
                        <li className='cursor-pointer transition-all hover:underline'>Help</li>
                        <li className='cursor-pointer transition-all hover:underline'>Orders & Returns</li>
                        {
                            user ? <li className='cursor-pointer transition-all hover:underline'>Hi, <span>{sliceString(user?.email, 10)}</span></li> :
                                <li  className='cursor-pointer transition-all hover:underline'>Login</li>
                        }
                    </ul>
                    {
                        user &&
                        <button
                            onClick={logoutBtn}
                            type="button"
                            className="ml-3 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            LOGOUT
                        </button>
                    }
                </div>
                {/* second header */}
                <div className='flex md:flex-row md:items-end md:justify-between flex-col'>
                    <h1 className='text-[#000000] text-3xl font-bold cursor-default'>ECOMMERCE</h1>

                    <ul className='text-[#000000] md:text-lg text-xs font-medium md:gap-6 gap-2 flex justify-center'>
                        <li className='cursor-pointer hover:underline transition-all'>Categories</li>
                        <li className='cursor-pointer hover:underline transition-all'>Sale</li>
                        <li className='cursor-pointer hover:underline transition-all'>Clearance</li>
                        <li className='cursor-pointer hover:underline transition-all'>New Stock</li>
                        <li className='cursor-pointer hover:underline transition-all'>Trending</li>
                    </ul>

                    <div className='md:flex items-center gap-6 hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#333333] cursor-pointer transition-all hover:scale-[3] hover:rotate-[800deg] duration-[900ms]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-[#333333] cursor-pointer transition-all hover:scale-[1.3] hover:-rotate-180 duration-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </div>

                </div>
            </header >
            <Banner />
        </>
    )
}

export default Header