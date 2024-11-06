import React from "react";

interface YouTubeEmbedProps {
  videoId: string;
}

const getYouTubeVideoId = (url: string): string | null => {
  const regex =
    /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]*\/\S*\/|\S*\?v=|(?:v|e(?:mbed)?)\/|.*[&?]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}))/;
  const match = url.match(regex);
  return match ? match[1] : null; // returns the videoId or null if no match is found
};

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  return (
    <div className="video-embed-wrapper">
      <iframe
        src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoId)}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YouTubeEmbed;
