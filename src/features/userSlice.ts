import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type User = {
  _id?: string;
  login: string;
  password: string;
  email: string;
  
};

type userInfoState = {
  users: User[];
  error: null | unknown | string;
  token: string | null | number;
  loading: boolean;
};

const userState: userInfoState = {
  users: [],
  error: null,
  loading: false,
  token: localStorage.getItem("token"),
};

export const addCarToUser = createAsyncThunk(
  'user/addCarToUser',
  async ({ userId, carId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/user/${userId}`, {
        carId: carId,
      });
      return response.data; // Если сервер возвращает какие-то данные после успешной операции
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const oneUser = createAsyncThunk(
  "user/fetchUser",
  async (id) => {
    const res = await fetch(`http://localhost:4444/user/${id}`);
    const todo = await res.json();
    return todo;
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      await fetch(`http://localhost:4444/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(oneUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(oneUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(oneUser.fulfilled, (state, action) => {
        state.error = null;
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((item) => item._id !== action.payload);
        state.error = null;
        state.loading = false;
      })
      .addCase(addCarToUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addCarToUser.fulfilled, (state, action) => {
        state.error = null;
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(addCarToUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});

export default userSlice.reducer;
