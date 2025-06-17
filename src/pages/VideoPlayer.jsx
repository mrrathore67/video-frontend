import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await API.get(`/videos/${id}`);
        console.log("video res", res.data);

        setVideo(res.data);
        await API.post(`/videos/${id}/view`);
      } catch (err) {
        console.error("fething videos", err)
      }

    };

    fetchVideo();
  }, [id]);

  if (!video) return <div>Loading...</div>;

  return (
<div className="container mt-4">
  <div className="card shadow-sm border-0">
    <div className="card-body">
      <h2 className="card-title fs-1 fw-bolder">{video.title}</h2>

      <div className="my-3 d-flex justify-content-center">
        <video 
          controls 
          className="rounded" 
          style={{ width: "100%", maxWidth: "500px", maxHeight: "280px", objectFit: "cover" }}
        >
          <source src={video.streamUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <p className="card-text fs-5">{video.description}</p>
      <p className="text-muted">Views: {video.views}</p>
    </div>
  </div>
</div>
  );
}



