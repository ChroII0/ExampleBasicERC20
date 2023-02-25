import { Outlet } from "react-router-dom";
import { Footer } from "./views/Footer";
import { Header } from "./views/Header";


function App() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
}

export default App;
