import axios from "axios";
import { FormData } from "../pages/auth/login-page";


export const registerService = async (data: FormData) => {

  const response = await axios.post(`http://localhost:5000/api/auth/register`, {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName
  });
  return response
};

export const loginService = async (data: FormData) => {
  const response = await axios.post(`http://localhost:5000/api/auth/login`, {
    email: data.email,
    password: data.password
  });
  return response;
}