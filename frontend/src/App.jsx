import authService from './app/authService.js'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice.js'
import { useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect( ()=>{
    authService
      .getCurrentUser()
      .then(user => {
        console.log("USER: ", user);
        if (user) {
          return dispatch(login(user))
        }
        dispatch(logout());
        navigate("/")
      })
  }, []);

  return (
    <>
      <div className='layout gap-5 w-full min-h-screen h-fit flex flex-col overflow-x-hidden justify-between items-center' >
        <div className='navbar-div fixed' >
        <Navbar />
        </div>
        <div className='h-fit mt-20 min-h-screen max-h-fit gorw' >
          <Outlet />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App