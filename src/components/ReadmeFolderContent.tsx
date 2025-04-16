import { useState } from 'react';
import Draggable from 'react-draggable';
import manifesto from '../assets/manifesto.jpg';
import { createPortal } from 'react-dom';
import React from 'react';
import './Component.css';

interface ReadmeFolderContentProps {
  onClose: () => void;
}

const ReadmeFolderContent: React.FC<ReadmeFolderContentProps> = ({ onClose }) => {
  const [openManifestoWindow, setOpenManifestoWindow] = useState<boolean>(false);

  const handleBuiltClick = () => {
    setOpenManifestoWindow(true);
  };

  return (
    <>
      <div className="folder-window open">
        <strong className="folder-header">
          <h2>README</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </strong>
        <div className="folder-content">
          <div >
            <p dangerouslySetInnerHTML={{ 
              __html: "Hi! I invite you to explore my digital space.\n\nSome memories fade, some linger, some (re)connect. "+
              "I <span class='highlight' data-action='built'>built</span> this site from recollections —personal, collective, digital. "+
              "It exists somewhere between past and present, between what is remembered and what is reconstructed.\n\n"+
              "<span class='bold'>Instructions:</span>\n"+
              "Click, or double click.\n"+
              "Explore in any order.\n"
            }} onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.classList.contains('highlight') && target.getAttribute('data-action') === 'built') {
                handleBuiltClick();
              }
            }} />
          </div>
        </div>
      </div>

      {/* Manifesto Window */}
      {openManifestoWindow && createPortal(
        <Draggable 
        //   handle="strong" not sure
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
                onClick={() => setOpenManifestoWindow(false)}
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
              src={manifesto} 
              alt="thesis explained" 
              style={{ 
                maxWidth: '800px',
                maxHeight: '600px',
                display: 'block'
              }}
              draggable={false}
            />
          </div>
        </Draggable>,
        document.body
      )}
    </>
  );
};

export default ReadmeFolderContent;
