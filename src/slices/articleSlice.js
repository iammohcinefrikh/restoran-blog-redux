import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async () => {
  const response = await axios.get("http://localhost:3003/article");
  return response.data;
});

export const fetchArticleById = createAsyncThunk("articles/fetchArticleById", async (id) => {
  const response = await axios.get(`http://localhost:3003/article/${id}`);
  return response.data;
});

export const addArticle = createAsyncThunk("articles/addArticle", async (newArticle) => {
  const response = await axios.post("http://localhost:3003/article", newArticle);
  return response.data;
});

export const deleteArticle = createAsyncThunk("articles/deleteArticle", async (id) => {
  await axios.delete(`http://localhost:3003/article/${id}`);
  return id;
});

export const modifyArticle = createAsyncThunk("articles/modifyArticle", async (updatedArticle) => {
  const { id, ...rest } = updatedArticle;
  const response = await axios.put(`http://localhost:3003/article/${id}`, rest);
  return response.data;
});

const articleSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    currentArticle: null,
    status: "idle",
    error: null,
  },
  reducers: {
    resetCurrentArticle: (state) => {
      state.currentArticle = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchArticleById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.articles.push(action.payload);
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(article => article.id !== action.payload);
      })
      .addCase(modifyArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(article => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      });
  },
});

export const { resetCurrentArticle } = articleSlice.actions;
export default articleSlice.reducer;