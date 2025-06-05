import "./style.css";
import logo from "../../../assets/Spotify-Logo.wine.svg";
import { handleLogin,client_id as clientId,redirect_uri as redirectUri } from "../../../utils/spotify";
import React, { useEffect } from "react";

const Login = () => {
 const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  const getToken = async code => {
    const codeVerifier = localStorage.getItem('code_verifier');

    const url = "https://accounts.spotify.com/api/token";
    const payload = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
        }),
    }
    const body = await fetch(url, payload);
    const response = await body.json();
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
      window.location.reload(); // Đảm bảo state được cập nhật
    }
};
  useEffect(() => {
    if (code) {
      getToken(code);
    }
  }, [code]);
  return (
    <div className="login-page">
      <img src={logo} alt="Spotify Logo" className="logo" />
      <button onClick={handleLogin} className="login-btn">
        LOG IN
      </button>
    </div>
  );
};

export default Login;
