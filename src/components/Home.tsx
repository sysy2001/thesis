import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import TextFileIcon from '../assets/file-folder.png';
import NotesIcon from '../assets/notes.png';
import TrashIcon from '../assets/trash.png';
import ScreenshotIcon from '../assets/screenshot-1.png';
import ScreenshotZoom from '../assets/screenshot-1-zoom.png';
import FolderIconComponent from './FolderIcon';
import FolderWindow from './FolderWindow';
import ReadmeFolderContent from './ReadmeFolderContent';
import './Component.css';
import FolderIcon1 from '../assets/folder-1.png';
import FolderIcon2 from '../assets/folder-2.png';
import FolderIcon3 from '../assets/folder-3.png';
import FolderIcon5 from '../assets/folder-5.png';
import FolderIcon6 from '../assets/folder-6.png';
import FolderIcon7 from '../assets/folder-7.png';
import { Clouds, fixedPositions } from '../data/CloudAssets.tsx';
import MusicFolderContent from './MusicFolderContent';

type CloudType = {
  id: number;
  src: string;
  caption: string;
  top: string;
  left: string;
};


const Home: React.FC = () => {
  const [folders, setFolders] = useState<{ [key: string]: { isOpen: boolean; image: string } }>({
    Journal: { isOpen: false, image: FolderIcon1 },
    Time: { isOpen: false, image: FolderIcon2 },
    Music: { isOpen: false, image: FolderIcon3 },
    Cookbook: { isOpen: false, image: FolderIcon5 },
    Photos: { isOpen: false, image: FolderIcon6 },
    Games: { isOpen: false, image: FolderIcon7 },
    README: { isOpen: true, image: TextFileIcon },
    'notes.txt': { isOpen: false, image: NotesIcon },
    'Trash': { isOpen: false, image: TrashIcon },
    'screenshot-1': { isOpen: false, image: ScreenshotIcon },
    'screenshot-2': { isOpen: false, image: ScreenshotIcon },
    'screenshot-3': { isOpen: false, image: ScreenshotIcon },
    'screenshot-4': { isOpen: false, image: ScreenshotIcon },
    'screenshot-5': { isOpen: false, image: ScreenshotIcon },
    'screenshot-6': { isOpen: false, image: ScreenshotIcon },
    'screenshot-7': { isOpen: false, image: ScreenshotIcon },
    'screenshot-8': { isOpen: false, image: ScreenshotIcon },
    'screenshot-9': { isOpen: false, image: ScreenshotIcon },
    'screenshot-10': { isOpen: false, image: ScreenshotIcon },
    'screenshot-11': { isOpen: false, image: ScreenshotIcon },
  });

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [unzipClouds, setUnzipClouds] = useState<boolean>(false);
  const [fadingImages, setFadingImages] = useState<number[]>([]);
  const [showZoomedScreenshot, setShowZoomedScreenshot] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState<string>('');

  const toggleFolder = (folderName: string) => {
    if (folderName.startsWith('screenshot-')) {
      setCurrentScreenshot(folderName);
      setShowZoomedScreenshot(true);
      return;
    }
    setFolders((prev) => ({
      ...prev,
      [folderName]: { ...prev[folderName], isOpen: !prev[folderName].isOpen },
    }));
  };

  const handleSelect = (folderName: string) => {
    setSelectedFolder(folderName);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const imageClick = (id: number) => {
    setFadingImages((prev) => [...prev, id]);

    setTimeout(() => {
      setCloudArray((prev) => prev.filter((img) => img.id !== id));
      setFadingImages((prev) => prev.filter((i) => i !== id));
    }, 5000);
  };
  
  const [cloudArray, setCloudArray] = useState<CloudType[]>(
    Clouds.map((cloud, index) => ({
      ...cloud, 
      top: fixedPositions[index].top, 
      left: fixedPositions[index].left,
    }))
  );
  
  

  useEffect(() => {
    if (cloudArray.length === 0 && unzipClouds) {
      setUnzipClouds(false);

      setCloudArray(
        Clouds.map((cloud, index) => ({
          ...cloud,
          ...fixedPositions[index],
        }))
      );
    }
  }, [cloudArray, unzipClouds]);

  return (
    <div className="desktop">
      {unzipClouds && (
        <div className="cloud-overlay">
          {cloudArray.map((image) =>
            fadingImages.includes(image.id) ? (
              <div
                key={image.id}
                className="image-container fade"
                style={{ top: image.top, left: image.left, position: 'absolute' }}
              >
                <img src={image.src} alt="cloud" className="cloud-image" />
                <div className="caption">
                  {image.caption.split('').map((char, i) => (
                    <span
                      key={i}
                      className="letter-drop"
                      style={{
                        animationDelay: `3s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div
                key={image.id}
                className="image-container"
                style={{ top: image.top, left: image.left, position: 'absolute' }}
                onClick={() => imageClick(image.id)}
              >
                <img src={image.src} alt="cloud" className="cloud-image" />
              </div>
            )
          )}
        </div>
      )}

      {/* Folder Icons */}
      {Object.entries(folders).map(([folderName, folderData], index) => (
        <FolderIconComponent
          key={folderName}
          name={folderName}
          index={index}
          onToggle={toggleFolder}
          image={folderData.image}
          isSelected={selectedFolder === folderName}
          onSelect={handleSelect}
        />
      ))}

      {/* Folder Windows */}
      {Object.entries(folders).map(([folderName, folderData]) =>
        folderData.isOpen ? (
          folderName === 'Music' ? (
            <MusicFolderContent key={folderName} onClose={() => toggleFolder(folderName)} />
          ) : (
            <Draggable handle="strong" key={folderName}>
              <div>
                {folderName === 'README' ? (
                  <ReadmeFolderContent onClose={() => toggleFolder(folderName)} />
                ) : (
                  <FolderWindow
                    name={folderName}
                    onClose={() => toggleFolder(folderName)}
                    unzipClouds={unzipClouds}
                    setUnzipClouds={setUnzipClouds}
                  />
                )}
              </div>
            </Draggable>
          )
        ) : null
      )}

      {/*zoomed screenshot modal */}
      {showZoomedScreenshot && (
        <Draggable >
        <div className="modal-overlay" onClick={() => setShowZoomedScreenshot(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ width: 'auto', maxWidth: '60%', padding: '20px' }}>
            <button className="modal-close" onClick={() => setShowZoomedScreenshot(false)}>×</button>
            <img 
              src={ScreenshotZoom} 
              alt="Zoomed Screenshot" 
              style={{ maxWidth: '100%', maxHeight: '50vh' }} 
              draggable={false}
            />
          </div>
        </div></Draggable>
      )}
    </div>
  );
};

export default Home;
