import React, { useEffect, useState } from 'react'
import supabase from '../../supabase/supabase'
import { useDispatch, useSelector } from 'react-redux'
import { addCheckedItem, unCheckItem } from '../../redux/functions/checked'

function Checkbox({ categoryName, isChecked }) {
  const [checked, setChecked] = useState(isChecked)
  const [progress, setProgress] = useState(false)
  const { user } = useSelector(state => state.authSlice)
  const dispatch = useDispatch()

  // console.log("checkbox", isChecked);
  useEffect(() => {
    setChecked(isChecked)
  }, [isChecked])

  const onClick = (e) => {
    if (!progress) {
      setProgress(true)
      setChecked(!checked)
      onChecked()
    }
  }
  const onChecked = async (e) => {
    try {
      if (checked) {
        const { data, error } = await supabase
          .from('category')
          .delete()
          .eq('name', categoryName)
          .eq('user_id', user.user_id)
          .select()
        dispatch(unCheckItem(data[0]))
        console.log(data);
        console.log(error);
        setProgress(false)
      }
      else {
        const { data, error } = await supabase
          .from('category')
          .insert({
            name: categoryName,
            user_id: user.user_id
          })
          .select()
        dispatch(addCheckedItem(data[0]))
        console.log("data", data);
        console.log("error", error);
        setProgress(false)
      }
    } catch (error) {
      console.log(error);
      setProgress(false)
    }
  }
  return (
    <>
      <div className='flex items-center'>
        <div class="inline-flex items-center">
          <label
            class="relative flex cursor-pointer items-center rounded-full"
            for="checkbox-6"
            data-ripple-dark="true"
          >
            <input
              onClick={onClick}
              type="checkbox"
              class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-500 checked:bg-indigo-500 checked:before:bg-indigo-500 hover:before:opacity-10"
              id="checkbox-6"
              checked={checked}
            />
            <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
        </div>
        <span className='font-normal ml-2 cursor-pointer select-none' onClick={onClick}>{categoryName}</span>
      </div >
    </>
  )
}

export default Checkbox