import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";
import authService from "../app/authService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";

function Login() {

  const initialState = {
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({...initialState, common: ''});
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <div className="flex justify-center items-center h-screen w-full bg-zinc-700">
      <div className="login w-96 p-6 shadow-lg bg-zinc-950 rounded-md border-solid border-4 border-indigo-600">
      <h1 className="text-white text-center font-bold text-xl  decoration-green-400">Login</h1>
      <hr className="border-double border-indigo-600 border-2 mt-2"></hr>
      <form
        onSubmit={ e => handleLogin(e) } >
        <div className="email">
          <Input
            type="email"
            placeholder="enter email"
            value={formData.email}
            label="Enter email: "
            error={error.email}
            onChange={ e => setFormData({...formData, email: e.target.value.trim()}) } />
        </div>

        <div className="password">
          <Input
            type="password"
            placeholder="enter password"
            value={formData.password}
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
        <button type="submit" className="px-5 py-2  text-black border-black bg-orange-400 rounded-md text-white font-bold">Login</button>
        </div>
        
      </form>
      </div>
    </div>
  )
}

export default Login;