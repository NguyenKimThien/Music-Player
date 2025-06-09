import { generateRandomString,sha256,base64encode } from "./pkce";
import axios from "axios";
const authEndpoint = "https://accounts.spotify.com/authorize?";
export const client_id = "248079e70cb04f8aabbfb017ec850330";
export const redirect_uri = "http://127.0.0.1:3000/callback";
export const scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative';

export const handleLogin = async () => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await sha256(codeVerifier);
    const codeChallengeBase64 = base64encode(codeChallenge);
    localStorage.setItem('code_verifier', codeVerifier);
    const args = new URLSearchParams({
      response_type: 'code',
      client_id,
      scope,
      redirect_uri,
      code_challenge_method: 'S256',
      code_challenge: codeChallengeBase64,
    });

    const url = `${authEndpoint}${args.toString()}`;
    window.location.href = url.toString();
  };
const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
})

export const setClientToken = (token) => {
     apiClient.interceptors.request.use(async (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
}
export default apiClient