import React, { useEffect, useState } from 'react'
import Checkbox from './Checkbox'
import { faker } from '@faker-js/faker';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/16/solid';

function Category() {
  const { user } = useSelector(state => state.authSlice)
  const items = useSelector(state => state.checkedSlice)

  const navigate = useNavigate()
  const [categoryitems, setCategoryItems] = useState([])
  const [prePage, setPrePage] = useState(0)
  const [nextPage, setNextPage] = useState(6)
  const [timesClick, setTimesClick] = useState(1)

  useEffect(() => {
    const randomItems = Array.from({ length: 200 }).map(() => faker.commerce.product())
    setCategoryItems(randomItems)
    if (!user) {
      navigate('/login')
    }
  }, [user])

  const isItemChecked = (itemName) => {
    const a = items.some(data => data.name === itemName);
    return a
  };

  const onPreClick = () => {
    if (nextPage > 6) {
      setTimesClick(timesClick - 1)
      setPrePage(prePage - 6)
      setNextPage(nextPage - 6)
    }
  }
  const onNextClick = () => {
    if (nextPage >= 6 && nextPage < 194) {
      setTimesClick(timesClick + 1)
      setNextPage(nextPage + 6)
      setPrePage(prePage + 6)
    }
  }

  return (
    <div className='border border-[#C1C1C1] rounded-2xl p-8 mt-10'>
      <h1 className='md:text-3xl text-2xl font-bold w-full text-center mb-4'>Please mark your interests!</h1>
      <p className='text-[16px] font-normal w-full text-center'>We will keep you notified.</p>

      <div className='mt-8'>
        <p className='font-medium text-xl'>My saved interests!</p>
        <div className='flex flex-col justify-start gap-3 mt-4'>
          {
            categoryitems?.slice(prePage, nextPage).map((item) => <>
              <Checkbox categoryName={item} isChecked={isItemChecked(item)} />
            </>)
          }
        </div>
        {/* pagination */}
        <div className='flex mt-5 gap-1'>
          <ChevronLeftIcon onClick={onPreClick} className='w-8 cursor-pointer' />
          <div className='text-lg flex gap-2'>
            <span className='select-none '>{timesClick > 1 && timesClick - 1}</span>
            <span className='select-none underline'>{timesClick}</span>
            <span className='select-none '>{timesClick + 1}</span>
          </div>
          <ChevronRightIcon onClick={onNextClick} className='w-8 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Category