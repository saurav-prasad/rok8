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

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      dispatch(login(JSON.parse(localStorage.getItem('user'))))
    }
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
