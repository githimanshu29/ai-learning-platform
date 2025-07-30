"use client";


import React, { useEffect, useRef } from 'react';
import { BrainCircuit, ArrowRight, Zap, BookOpen, Target } from 'lucide-react';
import Link from 'next/link';

// Helper function to create a particle for the background animation
const createParticle = (canvas) => {
    const size = Math.random() * 1.5 + 1;
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * 0.3 - 0.15,
        vy: Math.random() * 0.3 - 0.15,
        size: size,
        maxSize: size * 1.5,
        minSize: size * 0.5,
        growing: true,
    };
};

// Background Canvas Animation Component
const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Re-initialize particles on resize for responsiveness
            particlesRef.current = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 20000); // Adjust density based on screen size
            for (let i = 0; i < Math.max(50, particleCount); i++) { 
                particlesRef.current.push(createParticle(canvas));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const particles = particlesRef.current;

            // Update and draw pulsating particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                if (p.growing) {
                    p.size += 0.02;
                    if (p.size >= p.maxSize) p.growing = false;
                } else {
                    p.size -= 0.02;
                    if (p.size <= p.minSize) p.growing = true;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // A professional blue color
                ctx.fill();
            });

            // Draw subtle connection lines between nearby particles
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 180) { // Connection distance
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
};


// Main Page Component
export default function Landingpage() {
    const handleExploreClick = () => {
        // This would typically navigate to another page in a real Next.js app
        // For example, using Next's router: router.push('/dashboard')
        console.log("Navigating to the main app...");
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gray-50 text-gray-800 overflow-hidden font-sans">
            <AnimatedBackground />

            <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 text-center">
                <div className="w-full p-8 md:p-12 bg-white/60 backdrop-blur-lg border border-gray-200/80 rounded-2xl shadow-xl shadow-gray-300/30">
                    
                    <div className="flex justify-center mb-6">
                        <BrainCircuit className="w-16 h-16 text-blue-500" strokeWidth={1.5} />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                        Unlock Your Potential
                    </h1>

                    <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-600 md:text-xl">
                        Our AI crafts personalized learning journeys from any topic. Go from curious to capable, faster than ever before.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto text-left">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                                <Zap className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Dynamic Curriculum</h3>
                                <p className="text-gray-500 text-sm">Instantly generate structured courses on any subject.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Interactive Modules</h3>
                                <p className="text-gray-500 text-sm">Engage with content that adapts to your learning style.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
                                <Target className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">Personalized Paths</h3>
                                <p className="text-gray-500 text-sm">Follow a learning roadmap built specifically for your goals.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Link href="/workspace">
                         <button
                            onClick={handleExploreClick}
                            className="flex items-center justify-center w-full sm:w-auto px-10 py-4 font-semibold text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-blue-500/20 cursor-pointer"
                        >
                            Explore & Learn
                            <ArrowRight className="w-5 h-5 ml-3" />
                        </button>
                        </Link>
                    </div>
                </div>

                <footer className="mt-12 text-center">
                    <p className="text-sm text-gray-500">Powered by cutting-edge AI technology.</p>
                </footer>
            </main>
        </div>
    );
}
