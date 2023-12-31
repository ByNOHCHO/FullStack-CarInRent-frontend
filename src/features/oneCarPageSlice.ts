import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
//import { act } from "react-dom/test-utils";

type Car = {
  _id: string | number;
  img: string;
  name: string;
  description: string;
  capacity: number;
  mark: string;
  price: string;
};
type Reviews = {
  _id: string;
  cars: string;
  text: string;
  rating: number;
  carId: string | number;
  userId: string;
  review: string
};

type CarState = {
  car: Car[];
  reviews: Reviews[];
  error: unknown | null | string;
};

const initialState: CarState = {
  car: [],
  reviews: [],
  error: null,
};

export const getCarById = createAsyncThunk(
  "carId/fetch",
  async (_id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4444/cars/${_id}`);
      return res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const fetchReviews = createAsyncThunk(
  "reviews/fetcgReviews",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4444/reviews");
      const car = await res.json();

      return car;
      
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const patchReviews = createAsyncThunk<
  void,
  Reviews,
  { rejectValue: unknown; state: RootState }
>("car/patchReviews", async ({ text, rating, carId }, thunkAPI) => {
  try {
    const res = await fetch(`http://localhost:4444/reviews/${carId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().application.token}`,
      },
      body: JSON.stringify({
        text: text,
        rating: rating,
      }),
    });
    res.json();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const addReviews = createAsyncThunk<
  void,
  Reviews,
  { rejectValue: unknown; state: RootState }
>("car/addReviews", async ({ review,  carId, userId }, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:4444/reviews', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${thunkAPI.getState().application.token}`,
      },
      body: JSON.stringify({
        text: review,
        user: userId,
        cars: carId
      }),
    });
    return await res.json();
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const deletedReviews = createAsyncThunk<string, string,{ rejectValue: unknown; state: RootState}>(
  
  "comments/deletedComments",
  async ( id, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:4444/reviews/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${thunkAPI.getState().application.token}`,
        },
      });
      if (res.ok) {
        return id;
      }
      //return _id
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const oneCarPageSlice = createSlice({
  name: "car",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarById.fulfilled, (state, action) => {
        state.car = action.payload;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(deletedReviews.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(patchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(addReviews.fulfilled, (state, action) => {
        
        state.reviews.push(action.payload[0]);
        console.log(action.payload);
        
        
        });
    },
  });

  export default oneCarPageSlice.reducer;