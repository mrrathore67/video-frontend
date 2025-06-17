import React, { useEffect, useState, useContext } from "react";
import API from "../api"; // ✅ Use your Axios instance
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      console.log("No token available. Waiting...");
      setLoading(false);
      return;
    }

    const fetchVideos = async () => {
      try {
        const res = await API.get("/videos/user/me"); // ✅ Base URL handled by API instance
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching videos:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [token]);

  if (loading) return <p>Loading your videos...</p>;

  return (
    <div className="container mt-4">
      <h2>My Uploaded Videos</h2>
      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="row">
          {videos.map((video) => (
            <div className="col-md-4 mb-3" key={video._id}>
              <div className="card">
                <video width="100%" controls>
                  <source src={`https://video-backend-yhsv.onrender.com/${video.videoUrl}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="card-body">
                  <h5 className="card-title">
                    {video.title.length > 20 ? video.title.slice(0, 20) + '...' : video.title}
                  </h5>
                  <p className="text-muted"><strong>Views:</strong> {video.views}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
