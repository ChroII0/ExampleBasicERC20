import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";




interface State {
    data: string,
}
const initialState: State = {
    data: ""
};

export const MyBalanceToken = createSlice({
    name: "myBalanceToken",
    initialState,
    reducers: {
        setMyBalanceToken: (state, action)=>{
            state.data = action.payload
        }
    }
})

export const selectMyBalanceToken = (state: RootState) => state.myBalanceToken;
export const { setMyBalanceToken } = MyBalanceToken.actions;


