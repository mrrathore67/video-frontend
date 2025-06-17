import React, { useState } from "react";
import API from "../api";

export default function Upload() {
  const [videoFile, setVideoFile] = useState(null);
  const [info, setInfo] = useState({ title: "", description: "", isPublic: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("title", info.title);
    formData.append("description", info.description);
    formData.append("isPublic", info.isPublic);

    await API.post("/videos/upload", formData);
    alert("Uploaded!");
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow-sm bg-light">
      <h2 className="mb-4">Upload Video</h2>

      <div className="mb-3">
        <label className="form-label fs-5">Select Video File</label>
        <input
          type="file"
          className="form-control"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter video title"
          onChange={(e) => setInfo({ ...info, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label fs-5">Description</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter video description"
          onChange={(e) => setInfo({ ...info, description: e.target.value })}
        />
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="isPublic"
          checked={info.isPublic}
          onChange={(e) => setInfo({ ...info, isPublic: e.target.checked })}
        />
        <label className="form-check-label" htmlFor="isPublic">Make Public</label>
      </div>

      <button type="submit" className="btn btn-primary">Upload</button>
    </form>

  );
}


