import React, { useEffect, useState } from "react";
import "./style.css";
import APIKit from "../../utils/spotify";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const [newReleases, setNewReleases] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Lấy album mới phát hành
        const newReleasesResponse = await APIKit.get(
          "/browse/new-releases?limit=8"
        );
        setNewReleases(newReleasesResponse.data.albums.items);

        // Lấy nghệ sĩ nổi tiếng
        const artistsResponse = await APIKit.get(
          "/artists?ids=1Xyo4u8uXC1ZmMpatF05PJ,06HL4z0CvFAxyc27GXpf02,246dkjvS1zLTtiykXe5h60,3TVXtAsR1Inumwj472S9r4,6eUKZXaKkcviH0Ku9w2n3V"
        );
        setTopArtists(artistsResponse.data.artists);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching feed:", error);
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleArtistClick = (id) => {
    navigate("/artist", { state: { id: id } });
  };
  const handleAlbumClick = (id) => {
    navigate("/player", { state: { id: id } });
  };
  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="feed-container">
      <div className="feed-section">
        <h2>New Releases</h2>
        <div className="feed-grid">
          {newReleases.map((album) => (
            <div
              key={album.id}
              className="feed-card"
              onClick={() => handleAlbumClick(album.id)}
            >
              <img
                src={album.images[0]?.url}
                alt={album.name}
                className="feed-image"
              />
              <p className="feed-title">{album.name}</p>
              <p className="feed-subtitle">{album.artists[0]?.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="feed-section">
        <h2>Popular Artists</h2>
        <div className="feed-grid">
          {topArtists.map((artist) => (
            <div
              key={artist.id}
              className="feed-card"
              onClick={() => handleArtistClick(artist.id)}
            >
              <img
                src={artist.images[0]?.url}
                alt={artist.name}
                className="feed-image artist-image"
              />
              <p className="feed-title">{artist.name}</p>
              <p className="feed-subtitle">{`${artist.followers.total.toLocaleString()} followers`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
