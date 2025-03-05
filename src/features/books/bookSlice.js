import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react';

export const fetchBooks = createAsyncThunk(
    'books/fetch',
    async () => {
        const response = await axios.get(`https://book-hive-ebon.vercel.app/books`)
        return response.data
    }
)

export const deleteBookAsync = createAsyncThunk(
    'books/delete',
    async(bookId) => {
        const response = await axios.delete(`https://book-hive-ebon.vercel.app/books/${bookId}`)
        return response.data
    }
)

export const addBookAsync = createAsyncThunk(
    'books/add', 
    async(newBook) => {
        const response = await axios.post(`https://book-hive-ebon.vercel.app/books`, newBook)
        return response.data
    }
)

export const updateBookAsync = createAsyncThunk(
    'books/update',
    async ({bookId, bookData}) => {
        const response = await axios.put(`https://book-hive-ebon.vercel.app/books`, bookData)
            if(response){
                return response.data
            }
    }
)

export const bookSlice = createSlice(
    {
        name: 'books',
        initialState: {
            books: [],
            status: 'idle',
            error: null
        },
        reducers: {

        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchBooks.pending, (state) => {
                    state.status = 'pending'
                })
                .addCase(fetchBooks.fulfilled, (state, action) => {
                    state.status = 'success',
                    state.books = action.payload
                })
                .addCase(fetchBooks.rejected, (state, action) => {
                    state.status = 'error',
                    state.error = action.payload.error
                })
                .addCase(deleteBookAsync.pending, (state) => {
                    state.status = 'pending'
                })
                .addCase(deleteBookAsync.fulfilled, (state, action) => {
                    state.status = 'success'
                    state.books = state.books.filter(book => book._id !== action.payload.bookId)
                })
                .addCase(deleteBookAsync.rejected, (state, action) => {
                    state.status = 'error'
                    state.error = action.payload.error
                })
                .addCase(addBookAsync.pending, (state) => {
                    state.status = 'loading'
                }) 
                .addCase(addBookAsync.fulfilled, (state, action) => {
                    state.status = 'success',
                    state.books.push(action.payload)
                })
                .addCase(addBookAsync.rejected, (state, action) => {
                    state.status = 'error',
                    state.error = action.payload.error
                })
                .addCase(updateBookAsync.pending, (state) => {
                    state.status = 'loading'
                }) 
                .addCase(updateBookAsync.fulfilled, (state, action) => {
                    state.status = 'success',
                    state.books = state.books.map(book => 
                        book._id === action.payload._id ? action.payload : book
                    )
                })
                .addCase(updateBookAsync.rejected, (state, action) => {
                    state.status = 'error',
                    state.error = action.payload.error
                })
        }
    }
)

export default bookSlice.reducer