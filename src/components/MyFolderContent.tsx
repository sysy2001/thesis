import { useState } from 'react';
import { createPortal } from 'react-dom';
import Draggable from 'react-draggable';
import JournalCover from '../assets/journal.png';
import Guitar from '../assets/guitar.png';
import MusicSheet from '../assets/music-sheet.jpg';

const MyFolderContent: React.FC = () => {
  const [openMusicSheet, setOpenMusicSheet] = useState<boolean>(false);

  return (
    <>
      <Draggable
        defaultPosition={{x: 20, y: 20}}
        bounds="parent"
      >
        <div className="icon" style={{ position: "absolute" }}>
          <img
            src={JournalCover}
            width="100"
            height="100"
            alt="Journal"
            draggable={false}
          />
        </div>
      </Draggable>

      <Draggable
        defaultPosition={{x: 140, y: 20}}
        bounds="parent"
      >
        <div 
          className="icon" 
          style={{ position: "absolute" }}
          onDoubleClick={() => setOpenMusicSheet(true)}
        >
          <img 
            src={Guitar} 
            width="120" 
            height="250" 
            alt="Guitar" 
            draggable={false}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </Draggable>

      {/* Music Sheet Window */}
      {openMusicSheet && createPortal(
        <Draggable 
          handle="strong"
          defaultPosition={{x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 - 300}}
        >
          <div style={{ 
            position: 'fixed', 
            width: 'fit-content', 
            background: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 9999
          }}>
            <strong style={{ 
              position: 'absolute', 
              top: '5px', 
              right: '5px', 
              cursor: 'pointer',
              zIndex: 10000
            }}>
              <button 
                onClick={() => setOpenMusicSheet(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >X</button>
            </strong>
            <img 
              src={MusicSheet} 
              alt="Music Sheet" 
              style={{ 
                maxWidth: '800px',
                maxHeight: '600px',
                display: 'block'
              }}
            />
          </div>
        </Draggable>,
        document.body
      )}
    </>
  );
};

export default MyFolderContent; 