import React, { useRef } from 'react';

// SVG Icons for the card
const BookOpenIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const CpuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
);


const MagneticGlowCard = ({ title, description, lessons, iconUrl }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    // Card magnetic pull calculation
    const moveX = (x - width / 2) / (width / 2) * 8; // Max movement 8px
    const moveY = (y - height / 2) / (height / 2) * 8; // Max movement 8px

    // Icon parallax movement calculation
    const iconMoveX = (x - width / 2) / (width / 2) * -12;
    const iconMoveY = (y - height / 2) / (height / 2) * -12;

    cardRef.current.style.setProperty('--move-x', `${moveX}px`);
    cardRef.current.style.setProperty('--move-y', `${moveY}px`);
    cardRef.current.style.setProperty('--icon-move-x', `${iconMoveX}px`);
    cardRef.current.style.setProperty('--icon-move-y', `${iconMoveY}px`);
    cardRef.current.style.setProperty('--glow-x', `${(x / width) * 100}%`);
    cardRef.current.style.setProperty('--glow-y', `${(y / height) * 100}%`);
  };

  const handleMouseLeave = () => {
    // Reset all custom properties on mouse leave
    cardRef.current.style.setProperty('--move-x', '0px');
    cardRef.current.style.setProperty('--move-y', '0px');
    cardRef.current.style.setProperty('--icon-move-x', '0px');
    cardRef.current.style.setProperty('--icon-move-y', '0px');
  };

  const styles = `
    .magnetic-card {
      position: relative;
      width: 350px;
      height: 440px;
      border-radius: 24px;
      font-family: 'Inter', sans-serif;
      transform: translate(var(--move-x, 0), var(--move-y, 0));
      transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      --glow-x: 50%;
      --glow-y: 50%;
    }

    .card-glow-border {
      position: absolute;
      inset: -2px;
      border-radius: 26px;
      background: radial-gradient(
        circle at var(--glow-x) var(--glow-y),
        rgba(0, 198, 255, 0.8),
        transparent 40%
      );
      transition: background 0.2s ease;
      z-index: 0;
    }

    .card-content {
      position: absolute;
      inset: 2px;
      border-radius: 22px;
      background: #10172a;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 30px;
      box-sizing: border-box;
      overflow: hidden;
    }
    
    .card-content::before {
      content: '';
      position: absolute;
      inset: -80px;
      background-image: radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(45, 156, 219, 0.15), transparent 50%);
      transition: background 0.2s ease;
    }

    .course-icon-container {
      position: absolute;
      top: 30px;
      right: 30px;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: #1e293b;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid rgba(255, 255, 255, 0.1);
      transform: translate(var(--icon-move-x, 0), var(--icon-move-y, 0));
      transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    
    .course-icon-container img {
      width: 85%;
      height: 85%;
      object-fit: contain;
    }

    .course-title {
      color: #ffffff;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .course-description {
      color: #b0b8c4;
      font-size: 15px;
      line-height: 1.6;
      height: 95px;
      margin-bottom: 20px;
    }
    
    .course-meta {
      display: flex;
      align-items: center;
      color: #8a93a2;
      font-size: 14px;
      margin-bottom: 25px;
    }
    
    .button-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .btn {
      padding: 14px;
      border-radius: 12px;
      border: 1px solid transparent;
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
      background-color: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.2);
      color: #e0e0e0;
    }
    
    .btn-secondary:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(0, 198, 255, 0.5);
    }

    .btn-primary {
      background: linear-gradient(to right, #0072ff, #00c6ff);
      color: white;
      box-shadow: 0 5px 20px rgba(0, 198, 255, 0.3);
    }
    
    .btn-primary:hover {
      box-shadow: 0 8px 25px rgba(0, 198, 255, 0.5);
      transform: scale(1.05);
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div 
        ref={cardRef}
        className="magnetic-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-glow-border"></div>
        <div className="card-content">
          <div className="course-icon-container">
            <img 
                src={iconUrl} 
                alt={`${title} logo`}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/90x90/1e293b/ffffff?text=AI'; }}
            />
          </div>
          <h2 className="course-title">{title}</h2>
          <p className="course-description">{description}</p>
          <div className="course-meta">
            <BookOpenIcon style={{ marginRight: '8px', width: '18px' }} />
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

// Main App component to showcase the card and its dynamic icon logic
export default function App() {
  // --- Helper function to get a dynamic icon based on course title ---
  const getIconForCourse = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('next.js')) {
      return 'https://cdn.worldvectorlogo.com/logos/next-js.svg';
    }
    if (lowerTitle.includes('python')) {
      return 'https://cdn.worldvectorlogo.com/logos/python-5.svg';
    }
    if (lowerTitle.includes('react')) {
      return 'https://cdn.worldvectorlogo.com/logos/react-2.svg';
    }
    if (lowerTitle.includes('java')) {
        return 'https://cdn.worldvectorlogo.com/logos/java-4.svg';
    }
    // Default icon if no keyword is matched
    return 'https://cdn.worldvectorlogo.com/logos/artificial-intelligence-ai-5.svg';
  };

  const course = {
    title: "Next.js Mastery",
    description: "Build and deploy production-grade, full-stack applications with the most powerful React framework.",
    lessons: 35,
  };

  const iconUrl = getIconForCourse(course.title);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#0b132b] p-8">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />

      <MagneticGlowCard
        title={course.title}
        description={course.description}
        lessons={course.lessons}
        iconUrl={iconUrl}
      />
    </div>
  );
}
