import { createSlice } from '@reduxjs/toolkit';
import { IWallet } from "../../../interface";
import { RootState } from '../store';



interface State {
    data: IWallet,
}

const initialState: State = {
    data: {
        address: "",
        balance: ""
    }
};


export const ConnectWalletSlide = createSlice({
    name: "connectWallet",
    initialState,
    reducers: {
        setMyWallet: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const selectConnectWallet = (state: RootState) => state.connectWallet;

export const { setMyWallet } = ConnectWalletSlide.actions;

