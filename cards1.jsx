import React from 'react';

// You can find beautiful, high-quality icons at https://lucide.dev/
// For this example, I've included the SVG code directly for simplicity.
const BookOpenIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const CpuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
);


/**
 * AuroraGlassCard Component
 * A unique, modern, and eye-catching card for displaying course information.
 * Features:
 * - A dynamic, animated "aurora" gradient background.
 * - A "glassmorphism" effect for the main content panel, creating depth.
 * - A floating circular icon for a dynamic layout.
 * - Glowing, interactive buttons and hover effects.
 */
const AuroraGlassCard = ({ title, description, lessons, iconUrl }) => {
  const styles = `
    .aurora-card {
      position: relative;
      width: 340px;
      height: 420px;
      border-radius: 20px;
      overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }

    .aurora-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }

    .aurora-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(125deg, #ff3366, #00ffab, #3366ff, #ff3366);
      background-size: 400% 400%;
      animation: aurora-animation 10s ease infinite;
      z-index: 1;
    }
    
    .aurora-card:hover .aurora-background {
        animation-duration: 5s;
    }

    @keyframes aurora-animation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .glass-panel {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 95%;
      background: rgba(20, 20, 25, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 25px;
      box-sizing: border-box;
    }

    .course-icon-container {
      position: absolute;
      top: -40px;
      right: 25px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(145deg, #373b44, #424854);
      box-shadow: 0 8px 20px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 3;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }
    
    .course-icon-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .course-title {
      color: #ffffff;
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 8px;
      line-height: 1.2;
    }

    .course-description {
      color: #b0b8c4;
      font-size: 15px;
      line-height: 1.5;
      height: 90px;
      overflow: hidden;
      margin-bottom: 20px;
    }
    
    .course-meta {
      display: flex;
      align-items: center;
      color: #8a93a2;
      font-size: 14px;
      margin-bottom: 25px;
    }

    .course-meta .icon {
      margin-right: 8px;
      width: 18px;
      height: 18px;
    }

    .button-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .btn {
      padding: 12px;
      border-radius: 10px;
      border: none;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-secondary {
      background-color: rgba(255, 255, 255, 0.1);
      color: #e0e0e0;
    }
    
    .btn-secondary:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .btn-primary {
      background: #00c6ff;
      background: -webkit-linear-gradient(to right, #0072ff, #00c6ff);
      background: linear-gradient(to right, #0072ff, #00c6ff);
      color: white;
      box-shadow: 0 4px 15px rgba(0, 198, 255, 0.3);
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 198, 255, 0.5);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="aurora-card">
        <div className="aurora-background"></div>
        <div className="glass-panel">
          <div className="course-icon-container">
            <img 
                src={iconUrl} 
                alt="Course Icon"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/80x80/2a2f38/ffffff?text=AI'; }}
            />
          </div>
          <h2 className="course-title">{title}</h2>
          <p className="course-description">{description}</p>
          <div className="course-meta">
            <BookOpenIcon className="icon" />
            <span>{lessons} Lessons</span>
          </div>
          <div className="button-container">
            <button className="btn btn-secondary">Enroll Now</button>
            <button className="btn btn-primary">
              <CpuIcon width={18} height={18} />
              Generate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Main App component to showcase the card
export default function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 p-8">
       {/* Adding Google Fonts link for 'Inter' */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

      <AuroraGlassCard
        title="Langchain in Python"
        description="A complete and vast from beginning to industry level langchain course for modern AI development."
        lessons={20}
        iconUrl="https://cdn.worldvectorlogo.com/logos/python-5.svg" // Example icon
      />
    </div>
  );
}
