import axios from "axios";
import jwt_decode from 'jwt-decode';
import { DisplayUser } from "../../models/DisplayUser.interface";
import { NewUser } from "../../models/NewUser";
import { LoginUser } from "../../models/LoginUser.interface";
import { Jwt } from "../../models/Jwt";
import { DecodedJwt } from "../../models/DecodedJwt.interface";

const register = async (newUser: NewUser): Promise<DisplayUser | null> => {
  const response = await axios.post(`${process.env.REACT_APP_BASE_API}/auth/registration`, newUser);
  return response.data; 
}

const login = async (
  user: LoginUser
): Promise<{ jwt: Jwt; user: DisplayUser | null }> => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API}/auth/login`,
    user
  );

  if (response.data) {
    localStorage.setItem('jwt', JSON.stringify(response.data));

    const decodedJwt: DecodedJwt = jwt_decode(response.data.token);
    const usr = decodedJwt.user;
    localStorage.setItem('user', JSON.stringify(usr));
    return { jwt: response.data, user: decodedJwt.user };
  }
  return { jwt: response.data, user: null };
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await axios.post(`${process.env.REACT_APP_BASE_API}/auth/verify-jwt`, { jwt });

  if(response.data) {
    const jwtExpirationMs = response.data.token.exp * 1000;
    return jwtExpirationMs > Date.now();
  }

  return false; 
}

const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwt');
}

const authService = {
  register,
  login,
  logout,
  verifyJwt,
}

export default authService;

