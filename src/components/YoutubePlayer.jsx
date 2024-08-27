import React from 'react';
import ReactPlayer from 'react-player'

const YoutubePlayer = ({ videoKey }) => (
  <div className="video-wrapper">
    <ReactPlayer
      className="video-player"
      url={`https://www.youtube.com/watch?v=${videoKey}`}
      controls={true}
      width="100%"
      height="100%"
      playing={true}
      data-testid="youtube-player"
      origin="http://localhost:3000"
    />
  </div>
  );

export default YoutubePlayer; 