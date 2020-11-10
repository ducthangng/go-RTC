const { createSlice } = require("@reduxjs/toolkit");

let slice = createSlice({
  name: "user",
  reducers: {},
  initialState: { userName: "" },
});

export default slice.reducer;
