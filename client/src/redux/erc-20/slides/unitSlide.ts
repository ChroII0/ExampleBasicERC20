import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";




interface State {
    data: string,
}
const initialState: State = {
    data: "wei"
};

export const UnitSlide = createSlice({
    name: "unit",
    initialState,
    reducers: {
        setUnit: (state, action)=>{
            state.data = action.payload
        }
    }
})

export const selectUnit = (state: RootState) => state.unit;
export const { setUnit } = UnitSlide.actions;


