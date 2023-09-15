// modelsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type Model = {
  _id: string;
  img: string;
  name: string;
  price: string;
  mark: string;
  description: string;
  capacity: number;
  isRent: boolean;
  
}

type ModelsState = {
  models: Model[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | unknown | string
}


const initialState: ModelsState = {
  models: [],
  status: 'idle',
  error: null,
};


export const fetchModels = createAsyncThunk<Model[], void>(
  'models/fetchModels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Model[]>('http://localhost:4444/cars');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const modelsSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchModels.fulfilled, (state, action: PayloadAction<Model[]>) => {
        state.status = 'succeeded';
        state.models = action.payload;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.toString() : 'Network Error';
      })
      
  },
});

export default modelsSlice.reducer;
