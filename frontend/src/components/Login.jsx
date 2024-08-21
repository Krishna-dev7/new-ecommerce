import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";
import authService from "../app/authService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import video from "../assets/login.mp4";

function Login() {

  const initialState = {
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({...initialState, common: ''});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const design = "text-black border border-1 border-black px-4 py-3 w-full"

  async function handleLogin(e) {
    e.preventDefault();

    for(const keys in error) {
      if(error[keys]) {
        return false;
      }
    }

    const loginResult = await authService.login(formData);
    if(loginResult) {
      console.log(loginResult);
      dispatch(login(loginResult));
      navigate("/");
    }
    return false;
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="login w-2/3 h-3/4 -mt-20 flex justify-normal items-center shadow-lg rounded-md border-solid border border-1 border-black">
        <div className="left h-full bg-purple-300 w-1/2">
          <video src={video} className="w-full h-full object-cover" autoplay="true" loop="true" ></video>
        </div>
        <div className="right bg-purple-200 flex flex-col justify-center items-center w-1/2 h-full gap-10 ">
          <h1 className="text-center text-3xl" > Login </h1>
          <form
            className="w-full h-fit"
            onSubmit={ e => handleLogin(e) } >
            
            <div className="email ">
              <Input
                type="email"
                placeholder="enter email"
                value={formData.email}
                label="Enter email: "
                className={design}
                error={error.email}
                onChange={ e => setFormData({...formData, email: e.target.value.trim()}) } />
            </div>

            <div className="password">
              <Input
                type="password"
                placeholder="enter password"
                value={formData.password}
                className={design}
                label="Enter password: "
                error={error.password}
                onBlur={  e => {
                    if(!e.target.value.length < 8) {
                      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
                      if(!regex.test(e.target.value)) {
                        setError({...error, password: 'password must contain letters and digits'})
                        return false;
                      }
                      setError({...error, password: ''});
                    } else {
                      setError({...error, password: 'password must contain characters of 8 length'})
                      return false;
                    }
                  } 
                }
                onChange={ e => setFormData({...formData, password: e.target.value.trim()}) } />
            </div>
            <div className="flex justify-center">
            <button type="submit" className="px-8 py-3 text-black text-lg border border-1 border-black bg-pink-300 rounded-md font-normal">Login</button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;