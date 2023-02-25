import { createSlice } from "@reduxjs/toolkit";
import { ITokenSaleWallet } from "../../../interface";
import { RootState } from "../../store";




interface State {
    data: ITokenSaleWallet,
}
const initialState: State = {
    data: {
        address: "",
        balance: "",
        balanceToken: "",
        remainingAllowance: ""
    }
};

export const TokenSaleWalletSlide = createSlice({
    name: "tokenSaleWallet",
    initialState,
    reducers: {
        setTokenSaleWallet: (state, action) => {
            state.data = action.payload
        }
    }
})

export const selectTokenSaleWallet = (state: RootState) => state.tokenSaleWallet;
export const { setTokenSaleWallet } = TokenSaleWalletSlide.actions;


