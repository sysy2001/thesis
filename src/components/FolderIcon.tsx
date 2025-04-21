import Draggable from 'react-draggable';


interface FolderIconProps {
  name: string;
  index: number;
  onToggle: (name: string) => void;
  image: string;
  isSelected: boolean;
  onSelect: (name: string) => void;
}

const folderPositions: { [key: string]: { x: number, y: number } } = {
  // 1 column
  "Journal": { x: -570, y: 20 },
  "Time": { x: -570, y: 150 },
  "Music": { x: -570, y: 270 },
  "Cookbook": { x: -570, y: 390 },
  "notes.txt": { x: -570, y: 510 },

  // 2 column
  "Photos": { x: -400, y: 20 },
  "Games": { x: -400, y: 150 },
  "README": { x: -400, y: 270 },
  "Trash": { x: -400, y: 510 },

  // 3 column
  "screenshot-7": { x: -70, y: 20 },
  "screenshot-8": { x: -70, y: 150 },
  "screenshot-9": { x: -70, y: 270 },

  // 4 column
  "screenshot-4": { x: -70, y: 390 },
  "screenshot-5": { x: -70, y: 510 },
  "screenshot-6": { x: 100, y: 20 },

  // 5 column
  "screenshot-1": { x: -230, y: 20 },
  "screenshot-2": { x: -230, y: 150 },
  "screenshot-3": { x: -230, y: 270 },
  "screenshot-10": { x: -230, y: 390 },
  "screenshot-11": { x: -230, y: 510 },

  "Something pink and cute": { x: 230, y: 20 },
  "Todo": { x: -400, y: 390 },
  "todo.txt": { x: -10, y: 630 },

};

const FolderIconComponent: React.FC<FolderIconProps> = ({ name, onToggle, image, isSelected, onSelect }) => {
  return (
    <Draggable defaultPosition={folderPositions[name]}>
      <div 
        className="folder-icon" 
        onDoubleClick={() => onToggle(name)}
        onClick={() => onSelect(name)}
        style={{ 
          backgroundColor: isSelected ? "rgba(128, 128, 128, 0.3)" : "transparent",
          borderRadius: '10px',
          padding: '5px'
        }}
      >
        <img 
          src={image} 
          alt={name} 
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