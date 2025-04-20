import React from 'react';
import './Component.css';
import PhotosFolderContent from './PhotosFolderContent';
import ClockFolderContent from './ClockFolderContent';
import JournalFolderContent from './JournalFolderContent';
import ReadmeFolderContent from './ReadmeFolderContent';
import GameFolderContent from './GameFolderContent';
import RecipeFolderContent from './RecipeFolderContent';
interface FolderWindowProps {
  name: string;
  onClose: () => void;
  unzipClouds: boolean;
  setUnzipClouds: React.Dispatch<React.SetStateAction<boolean>>;
}

const FolderWindow: React.FC<FolderWindowProps> = ({ name, onClose, unzipClouds, setUnzipClouds }) => {
  return (
    <div className="folder-window">
      <strong className="folder-header">
        <h2>{name}</h2>
        <button className="close-button" onClick={onClose}>X</button>
      </strong>
      <div className="folder-content">
        {name === "Photos" ? (
          <PhotosFolderContent onClose={onClose} />
        ) : name === "Time" ? (
          <ClockFolderContent unzipClouds={unzipClouds} setUnzipClouds={setUnzipClouds} />
        ) : name === "Journal" ? (
          <JournalFolderContent onClose={onClose} />
        ) : name === "README" ? (
          <ReadmeFolderContent onClose={onClose} />
        ) : name === "Games" ? (
          <GameFolderContent onClose={onClose} />
        ) : name === "Cookbook" ? (
          <RecipeFolderContent onClose={onClose} />
        ) : (
          <div className="folder-content-text">
            <p>This is the {name} folder content.</p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderWindow;
