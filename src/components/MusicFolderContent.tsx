import React, { useEffect, useRef, useState } from 'react';
import './MusicScroll.css';

interface MusicFolderContentProps {
  onClose: () => void;
}

const lyricLines = [
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", media: "/media/happy-song.mp3", type: "audio" },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", media: "/media/workout-song.mp3", type: "audio" },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", media: "/media/farewell-song.mp3", type: "audio" },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", media: "/media/earl-song.mp3", type: "audio" },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", media: "/media/moon-song.mp3", type: "audio" },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", media: "/media/cooking-song.mp3", type: "audio" },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", media: "/media/lunch-song.mp3", type: "audio" },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", media: "/media/roadtrip-song.mp3", type: "audio" },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", media: "/media/breakup-song.mp3", type: "audio" },
  { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", media: "/media/mitochondria-song.mp3", type: "audio" }
];

const MusicFolderContent: React.FC<MusicFolderContentProps> = ({ onClose }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) return;

    document.documentElement.style.setProperty('--lyric-count', lyricLines.length.toString());

    const handleScroll = () => {
      const scrollTop = scroller.scrollTop;
      const scrollHeight = scroller.scrollHeight - scroller.clientHeight;
      const sectionHeight = scrollHeight / (lyricLines.length - 1);

      const index = Math.min(
        Math.max(0, Math.floor(scrollTop / sectionHeight)),
        lyricLines.length - 1
      );
      setCurrentLine(index);
    };

    scroller.addEventListener('scroll', handleScroll);
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="music-overlay">
      <button className="close-button" onClick={onClose}>X</button>
      <div className="media-display">
        {lyricLines[currentLine].type === "audio" ? (
          <audio 
            controls 
            src={lyricLines[currentLine].media}
            autoPlay
            className="media-content"
          />
        ) : (
          <img 
            src={lyricLines[currentLine].media} 
            alt="Media content"
            className="media-content"
          />
        )}
      </div>
      <div className="scroller" ref={scrollRef}>
        <div className="scroll-content">
          {lyricLines.map((line, index) => (
            <p
              key={index}
              className={`lyric-line ${index === currentLine ? 'highlight-lyrics' : ''}`}
            >
              {line.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicFolderContent;
