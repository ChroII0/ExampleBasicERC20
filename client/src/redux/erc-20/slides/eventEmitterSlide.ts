import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';



interface State {
    data: object
    status: boolean
    title: string
    variant: string
}

const initialState: State = {
    data: {},
    status: false,
    title: "",
    variant: ""
};


export const EventEmitterSlide = createSlice({
    name: "eventEmitter",
    initialState,
    reducers: {
        setSuccessfulTransaction: (state, action) => {
            state.data = action.payload;
            state.status = true;
            state.title = "Transaction Successful!";
            state.variant = "success";
        },
        setErrorTransaction: (state, action) => {
            state.data = action.payload;
            state.status = true;
            state.title = "Transaction Failed!";
            state.variant = "danger";
        },
        setAlert: (state, action) => {
            state.data = {};
            state.status = true;
            state.title = action.payload;
            state.variant = "primary";
        },
        setErrorCall: (state, action) => {
            state.data = action.payload;
            state.status = true;
            state.title = "Error Occurred!";
            state.variant = "danger";
        },
        clearData:  (state) => {
            state.data = {};
            state.status = false;
            state.title = "";
            state.variant = "";
        }
    }
});

export const selectEventEmitter = (state: RootState) => state.eventEmitter;

export const { setSuccessfulTransaction, setErrorTransaction, setErrorCall, setAlert, clearData } = EventEmitterSlide.actions;

