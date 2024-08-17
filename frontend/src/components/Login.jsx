import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";

function Login() {

  const initialState = {
    email: '',
    password: '',
    common: '',
  }
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(initialState);

  function handleLogin(e) {
    e.target.preventDefault();
    const { email, password } = formData;

    // lets validate the password
    if(!password.length < 8) {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
      if(!regex.test(password)) {
        setError({...error, password: 'password must contain letters and digits'})
        return false;
      }
    } else {
      setError({...error, password: 'password must contain characters of 8 length'})
      return false;
    }

    axios
      .get("/api/users/verify")
      .then( res => console.log(res) )
      .catch( err => setError({...error, common: err.message}));

    for(keys in error) {
      if(keys) {
        return false;
      }
    }

    return true;
  }

  return (
    <div className="login">
      <h1> Login </h1>
      <form >
        <div className="email">
          <Input
            type="email"
            placeholder="enter email"
            value={formData.email}
            onChange={ e => setFormData({...error, email: e.target.value.trim()}) } />
        </div>

        <div className="password">
          <Input
            type="password"
            placeholder="enter password"
            value={formData.password}
            onChange={ e => setFormData({...error, password: e.target.value.trim()}) } />
        </div>
      </form>
    </div>
  )
}

export default Login;