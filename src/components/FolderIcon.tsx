import Draggable from 'react-draggable';
import FolderIcon from '../assets/folder.png';

interface FolderIconProps {
  name: string;
  index: number;
  onToggle: (name: string) => void;
}

const FolderIconComponent: React.FC<FolderIconProps> = ({ name, index, onToggle }) => {
  return (
    <Draggable 
      defaultPosition={{x: -570, y: 20 + (index * 20)}}
    >
      <div className="folder-icon" onDoubleClick={() => onToggle(name)}>
        <img 
          src={FolderIcon} 
          alt="Folder" 
          width="80" 
          height="80" 
          draggable={false} 
        />
        <p>{name}</p>
      </div>
    </Draggable>
  );
};

export default FolderIconComponent; 