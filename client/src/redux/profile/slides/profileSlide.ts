import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';



interface State {
    data: object | any,
}

const initialState: State = {
    data: {}
};


export const ProfileSlide = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const selectProfile = (state: RootState) => state.profile;

export const { setProfile } = ProfileSlide.actions;

