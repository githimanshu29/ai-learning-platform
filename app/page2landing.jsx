// "use client";


// import React, { useEffect, useRef } from 'react';
// import { BrainCircuit, ArrowRight, Zap, BookOpen, Target } from 'lucide-react';
// import Link from 'next/link';

// // Helper function to create a particle for the background animation
// const createParticle = (canvas) => {
//     const size = Math.random() * 1.5 + 1;
//     return {
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: Math.random() * 0.3 - 0.15,
//         vy: Math.random() * 0.3 - 0.15,
//         size: size,
//         maxSize: size * 1.5,
//         minSize: size * 0.5,
//         growing: true,
//     };
// };

// // Background Canvas Animation Component
// const AnimatedBackground = () => {
//     const canvasRef = useRef(null);
//     const particlesRef = useRef([]);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//         const ctx = canvas.getContext('2d');
//         let animationFrameId;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
            
//             // Re-initialize particles on resize for responsiveness
//             particlesRef.current = [];
//             const particleCount = Math.floor((canvas.width * canvas.height) / 20000); // Adjust density based on screen size
//             for (let i = 0; i < Math.max(50, particleCount); i++) { 
//                 particlesRef.current.push(createParticle(canvas));
//             }
//         };

//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             const particles = particlesRef.current;

//             // Update and draw pulsating particles
//             particles.forEach(p => {
//                 p.x += p.vx;
//                 p.y += p.vy;

//                 if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
//                 if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

//                 if (p.growing) {
//                     p.size += 0.02;
//                     if (p.size >= p.maxSize) p.growing = false;
//                 } else {
//                     p.size -= 0.02;
//                     if (p.size <= p.minSize) p.growing = true;
//                 }

//                 ctx.beginPath();
//                 ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//                 ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // A professional blue color
//                 ctx.fill();
//             });

//             // Draw subtle connection lines between nearby particles
//             ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
//             ctx.lineWidth = 0.5;
//             for (let i = 0; i < particles.length; i++) {
//                 for (let j = i + 1; j < particles.length; j++) {
//                     const dx = particles[i].x - particles[j].x;
//                     const dy = particles[i].y - particles[j].y;
//                     const distance = Math.sqrt(dx * dx + dy * dy);

//                     if (distance < 180) { // Connection distance
//                         ctx.beginPath();
//                         ctx.moveTo(particles[i].x, particles[i].y);
//                         ctx.lineTo(particles[j].x, particles[j].y);
//                         ctx.stroke();
//                     }
//                 }
//             }

//             animationFrameId = requestAnimationFrame(animate);
//         };

//         window.addEventListener('resize', resizeCanvas);
//         resizeCanvas();
//         animate();

//         return () => {
//             window.removeEventListener('resize', resizeCanvas);
//             cancelAnimationFrame(animationFrameId);
//         };
//     }, []);

//     return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
// };


// // Main Page Component
// export default function Landingpage() {
//     const handleExploreClick = () => {
//         // This would typically navigate to another page in a real Next.js app
//         // For example, using Next's router: router.push('/dashboard')
//         console.log("Navigating to the main app...");
//     };

//     return (
//         <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gray-50 text-gray-800 overflow-hidden font-sans">
//             <AnimatedBackground />

//             <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 text-center">
//                 <div className="w-full p-8 md:p-12 bg-white/60 backdrop-blur-lg border border-gray-200/80 rounded-2xl shadow-xl shadow-gray-300/30">
                    
//                     <div className="flex justify-center mb-6">
//                         <BrainCircuit className="w-16 h-16 text-blue-500" strokeWidth={1.5} />
//                     </div>

//                     <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
//                         Unlock Your Potential
//                     </h1>

//                     <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-600 md:text-xl">
//                         Our AI crafts personalized learning journeys from any topic. Go from curious to capable, faster than ever before.
//                     </p>

//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto text-left">
//                         <div className="flex items-start space-x-4">
//                             <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
//                                 <Zap className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold text-gray-800">Dynamic Curriculum</h3>
//                                 <p className="text-gray-500 text-sm">Instantly generate structured courses on any subject.</p>
//                             </div>
//                         </div>
//                         <div className="flex items-start space-x-4">
//                             <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
//                                 <BookOpen className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold text-gray-800">Interactive Modules</h3>
//                                 <p className="text-gray-500 text-sm">Engage with content that adapts to your learning style.</p>
//                             </div>
//                         </div>
//                         <div className="flex items-start space-x-4">
//                             <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full">
//                                 <Target className="w-6 h-6 text-blue-600" />
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold text-gray-800">Personalized Paths</h3>
//                                 <p className="text-gray-500 text-sm">Follow a learning roadmap built specifically for your goals.</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex justify-center">
//                         <Link href="/workspace">
//                          <button
//                             onClick={handleExploreClick}
//                             className="flex items-center justify-center w-full sm:w-auto px-10 py-4 font-semibold text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-300/50 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-blue-500/20 cursor-pointer"
//                         >
//                             Explore & Learn
//                             <ArrowRight className="w-5 h-5 ml-3" />
//                         </button>
//                         </Link>
//                     </div>
//                 </div>

//                 <footer className="mt-12 text-center">
//                     <p className="text-sm text-gray-500">Powered by cutting-edge AI technology.</p>
//                 </footer>
//             </main>
//         </div>
//     );
// }


"use client";
import logo from '../public/logo.svg'
import React, { useEffect, useRef } from 'react';
import { BrainCircuit, ArrowRight, Zap, Youtube, Target, BookOpen, Bot } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Background Canvas Animation Component - Themed for Dark UI
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
            canvas.height = document.documentElement.scrollHeight; // Cover full page height
            
            particlesRef.current = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 25000);
            for (let i = 0; i < Math.max(70, particleCount); i++) { 
                particlesRef.current.push(createParticle(canvas));
            }
        };

        const createParticle = (canvas) => {
            const size = Math.random() * 1.5 + 1;
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: Math.random() * 0.2 - 0.1,
                vy: Math.random() * 0.2 - 0.1,
                size: size,
                maxSize: size * 1.5,
                minSize: size * 0.5,
                growing: true,
            };
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const particles = particlesRef.current;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                if (p.growing) {
                    p.size += 0.015;
                    if (p.size >= p.maxSize) p.growing = false;
                } else {
                    p.size -= 0.015;
                    if (p.size <= p.minSize) p.growing = true;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(45, 212, 191, 0.4)'; // Teal color for particles
                ctx.fill();
            });

            ctx.strokeStyle = 'rgba(45, 212, 191, 0.08)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
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
        // A slight delay to ensure the page layout is settled before getting scrollHeight
        setTimeout(resizeCanvas, 100); 
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
    const features = [
        {
            icon: <Zap className="w-8 h-8 text-teal-300" />,
            title: "Instant Course Generation",
            description: "Just provide a topic, and our AI builds a complete, structured curriculum in seconds."
        },
        {
            icon: <Youtube className="w-8 h-8 text-teal-300" />,
            title: "Integrated Video Content",
            description: "Each chapter is enriched with relevant, hand-picked YouTube videos to enhance learning."
        },
        {
            icon: <BookOpen className="w-8 h-8 text-teal-300" />,
            title: "In-Depth Written Material",
            description: "Comprehensive, AI-generated text content for every topic, formatted for readability."
        },
        {
            icon: <Target className="w-8 h-8 text-teal-300" />,
            title: "Personalized Learning Paths",
            description: "Follow a learning roadmap that is dynamically built specifically for your goals."
        }
    ];

    return (
        <div className="relative flex flex-col items-center min-h-screen w-full bg-slate-900 text-gray-200 overflow-x-hidden font-sans">
            <AnimatedBackground />
            
            <header className="relative z-10 w-full p-4 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    {/* <BrainCircuit className="w-8 h-8 text-teal-400" /> */}
                    <Image src={logo} alt='Image' width={150} height={150} />
                    
                </div>
                <Link href="/workspace">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-slate-800/80 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors">
                        Go to App
                    </button>
                </Link>
            </header>

            <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-4 text-center flex-grow pt-16 pb-24">
                
                <div className="flex justify-center mb-6">
                    <Bot className="w-20 h-20 text-teal-400" strokeWidth={1.5} />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-6">
                    The Future of Learning, <br/> Generated by AI
                </h1>

                <p className="max-w-3xl mx-auto mb-12 text-lg text-gray-400 md:text-xl">
                    Turn any topic into a comprehensive course, complete with structured chapters, written content, and integrated YouTube videos. Your personalized learning journey starts here.
                </p>

                <Link href="/workspace">
                   <button
                        className="flex items-center justify-center w-full sm:w-auto px-10 py-4 font-semibold text-white transition-all duration-300 ease-in-out rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-teal-300/50 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-teal-500/20 cursor-pointer"
                    >
                        Start Learning for Free
                        <ArrowRight className="w-5 h-5 ml-3" />
                    </button>
                </Link>
            </main>

            {/* How It Works Section */}
            <section className="relative z-10 w-full max-w-5xl mx-auto px-4 py-24">
                <h2 className="text-3xl font-bold text-center text-white mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                        <div className="p-4 mb-4 bg-teal-500/20 rounded-full"><span className="text-2xl font-bold text-teal-300">1</span></div>
                        <h3 className="text-xl font-semibold text-white mb-2">Provide a Topic</h3>
                        <p className="text-gray-400">Enter any subject you're curious about, from "Quantum Computing" to "Italian Cooking".</p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                        <div className="p-4 mb-4 bg-teal-500/20 rounded-full"><span className="text-2xl font-bold text-teal-300">2</span></div>
                        <h3 className="text-xl font-semibold text-white mb-2">AI Generates Course</h3>
                        <p className="text-gray-400">Our AI instantly structures chapters, writes content, and finds relevant videos.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
                        <div className="p-4 mb-4 bg-teal-500/20 rounded-full"><span className="text-2xl font-bold text-teal-300">3</span></div>
                        <h3 className="text-xl font-semibold text-white mb-2">Start Learning</h3>
                        <p className="text-gray-400">Dive into your personalized course and track your progress through interactive modules.</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 w-full max-w-7xl mx-auto px-4 py-24">
                 <h2 className="text-3xl font-bold text-center text-white mb-16">Everything You Need to Master a New Skill</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl flex flex-col items-start hover:border-teal-400/50 transition-colors">
                            <div className="p-3 mb-4 bg-slate-700/80 rounded-lg">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-gray-400 text-left">{feature.description}</p>
                        </div>
                    ))}
                 </div>
            </section>

            <footer className="relative z-10 w-full border-t border-slate-800 mt-24">
                <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-4 md:mb-0">
                        <p className="text-gray-400">&copy; {new Date().getFullYear()} Course-AI. All rights reserved.</p>
                        <p className="text-sm text-gray-500">Powered by cutting-edge AI technology.</p>
                    </div>
                    <div className="flex space-x-6">
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">About</Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

