import React, { useState } from 'react';
import Draggable from 'react-draggable';

import star_icon1 from '../assets/star_icon1.png';
import star_icon2 from '../assets/star_icon2.png';
import star_icon3 from '../assets/star_icon3.png';
import star_icon4 from '../assets/star_icon4.png';
import star_icon5 from '../assets/star_icon5.png';
import star_icon6 from '../assets/star_icon6.png';
import star_icon7 from '../assets/star_icon7.png';
import star_icon8 from '../assets/star_icon8.png';
import star_icon9 from '../assets/star_icon9.png';
import star_icon10 from '../assets/star_icon10.png';
import star_icon11 from '../assets/star_icon11.png';
import zoomed_photo1 from '../assets/zoomed1.png';
import './Component.css';

interface PhotosFolderContentProps {
  onClose: () => void;
}

interface ImageInfo {
  src: string;
  color: string;
}

interface ZoomedImage {
  id: number;
  src: string;
  color: string;
  x: number;
  y: number;
  showBanner: boolean;
}

const PhotosFolderContent: React.FC<PhotosFolderContentProps> = ({ }) => {
  const [zoomedImages, setZoomedImages] = useState<ZoomedImage[]>([]);

  const toggleBanner = (id: number) => {
    setZoomedImages(prev =>
      prev.map(img =>
        img.id === id ? { ...img, showBanner: !img.showBanner } : img
      )
    );
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLImageElement>, src: string, id: number, color: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setZoomedImages(prev => [...prev, {
      id,
      src,
      color,
      x: rect.left,
      y: rect.top,
      showBanner: false,
    }]);
  };

  const handleCloseZoom = (id: number) => {
    setZoomedImages(prev => prev.filter(img => img.id !== id));
  };


  const images: ImageInfo[] = [
    { src: star_icon1, color: '#a3def7' },
    { src: star_icon2, color: '#f7e96d' },
    { src: star_icon3, color: '#f75993' },
    { src: star_icon4, color: '#d47ff5' },
    { src: star_icon5, color: '#7ff5a3' },
    { src: star_icon6, color: '#f78c68' },
    { src: star_icon7, color: '#ffbb54' },
    { src: star_icon8, color: '#997dff' },
    { src: star_icon9, color: '#a8ff7d' },
    { src: star_icon10, color: '#ff7db5' },
    { src: star_icon11, color: '#ffff75' }
  ];

  const zoomed = [zoomed_photo1, zoomed_photo1, zoomed_photo1, zoomed_photo1, zoomed_photo1, zoomed_photo1, zoomed_photo1, zoomed_photo1, zoomed_photo1, zoomed_photo1, zoomed_photo1];

  const starItems = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    src: images[index % images.length].src,
    color: images[index % images.length].color
  }));

  return (
    <>
      <div className="photo-grid-container">
        <div className="photo-grid">
          {starItems.map((item) => (
            <Draggable key={item.id} defaultPosition={{ x: 0, y: 0 }} bounds="parent">
              <div className="photo-item" style={{ borderColor: item.color }}>
                <img
                  src={item.src}
                  width="80"
                  height="80"
                  alt={`Cloud ${item.id}`}
                  draggable={false}
                  onDoubleClick={(e) => handleDoubleClick(e, item.src, item.id, item.color)}
                />
                <p>img {item.id}</p>
              </div>
            </Draggable>
          ))}
        </div>
      </div>

      {zoomedImages.map((zoomedImage, index) => {
        const offset = index * 20;
        const starIconIndex = (zoomedImage.id - 1) % images.length;
        const currentStarIcon = images[starIconIndex].src;

        return (
          <Draggable
            key={zoomedImage.id}
            defaultPosition={{ x: -300 + offset, y: 100 + offset }}
          >
            <div className="zoom-box-fixed" style={{ borderColor: zoomedImage.color }}>
              <button className="zoom-close" onClick={() => handleCloseZoom(zoomedImage.id)}>×</button>

              <div className="zoomed-image-wrapper">
                <img 
                  src={zoomed[zoomedImage.id]} 
                  width="auto"
                  height="auto"
                  alt={`Zoomed image ${zoomedImage.id}`}
                />

                <button 
                  className="reveal-banner-btn"
                  onClick={() => toggleBanner(zoomedImage.id)}
                  style={{ backgroundColor: zoomedImage.color }}
                >
                  <img src={currentStarIcon} width="40" height="40" alt="Star icon" className="star-icon" draggable={false}/>
                </button>

                {zoomedImage.showBanner && (
                  <div className="lucky-strip" style={{ backgroundColor: zoomedImage.color }}>
                   Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  </div>
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
