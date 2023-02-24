import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";




interface State {
    isDisabled: boolean
}

const initialState: State = {
    isDisabled: false
};
export const StatusBtnSlide = createSlice({
    name: "statusBtn",
    initialState,
    reducers: {
        setIsDisabled: (state, action) => {
            state.isDisabled = action.payload;
        }
    }
});

export const selectStatusBtn = (state: RootState) => state.statusBtn;

export const { setIsDisabled } = StatusBtnSlide.actions;