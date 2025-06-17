import React, { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function Home() {

    // const navigate = useNavigate();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        API.get("/videos").then((res) => setVideos(res.data)).catch((err) => console.error("Error in fetching "))
    }, []);



    return (
        <>
            {/* <div className="container">
                <h2 className="container mt-5">Public Videos</h2>
                {videos.map((video) => {
                    return (
                        <div className="container my-4"  key={video._id}>
                        <Link to={`/video/${video._id}`}>
                            <h3 className="fs-3">{video.title}</h3>
                        </Link>
                        <p className="fs-5">{video.description}</p>
                    </div>
                    )
                })}
            </div> */}
            <div className="mt-5">
                <h1>Public Videos</h1>
            </div>
            <div className="row mt-3">
                {
                    videos.map((video) => {
                        return (
                            <div key={video._id} className="card container mt-5" style={{ width: "18rem" }}>
                                <div className="card-body">
                                    <h5 className="card-title">{video.title.length > 20 ? video.title.slice(0, 20) + '...' : video.title}</h5>
                                    <p className="card-text">{video.description.length > 45 ? video.description.slice(0, 35) + '...' : video.description}</p>
                                    <Link to={`/video/${video._id}`} className="btn btn-primary">Watch This Video</Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>


        </>
    );
}

export default Home;
