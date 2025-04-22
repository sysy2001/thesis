import React, { useState, useEffect } from "react";


interface ClockFolderContentProps {
  unzipClouds: boolean;
  setUnzipClouds: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClockFolderContent: React.FC<ClockFolderContentProps> = ({ setUnzipClouds }) => {
    const [timeSpent, setTimeSpent] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000); 
    
      return () => clearInterval(interval); 
    }, []);
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
      };    

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

      <p>
      You’ve been here for <span className="time">{formatTime(timeSpent)}</span> now &lt;3 <br></br><br></br>

        Last winter, I made a clock, just like the icon here. I spent a long time figuring out what kind of clock I would like, 
        and what aspects of time I wanted to represent.
        
        I saw this <a href="https://nomena.co.jp/project/watchesthatforgottheirrole01/" target="_blank" rel="noopener noreferrer">video</a> and I loved it so much.
        I wanted to make a clock as playful as this one. 
        Later, inspired by a merry-go-round, I created a <span className="highlight-cloud" onDoubleClick={() => setUnzipClouds(true)}>clouds and rain</span>  themed clock, with abstract, natured inspried element. 
       
        
        

        I’m trying to build up my vocabulary for how I feel about time—not just fast or slow, short or long, old or ancient. 
        Time to me is something more sentimental. <br></br><br></br>
        It’s never just passing—it’s always intertwined with the things that are happening, with moments that stay with me, so maybe it was that association
        made time itself more personal. It could be as straight forward as how I observe the clock's motion, but it could also be as subtle as when I notice the tulips blooming on the street. Right?<br></br><br></br>

        


        
      




      </p>


    </div>
  );
};


export default ClockFolderContent;
