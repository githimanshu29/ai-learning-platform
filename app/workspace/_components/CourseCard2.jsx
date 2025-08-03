// CourseCard.jsx
"use client";

import React, { useRef, useState } from 'react';
import useme2 from '../../../public/useme2.jpg';
import Image from 'next/image';
import { DeleteIcon, LoaderCircle, PlayCircle, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';

// SVG Icons for the card
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

const CourseCard = ({ course, onEnrollSuccess,onDelete }) => {
  const cardRef = useRef(null);
  const [loading, setLoading] = useState(false);



  // Extract course data safely
  const Course = course?.courseJson;
  const courseHasContent = course?.courseContent?.length > 0;

  // Helper function to get a dynamic icon based on course title
  const getIconForCourse = (title) => {
    const lowerTitle = (title || "").toLowerCase();
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

  const iconUrl = Course?.image || getIconForCourse(Course?.name);

  // Handlers for the magnetic effect
  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    // Card magnetic pull calculation
    const moveX = ((x - width / 2) / (width / 2)) * 8; // Max movement 8px
    const moveY = ((y - height / 2) / (height / 2)) * 8; // Max movement 8px

    // Icon parallax movement calculation
    const iconMoveX = ((x - width / 2) / (width / 2)) * -12;
    const iconMoveY = ((y - height / 2) / (height / 2)) * -12;

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
  
  // Enrollment logic from your previous card
  const onEnrollCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/enroll-course', {
        courseId: course?.cid,
      });

      if (result.data.res) {
        toast.warning('Already enrolled in this course');
      } else {
        toast.success("Successfully enrolled in course!");
        if (onEnrollSuccess) {
          onEnrollSuccess();
        }
      }
    } catch (e) {
      toast.error("Error enrolling in course. Please try again later.");
    } finally {
      setLoading(false);
    }
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
      will-change: transform;
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
      line-clamp: 2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .course-description {
      color: #b0b8c4;
      font-size: 15px;
      line-height: 1.6;
      height: 95px;
      margin-bottom: 20px;
      line-clamp: 4;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
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
         display: grid;
            position: relative; /* This was added */
    z-index: 2;
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
    
    /* Small spinner for the button */
    .loader-spin {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
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
              alt={`${Course?.name} logo`}
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/90x90/1e293b/ffffff?text=AI'; }}
            />
          </div>
          <h2 className="course-title">{Course?.name || "Untitled Course"}</h2>
          <p className="course-description">{Course?.description || "No description available."}</p>
          <div className="course-meta flex justify-between">
            <div className='flex'>
            <BookOpenIcon style={{ marginRight: '8px', width: '18px' }} />
            <span>{Course?.noOfChapters || 0} Lessons</span>
            </div>
            <Button className='cursor-pointer hover:bg-red-600 z-40' onClick={onDelete}><Trash2/></Button>
          </div>
          <div className="button-container">
            {courseHasContent ? (
              <Button
                className="btn btn-primary"
                onClick={onEnrollCourse}
                disabled={loading}
              >
                {loading ? <LoaderCircle className="loader-spin" size={18} /> : <PlayCircle size={18} />}
                Enroll Now
              </Button>

              
            ) : (
              <Link href={`/workspace/edit-course/${course?.cid}`} className="w-full">
                <Button className="btn " >
                  <Settings size={18} />
                  Generate
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;