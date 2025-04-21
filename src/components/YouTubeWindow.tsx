import React from 'react';
import Draggable from 'react-draggable';

interface YouTubeWindowProps {
  onClose: () => void;
}

const YouTubeWindow: React.FC<YouTubeWindowProps> = ({ onClose }) => {
  return (
    <Draggable 
      defaultPosition={{ x: -100, y: 20 }}
    >
      <div className="folder-window youtube-window">
        <div className="folder-header">
          <strong className="folder-title" style={{ color: '#ff69b4', fontFamily: 'Comic Sans MS, cursive' }}> 甜甜屋 </strong>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="youtube-content">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/yS4lZboXfQ4"
            title="YouTube"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </Draggable>
  );
};

export default YouTubeWindow; 