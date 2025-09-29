const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    mode: "light",
}

const Slice = createSlice({
    name: "themeToggle",
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        }
    }
})
export const { toggleTheme } = Slice.actions
export default Slice.reducer