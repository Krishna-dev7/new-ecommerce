import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import axios from "axios";

function Login() {

  const initialState = {
    email: '',
    password: '',
  }
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({...initialState, common: ''});

  function handleLogin(e) {
    e.preventDefault();
    const { password } = formData;

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

    for(const keys in error) {
      if(error[keys]) {
        return false;
      }
    }

    axios
      .post("/api/users/login", formData)
      .then( res => {
        console.log(res);
      } )
      .catch( err => setError({...error, common: err.message}));


    return true;
  }

  return (
    <div className="login">
      <h1> Login </h1>
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
            onChange={ e => setFormData({...formData, password: e.target.value.trim()}) } />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login;