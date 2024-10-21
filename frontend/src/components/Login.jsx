import Input from "./Input";
import { useState } from "react";
import authService from "../app/authService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import video from "../assets/login.mp4";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const initialState = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({ ...initialState, common: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const design = "text-black border border-1 border-gray-400 px-4 py-3 w-full rounded-md";

  async function handleLogin(e) {
    e.preventDefault();

    for (const keys in error) {
      if (error[keys]) {
        return false;
      }
    }

    const loginResult = await authService.login(formData);
    if (loginResult) {
      toast.success("Login successful!", {
        theme: 'dark',
        autoClose: 2000,
        closeOnClick: true
      });
      dispatch(login(loginResult));
      navigate("/");
    }
    return false;
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-light-cream p-4">
      {/* <ToastContainer /> */}
      <div className="login w-full max-w-2xl h-3/4 flex shadow-lg rounded-md border border-gray-300 overflow-hidden">
        
        {/* Video Section - Hidden on Mobile */}
        <div className="left h-full bg-soft-yellow w-1/2 hidden md:block">
          <video src={video} className="w-full h-full object-cover" autoPlay loop muted />
        </div>

        {/* Form Section */}
        <div className="right flex flex-col justify-center items-center w-full md:w-1/2 h-full gap-8 bg-light-cream p-6">
          <h1 className="text-center text-3xl font-semibold text-dark-gray">Login</h1>
          <form className="w-full" onSubmit={e => handleLogin(e)}>
            <div className="email mb-4">
              <Input
                type="email"
                placeholder="Enter email"
                value={formData.email}
                label="Email"
                className={design}
                error={error.email}
                onChange={e => setFormData({ ...formData, email: e.target.value.trim() })} />
            </div>

            <div className="password mb-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                className={design}
                label="Password"
                error={error.password}
                onBlur={e => {
                  if (!e.target.value.length < 8) {
                    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
                    if (!regex.test(e.target.value)) {
                      setError({ ...error, password: 'Password must contain letters and digits' });
                      return false;
                    }
                    setError({ ...error, password: '' });
                  } else {
                    setError({ ...error, password: 'Password must contain at least 8 characters' });
                    return false;
                  }
                }}
                onChange={e => setFormData({ ...formData, password: e.target.value.trim() })} />
            </div>

            <div className="flex justify-center">
              <button type="submit" className="px-8 py-3 text-white text-lg bg-green-500 rounded-md font-normal hover:bg-dark-green transition duration-200">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
