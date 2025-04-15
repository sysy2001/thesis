

interface ClockFolderContentProps {
  unzipClouds: boolean;
  setUnzipClouds: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClockFolderContent: React.FC<ClockFolderContentProps> = ({ setUnzipClouds }) => {


  return (
    <div>
      {/* <Draggable defaultPosition={{ x: 0, y: 0 }} bounds="parent">
        <div className="icon" style={{ position: "absolute" }}>
          <img 
            src={cloud} 
            width="300" 
            height="200" 
            alt="Cloud" 
            draggable={false}
            style={{ cursor: 'pointer' }}
            onDoubleClick={() => setUnzipClouds(true)} // Trigger unzip action
          />
        </div>
      </Draggable> */}

      <h2>
        
        {/* I’m trying to build a  */}
        
        <span className="highlight" onDoubleClick={() => setUnzipClouds(true)}> placeholder </span> 
        
        {/* vocabulary for how I feel about time—not just fast or slow, short or long, old or ancient. 
        Time, to me, is deeply sentimental. It’s never just passing—it’s always intertwined with the things that are happening, with moments that stay with me.
       */}
      </h2>


    </div>
  );
};


export default ClockFolderContent;
