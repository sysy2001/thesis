import React, { useState } from 'react';
import Draggable from 'react-draggable'; 
import cloud from '../assets/cloud-1.png';
import localVideo from '../assets/video.mp4'; 


interface ClockFolderContentProps {
  unzipClouds: boolean;
  setUnzipClouds: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClockFolderContent: React.FC<ClockFolderContentProps> = ({ unzipClouds, setUnzipClouds }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);

  return (
    <div>
      <Draggable defaultPosition={{ x: 0, y: 0 }} bounds="parent">
        <div className="icon" style={{ position: "absolute" }}>
          <img 
            src={cloud} 
            width="300" 
            height="200" 
            alt="Cloud" 
            draggable={false}
            style={{ cursor: 'pointer' }}
            onDoubleClick={() => setUnzipClouds(true)} // Trigger unzip action
          />
        </div>
      </Draggable>



      <h2>
        <a href="#" onClick={openModal}>
          playful
        </a>, I’m trying to build a vocabulary for how I feel about time—not just fast or slow, short or long, old or ancient. 
        Time, to me, is deeply sentimental. It’s never just passing—it’s always intertwined with the things that are happening, with moments that stay with me.
      </h2>

      {/* Modal with the video */}
      {isModalOpen && (
        <Draggable defaultPosition={{ x: -220, y: 200 }}>
          <div style={modalStyles}>
            <div style={modalContentStyles}>
              <video width="400" autoPlay loop>
                <source src={localVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

// Styles for the modal
const modalStyles: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const modalContentStyles: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

export default ClockFolderContent;
