import React, { useState } from 'react';
import './Component.css';
import Draggable from 'react-draggable';
import { ReactP5Wrapper } from "@p5-wrapper/react";

interface GameFolderContentProps {
  onClose: () => void;
}

const sketch = (p5: any) => {
  p5.setup = () => {
    p5.createCanvas(800, 400);
    p5.background(225, 234, 205);
  };

  p5.draw = () => {
    p5.fill(0, 255, 0);
    p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
  };
};

const GameFolderContent: React.FC<GameFolderContentProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        Do you want to play a <a onClick={handleOpen} className="game-link">game</a>?
      </div>

      {isModalOpen && (
        <Draggable>
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={handleClose}>×</button>
              <h2>hahaha green is pretty</h2>
              <p>lalalala.</p>
              <ReactP5Wrapper sketch={sketch} />
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default GameFolderContent;
