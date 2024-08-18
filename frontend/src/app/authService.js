import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

class AuthService{
  // create Account
  async createAccount({username, email, password, fullName}) {
    try {
      const user = await axios.post('/api/users/register', {
        username,
        email,
        password,
        fullName
      })

      if(user) {
        const res = await this.login({email, password});
        return res;
      }

      return false;
    } catch (error) {
      console.log(error.message + "create account error");
    }
  }

  // axios
  //     .post("/api/users/login", formData)
  //     .then( res => {
  //       console.log(res);
  //     } )
  //     .catch( err => setError({...error, common: err.message}));

  async login({email, password}) {
    try {
      const res = await axios.post("/api/users/login", {email, password});
      if(res.data.statusCode < 400) {
        console.log("login successful");
        return res.data.data.user;
      }
    } catch (error) {
      console.log("login error: ", error.message);
    }
  }

  async logout() {
    try {
      const res = await axios.post("/api/users/logout");
      console.log(res);
      if(res.data.statusCode < 400) {
        console.log("logout successfully");
      }
      return res.data.statusCode < 400;
    } catch (error) {
      console.log("auth service logout error: ", error.message);
    }
  }
}



const authService = new AuthService();

export default authService;