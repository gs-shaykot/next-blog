const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    content: "",
    imageUrl: "",
}

const editorSlice = createSlice({
    name: "editor",
    initialState,
    reducers: {
        setEditorData: (state, action) => {
            state.content = action.payload.content;
            console.log(action.payload.content)
            state.imageUrl = action.payload.imageUrl;
            console.log(action.payload.imageUrl)
        },
        clearEditorData: (state) => {
            state.content = "";
            state.imageUrl = "";
        },
    }
})

export const { setEditorData, clearEditorData } = editorSlice.actions;
export default editorSlice.reducer;