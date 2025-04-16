import React, { useState} from 'react';
import Draggable from 'react-draggable';
import cloud1 from '../assets/cloud-1.png';
import cloud2 from '../assets/cloud-2.png';
import cloud3 from '../assets/cloud-3.png';
import cloud4 from '../assets/cloud-4.png';
import cloud5 from '../assets/cloud-5.png';
import cloud6 from '../assets/cloud-6.png';
import cloud7 from '../assets/cloud-7.png';
import cloud8 from '../assets/cloud-8.png';
import './Component.css';

interface PhotosFolderContentProps {
  onClose: () => void;
}

interface ZoomedImage {
  id: number;
  src: string;
  x: number;
  y: number;
}

const PhotosFolderContent: React.FC<PhotosFolderContentProps> = ({ }) => {
  const [zoomedImages, setZoomedImages] = useState<ZoomedImage[]>([]);
  const [hoveringImage, setHoveringImage] = useState<number | null>(null);

  const handleDoubleClick = (event: React.MouseEvent<HTMLImageElement>, src: string, id: number) => {
    const rect = event.currentTarget.getBoundingClientRect();
    // const offset = zoomedImages.length * 20; // 20px offset for each new image
    setZoomedImages(prev => [...prev, {
      id,
      src,
      x: rect.left,
      y: rect.top,
    }]);
  };

  const handleCloseZoom = (id: number) => {
    setZoomedImages(prev => prev.filter(img => img.id !== id));
  };

  const handleMouseEnter = (id: number) => {
    setHoveringImage(id);
  };

  const handleMouseLeave = () => {
    setHoveringImage(null);
  };

  const cloudImages = [cloud1, cloud2, cloud3, cloud4, cloud5, cloud6, cloud7, cloud8];
  const cloudItems = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    src: cloudImages[index % cloudImages.length], 
  }));

  return (
    <>
      <div className="photo-grid-container">
        <div className="photo-grid">
          {cloudItems.map((item) => (
            <Draggable key={item.id} defaultPosition={{ x: 0, y: 0 }} bounds="parent">
              <div className="photo-item">
                <img
                  src={item.src}
                  width="80"
                  height="80"
                  alt={`Cloud ${item.id}`}
                  draggable={false}
                  onDoubleClick={(e) => handleDoubleClick(e, item.src, item.id)}
                />
                <p>Cloud {item.id}</p>
              </div>
            </Draggable>
          ))}
        </div>
      </div>

      {zoomedImages.map((zoomedImage, index) => {
        const offset = index * 20; // 20px offset for each image
        return (
          <Draggable key={zoomedImage.id} defaultPosition={{ x: -300 + offset, y: 100 + offset }}>
            <div className="zoom-box-fixed">
              <button className="zoom-close" onClick={() => handleCloseZoom(zoomedImage.id)}>×</button>
              <div 
                onMouseEnter={() => handleMouseEnter(zoomedImage.id)}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src={zoomedImage.src} 
                  alt={`Zoomed cloud ${zoomedImage.id}`}
                />
                {hoveringImage === zoomedImage.id && (
                  <div className="hover-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </div>
                )}
              </div>
            </div>
          </Draggable>
        );
      })}
    </>
  );
};

export default PhotosFolderContent;
