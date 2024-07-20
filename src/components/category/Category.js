import React, { useEffect } from 'react'
import Checkbox from './Checkbox'
import { faker } from '@faker-js/faker';
import supabase from '../../supabase/supabase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Category() {
  const { user } = useSelector(state => state.authSlice)
  const navigate = useNavigate()


  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

  return (
    <div className='border border-[#C1C1C1] rounded-2xl p-8 mt-10'>
      <h1 className='md:text-3xl text-2xl font-bold w-full text-center mb-4'>Please mark your interests!</h1>
      <p className='text-[16px] font-normal w-full text-center'>We will keep you notified.</p>

      <div className='mt-8'>
        <p className='font-medium text-xl'>My saved interests!</p>
        <div className='flex flex-col justify-start gap-3 mt-4'>
          {
            Array.from({ length: 6 }).map(() => <>
              <div className='flex items-center'><Checkbox /><span className='font-normal ml-2'>{faker.commerce.product()}</span> </div>
            </>)
          }
        </div>
      </div>
    </div>
  )
}

export default Category