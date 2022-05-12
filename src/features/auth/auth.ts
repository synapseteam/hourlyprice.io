import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../../api/apiBackend";

type User = {
  email: string | null;
  token: string | null;
  id: string | null;
};

type AuthState = {
  user: User;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | unknown;
};

// Get user from localStorage
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const user = JSON.parse(localStorage.getItem("user")!);

const initialState: AuthState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const registration = createAsyncThunk<
  User,
  Record<string, string>,
  { rejectValue: string }
>("auth/register", async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Login user
export const login = createAsyncThunk<
  User,
  Record<string, string>,
  { rejectValue: string }
>("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: {
    [registration.pending.type]: (state) => {
      state.isLoading = true;
    },
    [registration.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [registration.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [login.pending.type]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled.type]: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    },
    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    [logout.fulfilled.type]: (state) => {
      state.user = null;
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
