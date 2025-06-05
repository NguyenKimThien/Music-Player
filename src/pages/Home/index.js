import React from 'react';
import "./style.css"
import SideBar from "../../components/sidebar";
import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import RoutesPublic from "../../routers/routers";
import Login from "../../pages/auth/login";
import { useEffect, useState } from "react";
const Home = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    console.log("Stored token in App.js:", storedToken);

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const isHaveToken = (token === "undefined" || token === "null" || token === "") ? false : true;
  console.log("isHaveToken:", isHaveToken);
  return !isHaveToken ? (<Login/>) : (
    <BrowserRouter>
      <div className="main-body">        
        <SideBar />
        <div className="main-content">
          <Routes>
            {RoutesPublic.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Home;
