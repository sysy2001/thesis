import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import TextFileIcon from '../assets/file-folder.png';
import NotesIcon from '../assets/notes.png';
import TrashIcon from '../assets/trash.png';
import ScreenshotIcon1 from '../assets/screenshot-1.png';
import ScreenshotIcon2 from '../assets/screenshot-2.png';
import ScreenshotIcon3 from '../assets/screenshot-3.png';
import ScreenshotIcon4 from '../assets/screenshot-4.png';
import ScreenshotIcon5 from '../assets/screenshot-5.png';
import ScreenshotIcon6 from '../assets/screenshot-6.png';
import ScreenshotIcon7 from '../assets/screenshot-7.png';
import ScreenshotIcon8 from '../assets/screenshot-8.png';
import ScreenshotIcon9 from '../assets/screenshot-9.png';
import ScreenshotIcon10 from '../assets/screenshot-10.png'; 
import ScreenshotIcon11 from '../assets/screenshot-11.png';
import ScreenshotZoom1 from '../assets/screenshot-1-zoom.png';
import ScreenshotZoom2 from '../assets/screenshot-2-zoom.png';
import ScreenshotZoom3 from '../assets/screenshot-3-zoom.png';
import ScreenshotZoom4 from '../assets/screenshot-4-zoom.png';
import ScreenshotZoom5 from '../assets/screenshot-5-zoom.png';
import ScreenshotZoom6 from '../assets/screenshot-6-zoom.png';
import ScreenshotZoom7 from '../assets/screenshot-7-zoom.png';
import ScreenshotZoom8 from '../assets/screenshot-8-zoom.png';
import ScreenshotZoom9 from '../assets/screenshot-9-zoom.png';
import ScreenshotZoom10 from '../assets/screenshot-10-zoom.png';
import ScreenshotZoom11 from '../assets/screenshot-11-zoom.png';
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
import TodoIcon from '../assets/todo.png';
import { Clouds, fixedPositions } from '../data/CloudAssets.tsx';
import MusicFolderContent from './MusicFolderContent';
import TodoFolderContent from './TodoFolderContent';
import ScreenshotModal from './ScreenshotModal';
import YouTubeIcon from '../assets/youtube.png';
import YouTubeWindow from './YouTubeWindow';

type CloudType = {
  id: number;
  src: string;
  caption: string;
  top: string;
  left: string;
};

interface OpenScreenshot {
  id: string;
  image: string;
  position: { x: number; y: number };
}

interface ScreenshotConfig {
  zoomed: string;
}

type ScreenshotConfigMap = {
  [key: string]: ScreenshotConfig;
};

const Home: React.FC = () => {
  const [folders, setFolders] = useState<{ [key: string]: { isOpen: boolean; image: string } }>({
    Journal: { isOpen: false, image: FolderIcon1 },
    Time: { isOpen: false, image: FolderIcon2 },
    Music: { isOpen: false, image: FolderIcon3 },
    Todo: { isOpen: false, image: TodoIcon },
    Cookbook: { isOpen: false, image: FolderIcon5 },
    Photos: { isOpen: false, image: FolderIcon6 },
    Games: { isOpen: false, image: FolderIcon7 },
    YouTube: { isOpen: false, image: YouTubeIcon },
    README: { isOpen: true, image: TextFileIcon },
    'notes.txt': { isOpen: false, image: NotesIcon },
    'Trash': { isOpen: false, image: TrashIcon },
    'screenshot-1': { isOpen: false, image: ScreenshotIcon1 },
    'screenshot-2': { isOpen: false, image: ScreenshotIcon2 },
    'screenshot-3': { isOpen: false, image: ScreenshotIcon3 },
    'screenshot-4': { isOpen: false, image: ScreenshotIcon4 },
    'screenshot-5': { isOpen: false, image: ScreenshotIcon5 },
    'screenshot-6': { isOpen: false, image: ScreenshotIcon6 },
    'screenshot-7': { isOpen: false, image: ScreenshotIcon7 },
    'screenshot-8': { isOpen: false, image: ScreenshotIcon8 },
    'screenshot-9': { isOpen: false, image: ScreenshotIcon9 },
    'screenshot-10': { isOpen: false, image: ScreenshotIcon10 },
    'screenshot-11': { isOpen: false, image: ScreenshotIcon11 },
  });

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [unzipClouds, setUnzipClouds] = useState<boolean>(false);
  const [fadingImages, setFadingImages] = useState<number[]>([]);
  const [openScreenshots, setOpenScreenshots] = useState<OpenScreenshot[]>([]);

  const handleExternalLink = (link: string) => {
    window.open(link, '_blank');
  };

  const toggleFolder = (folderName: string) => {
    if (folderName.startsWith('screenshot-')) {
      handleScreenshotClick(folderName);
    } else {
      setFolders(prev => ({
        ...prev,
        [folderName]: { ...prev[folderName], isOpen: !prev[folderName].isOpen }
      }));
    }
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

  const handleScreenshotClick = (screenshotId: string) => {
    const screenshotConfig: ScreenshotConfigMap = {
      'screenshot-1': { zoomed: ScreenshotZoom1 },
      'screenshot-2': { zoomed: ScreenshotZoom2 },
      'screenshot-3': { zoomed: ScreenshotZoom3 },
      'screenshot-4': { zoomed: ScreenshotZoom4 },
      'screenshot-5': { zoomed: ScreenshotZoom5 },
      'screenshot-6': { zoomed: ScreenshotZoom6 },
      'screenshot-7': { zoomed: ScreenshotZoom7 },
      'screenshot-8': { zoomed: ScreenshotZoom8 },
      'screenshot-9': { zoomed: ScreenshotZoom9 },
      'screenshot-10': { zoomed: ScreenshotZoom10 },
      'screenshot-11': { zoomed: ScreenshotZoom11 },
    };

    const config = screenshotConfig[screenshotId];
    if (config) {
      setOpenScreenshots(prev => [...prev, {
        id: screenshotId,
        image: config.zoomed,
        position: { x: 100 + (prev.length * 20), y: -90 + (prev.length * 20) }
      }]);
    }
  };

  const handleCloseScreenshot = (id: string) => {
    setOpenScreenshots(prev => prev.filter(screenshot => screenshot.id !== id));
  };

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
          ) : folderName === 'Todo' ? (
            <Draggable handle="strong" key={folderName}>
              <div>
                <TodoFolderContent onClose={() => toggleFolder(folderName)} />
              </div>
            </Draggable>
          ) : folderName === 'YouTube' ? (
            <YouTubeWindow key={folderName} onClose={() => toggleFolder(folderName)} />
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

      {/* Screenshot Modals */}
      {openScreenshots.map(screenshot => (
        <ScreenshotModal
          key={screenshot.id}
          image={screenshot.image}
          onClose={() => handleCloseScreenshot(screenshot.id)}
          position={screenshot.position}
        />
      ))}
    </div>
  );
};

export default Home;
