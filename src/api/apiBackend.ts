import axios from "axios";
import { User } from "typescript/types";

const baseUrl = "https://back.hourlyprice.io/";
export const urlApi = "api";

const GENERIC_URL = `${baseUrl}${urlApi}`;

// Register user
const register = async (userData: User): Promise<Record<string, string>> => {
  const response = await axios.post(`${GENERIC_URL}/register`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data, "register");
  return response.data;
};

// Login user
const login = async (userData: User): Promise<Record<string, string>> => {
  const response = await axios.post(`${GENERIC_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data, "login");
  return response.data;
};

// Logout user
const logout = (): void => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
