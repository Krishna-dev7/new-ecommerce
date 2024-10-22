import Input from "./Input"
import { useState } from "react"
import axios from "axios";
import authService from "../app/authService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

  const initialData = {
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '', // New field
    email: '',
  };
  
  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState(initialData);
  const [loading, setLoading] = useState(false); // Loading state for the button
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e){
    e.preventDefault();
    const { username, password, confirmPassword } = formData;
    
    if(password !== confirmPassword) {
      setError({...error, confirmPassword: 'Passwords do not match!'});
      return false;
    }

    if(username.length < 4) {
      setError({...error, username: 'Username must be at least 4 characters long'});
      return false;
    }

    for(const key in error) {
      if(error[key]) {
        return false;
      }
    }

    setLoading(true); // Show spinner on submit

    try {
      const result = await authService.createAccount(formData);
      if(result) {
        toast.success("Signup successful!", {
          theme: 'dark',
          autoClose: 3000,
          closeButton: true,
        });
        dispatch(login(result));
        navigate("/");
      }
    } catch (error) {
      toast.error("Signup failed: " + error.message);
      console.log("Error: ", error.message);
    } finally {
      setLoading(false); // Hide spinner
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-800">
      <ToastContainer />
      <div className="w-1/3 p-6 shadow-lg rounded-md bg-white">
        <h1 className="text-indigo-600 text-center font-bold text-2xl">Signup Form</h1>
        <hr className="border-indigo-500 border-2 mt-2" />
        <form onSubmit={handleSubmit}>
        
          <div className="w-full">
            <Input
              type="text"
              placeholder="Enter username"
              label="Username"
              className="px-3 py-2 w-full text-black"
              value={formData.username}
              error={error.username}
              onChange={ (e) => setFormData( { ...formData, username: e.target.value.trim() } ) }
              onBlur={() => {
                axios.get(`/api/users/search?username=${formData.username}`)
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

          <div className="w-full mt-3">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter full name"
              className="px-3 py-2 w-full"
              error={error.fullName}
              value={ formData.fullName }
              onChange={ (e) => setFormData( { ...formData, fullName: e.target.value } ) }
            />
          </div>

          <div className="w-full mt-3">
            <Input
              type="password"
              label="Password"
              placeholder="Enter password"
              error={error.password}
              value={formData.password}
              onBlur={ e => {
                const regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
                if (!regx.test(e.target.value)) {
                  setError({ ...error, password: 'Password must contain letters and numbers, minimum of 8 characters' });
                  return;
                }
                setError({ ...error, password: '' });
              }}
              onChange={ e => setFormData( { ...formData, password: e.target.value } ) }
            />
          </div>

          <div className="w-full mt-3">
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
              error={error.confirmPassword}
              value={formData.confirmPassword}
              onChange={ e => setFormData( { ...formData, confirmPassword: e.target.value } ) }
            />
          </div>

          <div className="w-full mt-3">
            <Input
              type="email"
              label="Email"
              placeholder="Enter email"
              error={error.email}
              value={formData.email}
              onBlur={ () => {
                axios.get(`/api/users/search?email=${formData.email}`)
                  .then(res => {
                    if (res.data.length > 0) {
                      setError({ ...error, email: 'Email already in use' });
                    } else {
                      setError({ ...error, email: '' });
                    }
                  })
                  .catch(err => setError({ ...error, email: err.message }));
              }}
              onChange={ e => setFormData( { ...formData, email: e.target.value } ) }
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <button 
              type="submit" 
              className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex justify-center items-center"
              disabled={loading}>
              {loading ? <div className="loader"></div> : 'Submit'}
            </button>
            <button 
              type="reset" 
              className="px-5 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => setFormData(initialData)}>
              Reset
            </button>
          </div>
        
        </form>
      </div>
    </div>
  )
}

export default Signup;

