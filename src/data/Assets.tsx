import cloud1 from '../assets/cloud-1.png';
import cloud2 from '../assets/cloud-2.png';
import cloud3 from '../assets/cloud-3.png';
import cloud4 from '../assets/cloud-4.png';
import cloud5 from '../assets/cloud-5.png';
import cloud6 from '../assets/cloud-6.png';
import cloud7 from '../assets/cloud-7.png';
import cloud8 from '../assets/cloud-8.png';

export interface Cloud {
  id: number;
  src: string;
  caption: string;
}

export interface Position {
  top: string;
  left: string;
}

export const Clouds: Cloud[] = [
  { id: 1, src: "/assets/cloud1.png", caption: "Cloud 1" },
  { id: 2, src: "/assets/cloud2.png", caption: "Cloud 2" },
  { id: 3, src: "/assets/cloud3.png", caption: "Cloud 3" },
  { id: 4, src: "/assets/cloud4.png", caption: "Cloud 4" },
  { id: 5, src: "/assets/cloud5.png", caption: "Cloud 5" },
  { id: 6, src: "/assets/cloud6.png", caption: "Cloud 6" },
  { id: 7, src: "/assets/cloud7.png", caption: "Cloud 7" },
  { id: 8, src: "/assets/cloud8.png", caption: "Cloud 8" },
];

export const fixedPositions: Position[] = [
  { top: "10%", left: "20%" },
  { top: "30%", left: "60%" },
  { top: "50%", left: "40%" },
  { top: "10vh", left: "10vw" },
  { top: "27vh", left: "60vw" },
  { top: "45vh", left: "5vw" },
  { top: "57vh", left: "23vw" },
  { top: "50vh", left: "44vw" },
  { top: "55vh", left: "75vw" },
  { top: "5vh", left: "75vw" },
  { top: "20vh", left: "30vw" },
];
