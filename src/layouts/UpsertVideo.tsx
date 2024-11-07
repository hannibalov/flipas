import { useEffect, useState } from "react";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUpsertVideo, useVideo } from "../hooks/useVideos";

export const UpsertVideo = () => {
  const navigate = useNavigate();
  const useMutation = useUpsertVideo();

  const [url, setUrl] = useState("");
  const [title, setTitle] = React.useState("");

  const { videoId } = useParams<{ videoId?: string }>();
  const { data: video } = useVideo(videoId || "");
  const location = useLocation();

  useEffect(() => {
    if (!video) return;
    setTitle(video.title);
    setUrl(video.url);
  }, [video]);

  const isAddMode = location.pathname.endsWith("/add");

  const handleBackButtonClick = () => {
    navigate("/dashboard");
  };

  const upsertVideo = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    useMutation.mutate({ id: videoId, title, url });
    handleBackButtonClick();
  };
  return (
    <>
      <div className="add-video-button-container">
        <button className="add-video-button" onClick={handleBackButtonClick}>
          Back
        </button>
      </div>
      <form onSubmit={upsertVideo}>
        <div className="input-container">
          <label>
            Video title:
            <input
              type="text"
              name="name"
              className="input-field"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Video url:
            <input
              type="text"
              name="name"
              className="input-field"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>
        <input
          type="submit"
          className="button"
          value={isAddMode ? "Add" : "Update"}
        />
      </form>
    </>
  );
};
