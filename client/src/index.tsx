import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App';
import { store } from './redux/erc-20/store';
import { LIST_PAGES } from './views/Header';
import { ExampleERC20 } from './views/ExampleERC20';

const LIST_COMPONENTS_PAGE = [
  <ExampleERC20/>
]

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {LIST_COMPONENTS_PAGE.map((item, index)=>{
            return <Route key={index} path={LIST_PAGES[index+1]} element={item} />
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>

);
