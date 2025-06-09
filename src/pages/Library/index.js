import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import APIKit from "../../utils/spotify";

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    APIKit.get("/me/playlists")
      .then((response) => {
        setPlaylists(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, []);
  const navigate = useNavigate();
  const handlePlayClick = (id) => {
      navigate("/player", {state : {id : id}})
  }
  return (
    <div className="screen-container">
      <div className="playlist-container parent">
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-item" onClick={() => handlePlayClick(playlist.id)}>
              <img
                src={playlist.images[0]?.url}
                alt="playlist-art"
                className="playlist-image"
              />
              <p className="playlist-name">{playlist.name}</p>
              <p className="playlist-tracks">{playlist.tracks.total} songs</p>
            </div>
          ))
        ) : (
          <b className="error">Không có playlist nào</b>
        )}
      </div>
    </div>
  );
}
