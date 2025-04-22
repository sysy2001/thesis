import React from 'react';
import Draggable from 'react-draggable';

interface ScreenshotModalProps {
  image: string;
  onClose: () => void;
  position: { x: number; y: number };
}

const ScreenshotModal: React.FC<ScreenshotModalProps> = ({ image, onClose, position }) => {
  return (
    <Draggable defaultPosition={position}>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ width: 'auto', maxWidth: '60%', padding: '20px' }}>
          <button className="modal-close" onClick={onClose}>×</button>
          <img 
            src={image} 
            alt="Zoomed Screenshot" 
            style={{ maxWidth: '100%', maxHeight: '70vh' }} 
            draggable={false}
          />
        </div>
      </div>
    </Draggable>
  );
};

export default ScreenshotModal; 