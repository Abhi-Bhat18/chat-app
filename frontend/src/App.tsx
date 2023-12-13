import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {login} from './features/Auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, useAppSelector } from './store';


function App() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
const userDetails = useAppSelector((state) => state.authReducer)

  const checkLogin = async () => {
    try {
      const res = await axios.get('http://localhost:1337/api/v1/auth/checkLogin',
        {
          withCredentials: true
        })
      if (res.status == 200) {
        console.log('user logged in successfully')
        console.log(res.data);
        dispatch(login(res.data))
      }

    } catch (error) {
      console.log('Error block')
      console.log(error);
      navigate('/login')
    }

  }

  useEffect(() => {

    checkLogin();

  }, [])

  return (
    <>
    {userDetails.user.user.fullName}
      This is the home
    </>
  )
}

export default App
