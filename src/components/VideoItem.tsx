import { Video } from "../models/Video";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import YouTubeEmbed from "./YoutubeEmbed";
import { useRemoveVideo } from "../hooks/useVideos";

export const VideoItem = (video: Video) => {
  const navigate = useNavigate();
  const useMutation = useRemoveVideo();

  const edit = async () => {
    if (!video.id) return;
    navigate(`/edit/${video.id}`);
  };

  const remove = async () => {
    if (!video.id) return;
    useMutation.mutate(video.id);
  };

  return (
    <div className="video">
      <div className="video-icons">
        <div className="icon delete-icon" onClick={remove}>
          <FaTrash />
        </div>
        <div className="icon edit-icon" onClick={edit}>
          <FaEdit />
        </div>
      </div>
      <YouTubeEmbed videoId={video.url} />
      <div className="video-details">
        <div className="video-text">
          <h3>Title: {video.title}</h3>
        </div>
      </div>
    </div>
  );
};
