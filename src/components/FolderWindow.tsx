import React from 'react';
import JournalFolderContent from './JournalFolderContent';
import ClockFolderContent from './ClockFolderContent';
import ReadmeFolderContent from './ReadmeFolderContent';

interface FolderWindowProps {
  name: string;
  onClose: () => void;
  unzipClouds?: boolean; // Optional prop
  setUnzipClouds?: React.Dispatch<React.SetStateAction<boolean>>; // Optional prop
}

const FolderWindow: React.FC<FolderWindowProps> = ({ name, onClose, unzipClouds, setUnzipClouds }) => {
  return (
    <div className="folder-window open">
      <strong className="folder-header">
        <span>{name}</span>
        <button onClick={onClose}>X</button>
      </strong>
      <div
        className="folder-content"
        style={{
          position: 'relative',
          overflow: 'auto',
        }}
      >
        {name === 'Journal' && <JournalFolderContent />}
        
        {name === 'Clock' && unzipClouds !== undefined && setUnzipClouds && (
          <ClockFolderContent unzipClouds={unzipClouds} setUnzipClouds={setUnzipClouds} />
        )}

        {name === 'README' && <ReadmeFolderContent onClose={onClose} />}
      </div>
    </div>
  );
};

export default FolderWindow;
