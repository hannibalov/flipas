import { VideoItem } from "../components/VideoItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useVideos } from "../hooks/useVideos";

export const VideoGrid = () => {
  const navigate = useNavigate();
  const { data: videos, error } = useVideos();

  const handleAddButtonClick = () => {
    navigate("/add");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!videos || videos.length === 0) {
    return (
      <div>
        No videos found yet! Add some amazing Stavvos Halkias videos from
        youtube
      </div>
    );
  }

  return (
    <>
      <div className="grid-container">
        <div className="grid">
          {videos?.map((video) => (
            <VideoItem key={video.id} {...video} />
          ))}
        </div>
      </div>
      <div className="add-video-button-container">
        <button className="add-video-button" onClick={handleAddButtonClick}>
          Add video
        </button>
      </div>
    </>
  );
};
