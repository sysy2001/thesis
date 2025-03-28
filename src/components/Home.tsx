import { useState } from 'react';
import Draggable from 'react-draggable';
import TextFileIcon from '../assets/text-file.png';
import FolderIconComponent from './FolderIcon';
import FolderWindow from './FolderWindow';
import './Component.css';
import manifesto from '../assets/manifesto.jpg';
import { createPortal } from 'react-dom';

const Home: React.FC = () => {
  const [folders, setFolders] = useState<{ [key: string]: boolean }>({
    "My Folder": false,
    "Test": false,
  });

  const [textFileContent, setTextFileContent] = useState<string>("");
  const [openTextFileWindow, setOpenTextFileWindow] = useState<boolean>(false);
  const [openManifestoWindow, setOpenManifestoWindow] = useState<boolean>(false);

  const toggleFolder = (folderName: string) => {
    setFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const openTextFileContent = (content: string) => {
    setTextFileContent(content);
    setOpenTextFileWindow(true);
  };

  const handleBuiltClick = () => {
    setOpenManifestoWindow(true);
  };

  return (
    <div className="desktop">
      {/* Folder Icons */}
      {Object.keys(folders).map((folderName, index) => (
        <FolderIconComponent
          key={folderName}
          name={folderName}
          index={index}
          onToggle={toggleFolder}
        />
      ))}

      {/* Text File Icon on Desktop */}
      <Draggable
        defaultPosition={{x: -570, y: 300}}
      >
        <div 
          className="icon" 
          onDoubleClick={() => openTextFileContent(
            "Hi! I invite you to explore my digital space.\n\nSome memories fade, some linger, some (re)connect. "+
            "I <span class='highlight' data-action='built'>built</span> this site from recollections —personal, collective, digital. "+
            "It exists somewhere between past and present, between what is remembered and what is reconstructed.\n\n"+
            "<span class='highlight'>Instructions:</span>\n"+
            "Click, or double click.\n"+
            "Explore in any order.\n"
          )}
        >
          <img 
            src={TextFileIcon} 
            width="80" 
            height="80" 
            alt="Text File" 
            draggable={false} 
          />
          <p>README</p>
        </div>
      </Draggable>

      {/* Folder Windows */}
      {Object.entries(folders).map(([folderName, isOpen]) =>
        isOpen ? (
          <Draggable handle="strong"
            key={folderName}
            defaultPosition={{
              x: folderName === "My Folder" ? -100 : -150,
              y: folderName === "My Folder" ? -250 : -300
            }}
          >
            <div>
              <FolderWindow
                name={folderName}
                onClose={() => toggleFolder(folderName)}
              />
            </div>
          </Draggable>
        ) : null
      )}

      {/* Text File Window */}
      {openTextFileWindow && (
        <Draggable handle="strong">
          <div className="folder-window open">
            <strong className="folder-header">
              <span>README</span>
              <button onClick={() => setOpenTextFileWindow(false)}>X</button>
            </strong>
            <div className="folder-content">
              <div className="icon">
                <p dangerouslySetInnerHTML={{ __html: textFileContent }} onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.classList.contains('highlight') && target.getAttribute('data-action') === 'built') {
                    handleBuiltClick();
                  }
                }} />
              </div>
            </div>
          </div>
        </Draggable>
      )}

      {/* Manifesto Window */}
      {openManifestoWindow && createPortal(
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
            />
          </div>
        </Draggable>,
        document.body
      )}
    </div>
  );
};

export default Home;
