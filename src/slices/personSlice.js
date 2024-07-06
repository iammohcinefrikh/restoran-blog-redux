import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPersons = createAsyncThunk("persons/fetchPersons", async () => {
  const response = await axios.get("http://localhost:3003/person");
  return response.data;
});

const personSlice = createSlice({
  name: "persons",
  initialState: {
    persons: [],
    status: "idle",
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPersons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.persons = action.payload;
      })
      .addCase(fetchPersons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
})

export default personSlice.reducer;