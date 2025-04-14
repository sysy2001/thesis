import { useState } from 'react';
import { createPortal } from 'react-dom';
import Draggable from 'react-draggable';
import JournalCover from '../assets/journal.png';
import Guitar from '../assets/guitar.png';
import MusicSheet from '../assets/music-sheet.jpg';

const JournalFolderContent: React.FC = () => {

  return (
    <>
      <div className="folder-window">
        <strong className="folder-header">
          <span>Journal</span>
        </strong>
        
      </div>
    </>
  );
};

export default JournalFolderContent; 