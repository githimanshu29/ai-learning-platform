// components/ui/AnimatedSpinner.jsx

import React from 'react';

const AnimatedSpinner = () => {
    // We embed the CSS directly into the component using a <style> tag.
    // This makes the component self-contained and easy to drop into any project.
    const styles = `
      .loader-container {
        display: grid;
        grid-template-columns: repeat(3, 30px);
        grid-template-rows: repeat(3, 30px);
        gap: 8px;
        /* This perspective is key for the 3D effect */
        perspective: 800px;
      }
  
      .cube {
        width: 30px;
        height: 30px;
        background-color: #4fa94d;
        transform-style: preserve-3d;
        /* Apply the animation */
        animation: morph-and-rotate 2.5s infinite ease-in-out;
      }
  
      /* Stagger the animation delay for each cube to create the wave effect */
      .cube:nth-child(1) { animation-delay: 0.0s; }
      .cube:nth-child(2) { animation-delay: 0.1s; }
      .cube:nth-child(3) { animation-delay: 0.2s; }
      .cube:nth-child(4) { animation-delay: 0.1s; }
      .cube:nth-child(5) { animation-delay: 0.2s; }
      .cube:nth-child(6) { animation-delay: 0.3s; }
      .cube:nth-child(7) { animation-delay: 0.2s; }
      .cube:nth-child(8) { animation-delay: 0.3s; }
      .cube:nth-child(9) { animation-delay: 0.4s; }
  
      /* The keyframe animation */
      @keyframes morph-and-rotate {
        0% {
          transform: rotateX(0deg) rotateY(0deg);
          background-color: #6366f1; /* Indigo */
        }
        25% {
          transform: rotateX(180deg) rotateY(0deg);
          background-color: #ec4899; /* Pink */
        }
        50% {
          transform: rotateX(180deg) rotateY(180deg);
          background-color: #f97316; /* Orange */
        }
        75% {
          transform: rotateX(0deg) rotateY(180deg);
          background-color: #10b981; /* Emerald */
        }
        100% {
          transform: rotateX(0deg) rotateY(0deg);
          background-color: #6366f1; /* Back to Indigo */
        }
      }
    `;
  
    return (
      <>
        <style>{styles}</style>
        <div className="loader-container">
          {/* Create a 3x3 grid of cubes */}
          {[...Array(9)].map((_, i) => (
            <div key={i} className="cube"></div>
          ))}
        </div>
      </>
    );
  };
export default AnimatedSpinner;