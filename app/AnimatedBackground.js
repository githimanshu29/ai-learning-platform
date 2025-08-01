"use client"
import { useRef ,useEffect} from "react";
const AnimatedBackground = () => {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let mouse = {
            x: null,
            y: null,
            radius: 100
        };

        window.addEventListener('mousemove', event => {
            mouse.x = event.x;
            mouse.y = event.y;
        });
        
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        let nodes = [];
        const nodeCount = 40;
        const connectDistance = 250;
        const nodeSpeed = 0.3;

        class Node {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * nodeSpeed;
                this.vy = (Math.random() - 0.5) * nodeSpeed;
                this.radius = Math.random() * 1.5 + 1;
                this.baseColor = '#4A5568'; // Gray-ish blue
                this.glowColor = '#38B2AC'; // Teal
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.baseColor;
                ctx.fill();
            }

            update() {
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
                this.x += this.vx;
                this.y += this.vy;
            }
        }

        const createNodes = () => {
            nodes = [];
            for (let i = 0; i < nodeCount; i++) {
                nodes.push(new Node(Math.random() * canvas.width, Math.random() * canvas.height));
            }
        };

        const drawConnections = () => {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectDistance) {
                        const opacity = 1 - distance / connectDistance;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(74, 85, 104, ${opacity * 0.5})`; // Gray-ish blue lines
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        };
        
        const drawMouseInteraction = () => {
            if (mouse.x === null) return;
            
            for (let i = 0; i < nodes.length; i++) {
                const dx = nodes[i].x - mouse.x;
                const dy = nodes[i].y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const opacity = 1 - distance / mouse.radius;
                    ctx.beginPath();
                    ctx.arc(nodes[i].x, nodes[i].y, nodes[i].radius + 2, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(56, 178, 172, ${opacity * 0.5})`; // Teal glow
                    ctx.fill();
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            nodes.forEach(node => node.update());
            drawConnections();
            drawMouseInteraction();
            
            nodes.forEach(node => node.draw());

            animationFrameId.current = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createNodes();
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial setup

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: 'linear-gradient(180deg, #111827 0%, #0A0F1A 100%)', // Dark blue gradient
            }}
        />
    );
};

export default AnimatedBackground;