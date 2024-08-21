import Input from "./Input"
import { useState } from "react"
import axios from "axios";
import authService from "../app/authService.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";

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

  async function handleSubmit(e){
    e.preventDefault();
    const { username} = formData;
    
    // lets validate form data
    if(username.length < 4) {
      setError({...error, username: 'username length must be greater than 4'})
      return false;
    } 

    
    // lets check error before submitting form
    for(const keys in error) {
      if(error[keys]) {
        return false;
      }
    }

    try {
      const result = await authService.createAccount(formData);
      if(result) {
        console.log("signup result: ",result);
        dispatch(login(result));
        navigate("/");
      }
    } catch (error) {
      console.log("create account error: ", error.message);
    }

    return false;
  }

  return (
    <div className=" flex justify-center items-center h-screen w-full bg-zinc-700">
    <div className="w-96 p-6 shadow-lg bg-zinc-950 rounded-md border-solid border-4 border-indigo-600">
      <h1 className="text-white text-center font-bold text-xl  decoration-green-400">Signup form</h1>
      <hr className="border-double border-indigo-600 border-2 mt-2"></hr>
      <form onSubmit={ (e) => handleSubmit(e) }>
      
        <div className="w-full capitalize">
          
        <Input
          type="text"
          placeholder="enter name"
          label="Enter username"
          className="px-3 py-2 md:h-full md:w-full text-black"
          value={formData.username}
          error={error.username}
          onChange= { (e) => setFormData( { ...formData, username: e.target.value.trim() } ) }
          onBlur= { () => {
            axios
              .get(`/api/users/search?username=${formData.username}`)
              .then(res => {
                if (res.data.length > 0) {
                  setError({ ...error, username: 'username already exist' });
                } else {
                  setError({ ...error, username: '' });
                }
              })
              .catch(err => setError({ ...error, username: err.message }));
          } }
           />
           </div>
      

      <div className="fullName w-full capitalize">
        <Input
          type="text"
          label="Enter fullname: "
          placeholder="enter fullname"
          className="px-3 py-2"
          error={error.fullName}
          value={ formData.fullName }
          onChange= { e => setFormData( { ...formData, fullName: e.target.value } ) }
           />
      </div>

      <div className="password w-full capitalize" >
        <Input
          type="password"
          label="enter password: "
          placeholder="enter password"
          error={error.password}
          value={formData.password}
          onBlur={ e => {
            if(!e.target.value.length < 8){
              let regx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
              if (!regx.test(e.target.value)) {
                setError({...error, password: 'password must contain digits, letters and minimum of 8 characters'})
                return false
              }
              setError({...error, password: ''});
            } else {
              setError({...error, password: 'password length must be greater than 4'});
              return false;
            }
          }}
          onChange={ e => setFormData( { ...formData, password: e.target.value } ) }
          />
      </div>

      <div className="email w-full capitalize" >
        <Input
          type="email"
          label="enter email: "
          placeholder="enter email"
          error={error.email}
          value={formData.email}
          onChange={ e => setFormData( { ...formData, email: e.target.value } ) }
          onBlur= { () => {
            axios
              .get(`/api/users/search?email=${formData.email}`)
              .then(res => {
                if (res.data.length > 0) {
                  setError({ ...error, email: 'email in use, try another' });
                } else {
                  setError({ ...error, email: '' });
                }
              })
              .catch(err => setError({ ...error, email: err.message }));
          } }
          />
      </div>

        <div className="grid  grid-cols-2 gap-4 place-content-evenly" >
        <button type="submit" className="px-5 py-2  text-black border-black bg-orange-400 rounded-md">
         Submit 
      </button>
      <button type="reset" className="px-5 py-2  text-black border-black bg-orange-400 rounded-md">
         Reset 
      </button>
        </div>
      
    </form>

    </div>
  </div>
  )
}

export default Signup;