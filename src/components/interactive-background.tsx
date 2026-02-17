"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        let targetPos: { x: number; y: number } | null = null;

        // Track mouse click only
        const handleMouseClick = (e: MouseEvent) => {
            targetPos = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("click", handleMouseClick);
        window.addEventListener("resize", setCanvasSize);

        // Fish class
        class Fish {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            tailAngle: number;
            tailSpeed: number;
            angle: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = 30 + Math.random() * 40;
                this.speedX = 0.5 + Math.random() * 1.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                // Orange and yellow themed colors
                const colors = [
                    "#F75D0B",   // Orange
                    "#FEF9C3",   // Light Yellow
                    "#FB923C",   // Orange variant
                    "#FFEDD5",   // Cream
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.tailAngle = 0;
                this.tailSpeed = 0.1 + Math.random() * 0.1;
                this.angle = 0; // Direction fish is facing
            }

            update() {
                // Only move if user has clicked
                if (!targetPos) {
                    // Idle state - very slow tail wiggle
                    this.tailAngle += this.tailSpeed * 0.2;
                    return;
                }

                // Swim towards target position (mouse click)
                const dx = targetPos.x - this.x;
                const dy = targetPos.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Calculate angle to face target
                this.angle = Math.atan2(dy, dx);

                if (distance > 5) {
                    this.x += (dx / distance) * this.speedX;
                    this.y += (dy / distance) * this.speedX;
                    this.tailAngle += this.tailSpeed; // Active swimming
                } else {
                    this.tailAngle += this.tailSpeed * 0.3; // Slower wiggle when arrived
                }

                // Keep within canvas bounds
                if (this.x < 0) this.x = 0;
                if (this.x > canvas!.width) this.x = canvas!.width;
                if (this.y < 0) this.y = 0;
                if (this.y > canvas!.height) this.y = canvas!.height;
            }

            draw() {
                if (!ctx) return;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle); // Rotate to face swimming direction

                // Draw fish body (ellipse)
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();

                // Draw tail (triangle with wiggle)
                const tailWiggle = Math.sin(this.tailAngle) * 10;
                ctx.beginPath();
                ctx.moveTo(-this.size, 0);
                ctx.lineTo(-this.size - 20, -15 + tailWiggle);
                ctx.lineTo(-this.size - 20, 15 + tailWiggle);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();

                // Draw eye
                ctx.beginPath();
                ctx.arc(this.size * 0.5, -this.size * 0.2, 4, 0, Math.PI * 2);
                ctx.fillStyle = "#000";
                ctx.fill();

                // Add glow effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;

                ctx.restore();
            }
        }

        // Create fish (2-3 fish only)
        const fishes = Array.from({ length: 3 }, () => new Fish());

        // Animation loop
        function animate() {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            fishes.forEach((fish) => {
                fish.update();
                fish.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();

        // Cleanup
        return () => {
            window.removeEventListener("click", handleMouseClick);
            window.removeEventListener("resize", setCanvasSize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
}
