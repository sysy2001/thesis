import { useState } from 'react';
import Draggable from 'react-draggable';
import cloud_1 from './assets/cloud_1.png';

interface FolderIconProps {
  name: string;
  index: number;
  onToggle: (name: string) => void;
  image: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

const folderPositions: { [key: string]: { x: number, y: number } } = {
  // Left column
  "Journal": { x: -570, y: 20 },
  "Clock": { x: -570, y: 150 },
  "Music": { x: -570, y: 270 },
  "Recipes": { x: -570, y: 390 },
  // Right column
  "Photos": { x: -400, y: 20 },
  "Games": { x: -400, y: 150 },
  "README": { x: -400, y: 270 },
};

const FolderIconComponent: React.FC<FolderIconProps> = ({ name, onToggle, image, isSelected, onSelect }) => {
  return (
    <Draggable defaultPosition={folderPositions[name]}>
      <div 
        className="folder-icon" 
        onDoubleClick={() => onToggle(name)}
        onClick={() => onSelect(name)}
        style={{ 
          backgroundColor: isSelected ? "rgba(128, 128, 128, 0.3)" : "transparent",
          borderRadius: '10px',
          padding: '5px'
        }}
      >
        <img 
          src={image} 
          alt={name} 
          width="80" 
          height="80" 
          draggable={false} 
        />
        <p>{name}</p>
      </div>
    </Draggable>
  );
};

export default FolderIconComponent; 