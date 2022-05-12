import axios from "axios";

const baseUrl = "https://back.hourlyprice.io/";
export const urlApi = "api";

const GENERIC_URL = `${baseUrl}${urlApi}`;

// Register user
const register = async (userData) => {
  const response = await axios.post(`${GENERIC_URL}/register`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${GENERIC_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
