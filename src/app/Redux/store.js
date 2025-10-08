import { configureStore } from "@reduxjs/toolkit";
import themeReducer from './slice'
import editorReducer from "./editorSlice";

export const store = configureStore({
    reducer: {
        themeToggle: themeReducer,
        editor: editorReducer,
    },
});
