import MyFolderContent from './MyFolderContent';
import TestFolderContent from './TestFolderContent';

interface FolderWindowProps {
  name: string;
  onClose: () => void;
}

const FolderWindow: React.FC<FolderWindowProps> = ({ name, onClose }) => {
  return (
    <div className="folder-window open">
      <strong className="folder-header">
        <span>{name}</span>
        <button onClick={onClose}>X</button>
      </strong>
      <div 
        className="folder-content" 
        style={{ 
          position: "relative", 
          width: "500px", 
          height: "400px", 
          overflow: "hidden" 
        }}
      >
        {name === "My Folder" && <MyFolderContent />}
        {name === "Test" && <TestFolderContent />}
      </div>
    </div>
  );
};

export default FolderWindow; 