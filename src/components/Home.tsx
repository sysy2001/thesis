import { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import TextFileIcon from '../assets/file-folder.png';
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
import { Clouds, fixedPositions } from '../data/assets';
import MusicFolderContent from './MusicFolderContent';

interface CloudImage {
  id: number;
  src: string;
  caption: string;
  top: string;
  left: string;
}

const Home: React.FC = () => {
  const [folders, setFolders] = useState<{ [key: string]: { isOpen: boolean, image: string } }>({
    "Journal": { isOpen: false, image: FolderIcon1 },
    "Clock": { isOpen: false, image: FolderIcon2 },
    "Music": { isOpen: false, image: FolderIcon3 },
    "Recipes": { isOpen: false, image: FolderIcon5 },
    "Photos": { isOpen: false, image: FolderIcon6 },
    "Games": { isOpen: false, image: FolderIcon7 },
    "README": { isOpen: false, image: TextFileIcon },
  });

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [unzipClouds, setUnzipClouds] = useState<boolean>(false);
  const [fadingImages, setFadingImages] = useState<number[]>([]);
  const [cloudArray, setCloudArray] = useState<CloudImage[]>(
    Clouds.map((cloud, index) => ({
      ...cloud,
      ...fixedPositions[index],
    }))
  );

  const toggleFolder = (folderName: string) => {
    setFolders((prev) => ({
      ...prev,
      [folderName]: { ...prev[folderName], isOpen: !prev[folderName].isOpen },
    }));
  };

  const handleSelect = (folderName: string) => {
    setSelectedFolder(folderName);
  };

  const imageClick = (id: number) => {
    setFadingImages((prev) => [...prev, id]);
  
    setTimeout(() => {
      setCloudArray((prev) => prev.filter((img) => img.id !== id));
      setFadingImages((prev) => prev.filter((i) => i !== id));
    }, 5000); 
  };

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
                  {image.caption.split("").map((char: string, i: number) => (
                    <span
                      key={i}
                      className="letter-drop"
                      style={{
                        animationDelay: `3s`,
                        animationDuration: `${2 + Math.random() * 2}s`,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
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

      {Object.entries(folders).map(([folderName, folderData]) =>
        folderData.isOpen ? (
          folderName === "Music" ? (
            <MusicFolderContent onClose={() => toggleFolder(folderName)} />
          ) : (
            <Draggable handle="strong" key={folderName}>
              <div>
                {folderName === "README" ? (
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
    </div>
  );
};

export default Home;
