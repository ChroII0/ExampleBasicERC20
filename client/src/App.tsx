// eslint-disable-next-line
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectProfile, setProfile } from "./redux/profile/slides/profileSlide";
import { Footer } from "./views/Footer";
import { Header } from "./views/Header";
import { LoadingPage } from "./views/LoadingPage";
import axios from 'axios';
import "./App.scss";




function App() {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const urlApi: string | any = process.env.REACT_APP_URL_API;
  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(urlApi);
      dispatch(setProfile(res.data));
    }
    fetchProfile();
  }, []);
  console.log(profile.data.lastAccessTime);
  return (
    <>
      {Object.keys(profile.data).length === 9 ?
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
        : <LoadingPage />
      }
    </>
  );
}

export default App;
