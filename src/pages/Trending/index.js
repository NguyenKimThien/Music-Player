import React, { useEffect, useState } from "react";
import "./style.css";
import APIKit from "../../utils/spotify";
import { useNavigate } from "react-router-dom";

export default function Trending() {
  const [trendingTracks, setTrendingTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const playlistId = "37i9dQZF1DX2RxBh64BHjQ"; 
    const accessToken = localStorage.getItem("access_token");
    const fetchTrending = async () => {
      try {
        // Lấy playlist Global Top 50 của Spotify
        const response = await APIKit.get(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: {
              limit: 100,
            },
          }
        );
        setTrendingTracks(response.data.tracks.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending:", error);
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const handleTrackClick = (trackId) => {
    navigate("/player", { state: { id: trackId } });
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="trending-container">
      <h1>Trending Now</h1>
      <div className="trending-tracks">
        {trendingTracks.map((item, index) => (
          <div
            key={item.track.id}
            className="track-item"
            onClick={() => handleTrackClick(item.track.id)}
          >
            <div className="track-number">{index + 1}</div>
            <img
              src={item.track.album.images[0]?.url}
              alt={item.track.name}
              className="track-image"
            />
            <div className="track-info">
              <h3 className="track-name">{item.track.name}</h3>
              <p className="track-artist">
                {item.track.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
