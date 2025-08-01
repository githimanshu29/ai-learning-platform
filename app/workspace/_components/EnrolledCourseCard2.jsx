// EnrollCourseCard.jsx
"use client";

import React, { useRef } from 'react';
import useme2 from '../../../public/useme2.jpg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { LoaderCircle, PlayCircle, Settings, Trash } from 'lucide-react';
import Link from 'next/link';
import { Progress } from "@/components/ui/progress";

// --- SVG Icons from the new design ---
const PlayIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
);

const EnrolledGlassCard = ({ course, enrollCourse, onDelete }) => {
    const cardRef = useRef(null);

    if (!course || !enrollCourse) {
        return null;
    }

    const CourseJson = course.courseJson;

    const CalculatePerProgress = () => {
        if (!course?.courseContent || course.courseContent.length === 0) {
            return 0;
        }
        return Math.floor((enrollCourse?.completedChapters?.length ?? 0 / course.courseContent.length) * 100);
    };
    
    const progress = CalculatePerProgress();

    // Helper function to get a dynamic icon based on course title
    const getIconForCourse = (title) => {
        const lowerTitle = (title || "").toLowerCase();
        if (lowerTitle.includes('next.js')) return 'https://cdn.worldvectorlogo.com/logos/next-js.svg';
        if (lowerTitle.includes('python')) return 'https://cdn.worldvectorlogo.com/logos/python-5.svg';
        if (lowerTitle.includes('react')) return 'https://cdn.worldvectorlogo.com/logos/react-2.svg';
        if (lowerTitle.includes('java')) return 'https://cdn.worldvectorlogo.com/logos/java-4.svg';
        return 'https://cdn.worldvectorlogo.com/logos/artificial-intelligence-ai-5.svg';
    };

    const iconUrl = CourseJson?.image || getIconForCourse(CourseJson?.name);

    // Handlers for the interactive effects
    const handleMouseMove = (e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        const moveX = ((x - width / 2) / (width / 2)) * 8;
        const moveY = ((y - height / 2) / (height / 2)) * 8;
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
            -webkit-mask: radial-gradient(circle at 0% 0%, black 0, transparent 120px), radial-gradient(circle at 100% 0%, black 0, transparent 120px), radial-gradient(circle at 0% 100%, black 0, transparent 120px), radial-gradient(circle at 100% 100%, black 0, transparent 120px);
            mask: radial-gradient(circle at 0% 0%, black 0, transparent 120px), radial-gradient(circle at 100% 0%, black 0, transparent 120px), radial-gradient(circle at 0% 100%, black 0, transparent 120px), radial-gradient(circle at 100% 100%, black 0, transparent 120px);
        }

        .card-content {
            position: absolute;
            inset: 2px;
            border-radius: 22px;
            z-index: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 30px;
            box-sizing: border-box;
            overflow: hidden;
        }

        .glass-theme {
            background: rgba(20, 25, 40, 0.5);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
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
            will-change: transform;
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
            height: 70px;
            margin-bottom: 15px;
            line-clamp: 3;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .progress-container {
            margin-bottom: 20px;
        }
        .progress-labels {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            color: #b0b8c4;
            margin-bottom: 8px;
        }
        .progress-bar-background {
            height: 8px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            overflow: hidden;
        }
        .progress-bar-fill {
            height: 100%;
            background: linear-gradient(to right, #0072ff, #00c6ff);
            border-radius: 4px;
            transition: width 0.5s ease-out;
        }

        .button-container-single {
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
        
        .btn-trash {
            background-color: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.2);
            color: #e0e0e0;
            width: 100%;
            margin-top: 10px;
        }

        .btn-trash:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 0, 0, 0.5);
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
                <div className="card-content glass-theme">
                    <div className="course-icon-container">
                        <img 
                            src={iconUrl} 
                            alt={`${CourseJson?.name} logo`}
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/90x90/1e293b/ffffff?text=AI'; }}
                        />
                    </div>
                    <h2 className="course-title">{CourseJson?.name || "Untitled Course"}</h2>
                    <p className="course-description">{CourseJson?.description || "No description available."}</p>
                    
                    <div className="progress-container">
                        <div className="progress-labels">
                            <span>Progress</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="progress-bar-background">
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    <Link href={'/workspace/view-course/' + course?.cid} className="button-container-single">
                        <button className="btn btn-primary">
                            <PlayIcon width={18} height={18} />
                            Continue Learning
                        </button>
                    </Link>

                    <button className="btn btn-trash cursor-pointer button-container-single" onClick={onDelete}>
                        <Trash size={18} />
                        Delete Course
                    </button>
                </div>
            </div>
        </>
    );
};

export default EnrolledGlassCard;