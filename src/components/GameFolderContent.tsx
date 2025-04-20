import React, { useState } from 'react';
import './Component.css';
import Draggable from 'react-draggable';
import { ReactP5Wrapper } from "@p5-wrapper/react";

interface GameFolderContentProps {
  onClose: () => void;
}


//inspired by https://codepen.io/meiq/pen/drGYVj

class Dot {
  x: number;
  y: number;
  size: number;
  color: number[];
  isHovered: boolean;
  num: string;
  text: string;
  isConnected: boolean;
  isNextAvailable: boolean;

  constructor(x: number, y: number, num: string = '', text: string = '') {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.color = [0, 0, 0]; 
    this.isHovered = false;
    this.num = num;
    this.text = text;
    this.isConnected = false;
    this.isNextAvailable = false;
  }

  draw(p5: any) {
    if (this.isConnected) {
      p5.textSize(12);
      p5.textAlign(p5.CENTER);
      p5.noStroke();
      p5.text(this.text, this.x - this.size - 15, this.y - this.size - 15);  
    }
   
    p5.strokeWeight(0.2);
    p5.ellipse(this.x, this.y, this.size, this.size);

    if (this.num) {
      p5.fill(255);
      p5.textSize(12);
      p5.textAlign(p5.CENTER);
      p5.text(this.num, this.x, this.y + this.size + 15);
    } 



    if (this.isHovered) {
      p5.stroke(255, 255, 255);
      p5.strokeWeight(2);
      p5.noFill();
      p5.ellipse(this.x, this.y, this.size + 10, this.size + 10);
      p5.noStroke();
    }
  }

  connect(p5: any, otherDot: Dot) {
    p5.stroke(255);
    p5.strokeWeight(0.9);
    p5.line(this.x, this.y, otherDot.x, otherDot.y);
  }

  setColor(r: number, g: number, b: number) {
    this.color = [r, g, b];
  }

  setSize(size: number) {
    this.size = size;
  }

  setNum(num: string) {
    this.num = num;
  }

  setText(text: string) {
    this.text = text;
  }

  checkHover(p5: any) {
    const distance = p5.dist(p5.mouseX, p5.mouseY, this.x, this.y);
    this.isHovered = distance < this.size / 2;
    return this.isHovered;
  }

  isNear(p5: any, x: number, y: number) {
    return p5.dist(x, y, this.x, this.y) < this.size / 2;
  }
}

const sketch = (p5: any) => {
  let dots: Dot[] = [];
  let currentIndex = 0;
  let selectedDot: Dot | null = null;
  let connections: {from: Dot, to: Dot}[] = [];
  let gameComplete = false;
 

  let dotsArray = [
    { x: 580, y: 480, num: '1', text: 'I had a friend in primary school.' },
    { x: 620, y: 490, num: '2', text: 'She was really into astrology.' },
    { x: 660, y: 450, num: '3', text: 'She told me Pisces was the most beautiful sign.' },
    { x: 618, y: 410, num: '4', text: 'I looked it up and asked my mom to print out the constellation.' },
    { x: 585, y: 420, num: '5', text: 'Is it? The most beautiful sign?' },
    { x: 520, y: 400, num: '6', text: 'I started reading more about Pisces. I remembered some words—sentimental... imaginative...' },
    { x: 380, y: 390, num: '7', text: 'Well, I’m not obsessed with it.' },
    { x: 340, y: 382, num: '8', text: 'I just like knowing more about it—like knowing more about myself.' },
    { x: 210, y: 410, num: '9', text: 'I wouldn’t say we’re incompatible just because of our signs.' },
    { x: 150, y: 440, num: '10', text: 'If we’re compatible, it’s because of something else. Something like chemistry.' },
    { x: 205, y: 350, num: '11', text: 'Is that too abstract? Like all these lines and dots.' },
    { x: 260, y: 280, num: '12', text: 'I could be more specific about how I feel about connection.' },
    { x: 280, y: 230, num: '13', text: 'Curiosity is one of my love languages, alongside the others.' },
    { x: 320, y: 180, num: '14', text: 'So, if I’m curious about you,' },
    { x: 338, y: 125, num: '15', text: 'and you’re curious about me,' },
    { x: 310, y: 135, num: '16', text: 'then we’re already connected.' },
  ];

  p5.setup = () => {
    p5.createCanvas(800, 600);
    p5.background(225, 234, 205);
    dots = dotsArray.map(dot => new Dot(dot.x, dot.y, dot.num, dot.text));

    updateNextAvailableDot();
    
  };

  const updateNextAvailableDot = () => {
    dots.forEach(dot => dot.isNextAvailable = false);
    
    if (!gameComplete && currentIndex < dots.length) {
      dots[currentIndex].isNextAvailable = true;
    }
  };

  p5.draw = () => {
    p5.background(50, 64, 123);

    p5.stroke(255);
    p5.strokeWeight(0.9);
    p5.line(320, 180, 310, 135);  // Line between dots 14 and 16
    p5.line(580, 480, 585, 420);  // Line between dots 1 and 5

    connections.forEach(conn => {
      conn.from.connect(p5, conn.to);
    });

    dots.forEach(dot => dot.draw(p5));

    if (selectedDot) {
      p5.stroke(255);
      p5.strokeWeight(0.9);
      p5.line(selectedDot.x, selectedDot.y, p5.mouseX, p5.mouseY);
    }

    if (gameComplete) {
      p5.fill();
      p5.textSize(24);
      p5.textAlign(p5.CENTER);
    }
  };

  p5.mousePressed = () => {
    const clickedDotIndex = dots.findIndex(dot => dot.isNear(p5, p5.mouseX, p5.mouseY));
    
    if (clickedDotIndex !== -1) {
      const clickedDot = dots[clickedDotIndex];
      
      if (!selectedDot) {
        if (clickedDot.isNextAvailable) {
          selectedDot = clickedDot;
        }
      } else {
       
        if (clickedDotIndex === currentIndex + 1) {
          connections.push({from: selectedDot, to: clickedDot});
          selectedDot.isConnected = true;
          clickedDot.isConnected = true;
          currentIndex++;
          selectedDot = null;
          
          if (currentIndex === dots.length - 1) {
            gameComplete = true;
          }
          
          updateNextAvailableDot();
        }
      }
    }
  };

  p5.mouseReleased = () => {
    if (selectedDot) {
      const clickedDotIndex = dots.findIndex(dot => dot.isNear(p5, p5.mouseX, p5.mouseY));
      if (clickedDotIndex === -1) {
        selectedDot = null;
      }
    }
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
              <ReactP5Wrapper sketch={sketch} />
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default GameFolderContent;
