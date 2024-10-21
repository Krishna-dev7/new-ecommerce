import Input from "./Input";
import { useState } from "react";
import axios from "axios";
import authService from "../app/authService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import conf from "../conf/conf.js";
axios.defaults.baseURL=conf.hosturl;

function Signup() {
  const initialData = {
    username: '',
    fullName: '',
    password: '',
    email: '',
  };

  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(initialData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const { username } = formData;

    if (username.length < 4) {
      setError({ ...error, username: 'Username length must be greater than 4' });
      return false;
    }

    for (const keys in error) {
      if (error[keys]) {
        return false;
      }
    }

    try {
      const result = await authService.createAccount(formData);
      if (result) {
        toast("Signup successful!", {
          theme: 'dark',
          autoClose: 3000,
          closeButton: true,
        });
        dispatch(login(result));
        navigate("/");
      }
    } catch (error) {
      console.log("Create account error: ", error.message);
    }

    return false;
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gray-100 p-4">
      <ToastContainer role="success" />
      <div className="w-full max-w-md p-6 shadow-lg rounded-md bg-white border border-gray-300">
        <h1 className="text-deep-blue text-center font-bold text-2xl mb-4">Signup Form</h1>
        <hr className="border border-deep-blue mb-4" />
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          <div className="w-full">
            <Input
              type="text"
              placeholder="Enter username"
              label="Username"
              className={`w-full px-3 py-2 text-black ${error.username ? 'border-red-500' : 'border-gray-300'} border rounded-md`}
              value={formData.username}
              error={error.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value.trim() })}
              onBlur={() => {
                axios
                  .get(`/api/users/search?username=${formData.username}`)
                  .then(res => {
                    if (res.data.length > 0) {
                      setError({ ...error, username: 'Username already exists' });
                    } else {
                      setError({ ...error, username: '' });
                    }
                  })
                  .catch(err => setError({ ...error, username: err.message }));
              }}
            />
          </div>

          <div className="w-full">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter full name"
              className={`w-full px-3 py-2 ${error.fullName ? 'border-red-500' : 'border-gray-300'} border rounded-md`}
              error={error.fullName}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="w-full">
            <Input
              type="password"
              label="Password"
              placeholder="Enter password"
              className={`w-full px-3 py-2 ${error.password ? 'border-red-500' : 'border-gray-300'} border rounded-md`}
              error={error.password}
              value={formData.password}
              onBlur={(e) => {
                if (e.target.value.length >= 8) {
                  const regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
                  if (!regx.test(e.target.value)) {
                    setError({
                      ...error,
                      password: 'Password must contain at least 8 characters, including digits and letters',
                    });
                    return false;
                  }
                  setError({ ...error, password: '' });
                } else {
                  setError({ ...error, password: 'Password length must be greater than 8 characters' });
                }
              }}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div className="w-full">
            <Input
              type="email"
              label="Email"
              placeholder="Enter email"
              className={`w-full px-3 py-2 ${error.email ? 'border-red-500' : 'border-gray-300'} border rounded-md`}
              error={error.email}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onBlur={() => {
                axios
                  .get(`/api/users/search?email=${formData.email}`)
                  .then(res => {
                    if (res.data.length > 0) {
                      setError({ ...error, email: 'Email already in use, try another' });
                    } else {
                      setError({ ...error, email: '' });
                    }
                  })
                  .catch(err => setError({ ...error, email: err.message }));
              }}
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button type="submit" className="w-full py-2 text-white bg-deep-blue hover:bg-deep-blue-dark rounded-md transition duration-200">
              Submit
            </button>
            <button type="reset" className="w-full py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md transition duration-200">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
