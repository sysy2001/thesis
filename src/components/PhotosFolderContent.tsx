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
import photo_1 from '../assets/photo_1.png';
import photo_2 from '../assets/photo_2.png';
import photo_3 from '../assets/photo_3.png';
import photo_4 from '../assets/photo_4.png';
import photo_5 from '../assets/photo_5.png';
import photo_6 from '../assets/photo_6.png';
import photo_7 from '../assets/photo_7.png';
import photo_8 from '../assets/photo_8.png';
import photo_9 from '../assets/photo_9.png';
import photo_10 from '../assets/photo_10.png';
import photo_11 from '../assets/photo_11.png';
import photo_12 from '../assets/photo_12.png';
import photo_13 from '../assets/photo_13.png';
import photo_14 from '../assets/photo_14.png';
import photo_15 from '../assets/photo_15.png';
import photo_16 from '../assets/photo_16.png';
import photo_17 from '../assets/photo_17.png';
import photo_18 from '../assets/photo_18.png';
import photo_19 from '../assets/photo_19.png';
import photo_20 from '../assets/photo_20.png';

import './Component.css';

interface PhotosFolderContentProps {
  onClose: () => void;
}

interface ImageInfo {
  src: string;
  color: string;
  sentence: string;
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
    { src: star_icon1, color: '#a3def7', sentence: 'This was my college dorm room in my freshman year. Photo taken on August 23rd, 2019.' },
    { src: star_icon2, color: '#f7e96d', sentence: 'This is my favourite watch. I got it as a gift from my parents in 2016. I like how abstract the design is. Probably I was interested in time/clock/watch since then.' },
    { src: star_icon3, color: '#f75993', sentence: 'Mama and I. Last month when I was packing my stuff to travel to SF. I realized that most of my clothes white/grey/black now. So this is a rare, colorful version of little me.' },
    { src: star_icon4, color: '#d47ff5', sentence: 'Serious about food. Maybe that was my first time using fork and knife.' },
    { src: star_icon5, color: '#7ff5a3', sentence: 'Walked around Boston Public Garden with a friend from high school. Trying to take photos with my digital camera.' },
    { src: star_icon6, color: '#f78c68', sentence: 'Walked along Revere Beach in late summer.' },
    { src: star_icon7, color: '#ffbb54', sentence: 'My room when I first moved to Brookyn' },
    { src: star_icon8, color: '#997dff', sentence: 'A friend came to visit in Boston. We wandered around Cambridge and saw these beautiful trees.' },
    { src: star_icon9, color: '#a8ff7d', sentence: 'Sunset over the flower series drawings I made in college.' },
    { src: star_icon10, color: '#ff7db5', sentence: 'Shanghai rarely snows. For a long time in my life, I was very excited when it snowed, but sadly, I\'m not anymore.' },
    { src: star_icon11, color: '#ffff75', sentence: 'There was an iconic walk sign is on sound for accrossing this street. ' },
    { src: star_icon9, color: '#a8ff7d', sentence: 'This is me and my chibi maruko-chan scooter. I think I used to be sporty in this way' },
    { src: star_icon6, color: '#f78c68', sentence: 'I love trees.' },
    { src: star_icon1, color: '#a3def7', sentence: 'Joan Mitchell\'s painting. I love things that are abstract and expressive.' },
    { src: star_icon3, color: '#f75993', sentence: 'Saw this JOHN CAGE: 10 RULES FOR STUDENTS AND TEACHERS in our drawing studio in college. Saw it again in during an artist studio visit. I should probably start trying these rules' },
    { src: star_icon4, color: '#d47ff5', sentence: 'I was in javanese gamelan ensemble class once in college. I made some mistakes and I couldnt see myself struggle back then, so I left. Now I wish i should have stayed.' },
    { src: star_icon5, color: '#7ff5a3', sentence: 'Grandma told me this little bear was my childhood favourite.' },
    { src: star_icon8, color: '#997dff', sentence: 'Still the same little bear and another doll.' },
    { src: star_icon11, color: '#ffff75', sentence: 'I have a friend who is really into tarot. The summer when we were housemates, I got my own deck of cards.' },
    { src: star_icon7, color: '#ffbb54', sentence: 'Sick meal' },
  ]

  const zoomed = [
    photo_1, 
    photo_2, 
    photo_3, 
    photo_4, 
    photo_5, 
    photo_6, 
    photo_7, 
    photo_8, 
    photo_9, 
    photo_10, 
    photo_11,
    photo_12,
    photo_13,
    photo_14,
    photo_15,
    photo_16,
    photo_17,
    photo_18,
    photo_19,
    photo_20,
];

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
                  src={zoomed[zoomedImage.id - 1]} 
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
                    {images[starIconIndex].sentence}
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
