import { createSlice } from "@reduxjs/toolkit";
let slice = createSlice({
  initialState: {
    friends: [{ name: "user1" }, { name: "user2" }],
  },
  name: "friends",
  reducers: {
    fetchFriends(state) {},
    addFriend(state) {},
    deleteFriend(state) {},
  },
});
export default slice.reducer;
