import { createSlice } from '@reduxjs/toolkit';
import { IMetadataToken } from "../../../interface";
import { RootState } from '../../store';



interface State {
    data: IMetadataToken,
}

const initialState: State = {
    data: {
        name: "",
        symbol: "",
        owner: "",
        price: "",
    }
};


export const MetadataTokenSlide = createSlice({
    name: "metadataToken",
    initialState,
    reducers: {
        setMetadataToken: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const selectMetadataToken = (state: RootState) => state.metadataToken;

export const { setMetadataToken } = MetadataTokenSlide.actions;

