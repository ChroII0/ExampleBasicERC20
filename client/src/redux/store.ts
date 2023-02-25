import { configureStore } from '@reduxjs/toolkit';
import { ConnectWalletSlide } from './erc-20/slides/connectWalletSlide';
import { EventEmitterSlide } from './erc-20/slides/eventEmitterSlide';
import { MetadataTokenSlide } from './erc-20/slides/metadataTokenSlide';
import { MyBalanceToken } from './erc-20/slides/myBalanceTokenSlide';
import { StatusBtnSlide } from './erc-20/slides/statusBtnSlide';
import { TokenSaleWalletSlide } from './erc-20/slides/tokenSaleWalletSlide';
import { TotalSupplySlide } from './erc-20/slides/totalSupplySlide';
import { UnitSlide } from './erc-20/slides/unitSlide';
import { ProfileSlide } from './profile/slides/profileSlide';




// Create store
export const store = configureStore({
  reducer: {
    metadataToken: MetadataTokenSlide.reducer,
    statusBtn: StatusBtnSlide.reducer,
    connectWallet: ConnectWalletSlide.reducer,
    totalSupply: TotalSupplySlide.reducer,
    tokenSaleWallet: TokenSaleWalletSlide.reducer,
    unit: UnitSlide.reducer,
    myBalanceToken: MyBalanceToken.reducer,
    eventEmitter: EventEmitterSlide.reducer,
    profile: ProfileSlide.reducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;