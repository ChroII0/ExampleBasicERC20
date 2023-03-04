import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { LIST_PAGES } from './views/Header';
import { ExampleERC20 } from './views/ExampleERC20';
import { Home } from './views/Home';
import { ErrorPage } from './views/ErrorPage';
import { LoadingPage } from './views/LoadingPage';

const LIST_COMPONENTS_PAGE = [
  <Home />,
  <ExampleERC20 />
]

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingPage />} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {LIST_COMPONENTS_PAGE.map((item, index) => {
              return <Route key={index} path={LIST_PAGES[index]} element={item} />
            })}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>

);

