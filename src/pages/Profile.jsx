// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// // import API from "../api";
// import { AuthContext } from "../context/AuthContext";

// export default function Profile() {
//   const [videos, setVideos] = useState([]);
//   const { token } = useContext(AuthContext);

//   // useEffect(() => {
//   //   API.get("/videos/user/me").then((res) => setVideos(res.data));
//   // }, [token]);

//   useEffect(() => {
//     if (!token) {
//       console.log("No token yet, skipping fetch.");
//       return;
//     }

//     const fetchVideos = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/videos/user/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setVideos(res.data);
//       } catch (err) {
//         console.error("Error fetching videos:", err);
//       }
//     };

//     fetchVideos();
//   }, [token]); // important: wait for token to be available


//   return (
//     <div>
//       <h2>My Uploaded Videos</h2>
//       {videos.length === 0 ? (
//         <p>No videos to dispayed yet.</p>
//       ) : (videos.map((video) => (
//         <div key={video._id} style={{ marginBottom: "2rem" }}>
//           <h3>{video.title}</h3>
//           <p>{video.description}</p>
//           <p>Public: {video.isPublic ? "Yes" : "No"}</p>
//           <p>Views: {video.views}</p>

//           <video
//             width="480"
//             height="270"
//             controls
//             src={`http://localhost:5000/${video.filePath.replace(/\\/g, "/")}`}
//           >
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )))
//       }
//     </div>
//   );
// }

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    // If no token yet, don't try to fetch
    if (!token) {
      console.log("No token available. Waiting...");
      setLoading(false);
      return;
    }

    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/videos/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
                  <source src={`http://localhost:5000/${video.videoUrl}`} type="video/mp4" /> 
                  Your browser does not support the video tag.
                </video>
                <div className="card-body">
                  <h5 className="card-title">{video.title.length > 20 ? video.title.slice(0, 20) + '...' : video.title}</h5>
                  <p className="card-text">{video.description.length > 45 ? video.description.slice(0, 35) + '...' : video.description}</p>
                  <p className="text-muted"> <strong>Views: </strong>{video.views}</p>
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
