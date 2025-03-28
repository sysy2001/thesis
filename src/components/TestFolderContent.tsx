import Draggable from 'react-draggable';
import Nintendo from '../assets/nintendo.png';

const TestFolderContent: React.FC = () => {
  return (
    <Draggable
      defaultPosition={{x: 20, y: 20}}
      bounds={{
        left: 0,
        top: 0,
        right: 250,
        bottom: 150
      }}
    >
      <div className="icon" style={{ position: "absolute" }}>
        <img 
          src={Nintendo} 
          width="120" 
          height="100" 
          alt="Nintendo" 
          draggable={false} 
        />
      </div>
    </Draggable>
  );
};

export default TestFolderContent; 