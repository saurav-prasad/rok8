import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Category from './components/category/Category';
import Header from './components/header/Header';
import Login from './components/login/Login';
import OtpScreen from './components/otpScreen/OtpScreen';
import Signup from './components/signup/Signup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './redux/functions/auth';
import supabase from './supabase/supabase';
import { checkedItems } from './redux/functions/checked';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData() {
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if (storedUser) {
        console.log(storedUser);
        dispatch(login(storedUser))
        try {
          const { data, error } = await supabase
            .from('category')
            .select()
            .eq('user_id', storedUser.user_id)
          dispatch(checkedItems(data))
          if (error) {
            throw error;
          }
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    return () => fetchData()
  }, [])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <Category />
      </>,
    },
    {
      path: '/login',
      element: <>
        <Login />
      </>
    },
    {
      path: '/signup',
      element: <>
        <Signup />
      </>
    },
    {
      path: "otp",
      element: <>
        <OtpScreen />
      </>
    },
  ])

  return (
    <div className="">
      <Header />
      <div className='flex justify-center items-center'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
