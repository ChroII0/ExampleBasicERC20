import { configureStore } from '@reduxjs/toolkit';
import { ConnectWalletSlide } from './slides/connectWalletSlide';
import { EventEmitterSlide } from './slides/eventEmitterSlide';
import { MetadataTokenSlide } from './slides/metadataTokenSlide';
import { MyBalanceToken } from './slides/myBalanceTokenSlide';
import { StatusBtnSlide } from './slides/statusBtnSlide';
import { TokenSaleWalletSlide } from './slides/tokenSaleWalletSlide';
import { TotalSupplySlide } from './slides/totalSupplySlide';
import { UnitSlide } from './slides/unitSlide';




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
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;