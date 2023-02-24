import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";




interface State {
    data: string,
}
const initialState: State = {
    data: ""
};

export const TotalSupplySlide = createSlice({
    name: "totalSuppyly",
    initialState,
    reducers: {
        setTotalSupply: (state, action)=>{
            state.data = action.payload
        }
    }
})

export const selectTotalSupply = (state: RootState) => state.totalSupply;
export const { setTotalSupply } = TotalSupplySlide.actions;


