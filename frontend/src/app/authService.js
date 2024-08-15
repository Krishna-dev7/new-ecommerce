import axios from "axios";

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
      return user ?? false;
    } catch (error) {
      console.log(error.message + "create account error");
    }
  }
}

const authService = new AuthService();

export default authService;