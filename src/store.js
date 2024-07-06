import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./slices/articleSlice";
import categoriesReducer from "./slices/categorySlice";
import personsReducer from "./slices/personSlice";

const store = configureStore({
  reducer: {
    articles: articlesReducer,
    categories: categoriesReducer,
    persons: personsReducer
  }
});

export default store;