import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "./src/features/books/bookSlice";

export default configureStore({
    reducer: {
        books: bookSlice.reducer
    }
})