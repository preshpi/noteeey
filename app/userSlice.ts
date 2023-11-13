import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface User {
    uid: any;
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    // Additional user properties as needed
  }
  

export interface userProps {
  user: User | null;
}

const initialState: userProps = {
  user: null,
};

const userSlice = createSlice({
  // it must have a name and the current state
  name: "user",
  initialState,
  reducers: {
    // you put actions in your reducers
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
