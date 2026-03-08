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
        let mousePos: { x: number; y: number } | null = null;

        const handleMouseClick = (e: MouseEvent) => {
            targetPos = { x: e.clientX, y: e.clientY };
        };

        const handleMouseMove = (e: MouseEvent) => {
            mousePos = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("click", handleMouseClick);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", setCanvasSize);

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
            targetAngle: number;
            maxSpeed: number;
            turnSpeed: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.size = 15 + Math.random() * 25;
                this.maxSpeed = 1 + Math.random() * 2;
                this.speedX = (Math.random() - 0.5) * this.maxSpeed;
                this.speedY = (Math.random() - 0.5) * this.maxSpeed;
                
                const colors = [
                    "#F75D0B",   // Vibrant Orange
                    "#FB923C",   // Soft Orange
                    "#FACC15",   // Bright Yellow
                    "#FEF9C3",   // Pale Yellow
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.tailAngle = Math.random() * Math.PI * 2;
                this.tailSpeed = 0.15 + Math.random() * 0.1;
                this.angle = Math.random() * Math.PI * 2;
                this.targetAngle = this.angle;
                this.turnSpeed = 0.05;
            }

            update() {
                let currentTarget = targetPos || mousePos;

                if (currentTarget) {
                    const dx = currentTarget.x - this.x;
                    const dy = currentTarget.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 200) {
                        // Move away if too close or attracted if clicked (simple logic)
                        if (targetPos) {
                            this.targetAngle = Math.atan2(dy, dx);
                        } else {
                            // Curiosity/following mouse slightly
                            const angleToMouse = Math.atan2(dy, dx);
                            this.targetAngle = angleToMouse + Math.sin(Date.now() * 0.001) * 0.5;
                        }
                    } else {
                        // Wandering
                        if (Math.random() < 0.02) {
                            this.targetAngle += (Math.random() - 0.5) * 1;
                        }
                    }
                } else {
                    // Random wandering when no mouse input
                    if (Math.random() < 0.02) {
                        this.targetAngle += (Math.random() - 0.5) * 2;
                    }
                }

                // Smoothly rotate towards target angle
                let angleDiff = this.targetAngle - this.angle;
                while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
                this.angle += angleDiff * this.turnSpeed;

                // Move in direction of angle
                this.x += Math.cos(this.angle) * this.maxSpeed;
                this.y += Math.sin(this.angle) * this.maxSpeed;

                // Tail animation speed based on movement
                this.tailAngle += this.tailSpeed * (targetPos ? 1.5 : 1);

                // Screen wrapping with padding
                const padding = 50;
                if (this.x < -padding) this.x = canvas!.width + padding;
                if (this.x > canvas!.width + padding) this.x = -padding;
                if (this.y < -padding) this.y = canvas!.height + padding;
                if (this.y > canvas!.height + padding) this.y = -padding;
            }

            draw() {
                if (!ctx) return;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                // Fish body - elongated teardrop
                ctx.beginPath();
                ctx.moveTo(this.size, 0);
                ctx.bezierCurveTo(this.size, -this.size * 0.4, -this.size * 0.5, -this.size * 0.5, -this.size * 0.8, 0);
                ctx.bezierCurveTo(-this.size * 0.5, this.size * 0.5, this.size, this.size * 0.4, this.size, 0);
                
                // Gradient for body
                const grad = ctx.createLinearGradient(-this.size, 0, this.size, 0);
                grad.addColorStop(0, this.color);
                grad.addColorStop(1, this.color + "CC"); // Slightly transparent head
                ctx.fillStyle = grad;
                ctx.fill();

                // Tail
                const tailWiggle = Math.sin(this.tailAngle) * 0.4;
                ctx.beginPath();
                ctx.moveTo(-this.size * 0.7, 0);
                ctx.lineTo(-this.size - 12, -10 + tailWiggle * 10);
                ctx.lineTo(-this.size - 8, 0);
                ctx.lineTo(-this.size - 12, 10 + tailWiggle * 10);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();

                // Eye
                ctx.beginPath();
                ctx.arc(this.size * 0.6, -this.size * 0.15, 2, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(0,0,0,0.8)";
                ctx.fill();

                // Subtle fins
                ctx.beginPath();
                ctx.moveTo(-2, -this.size * 0.3);
                ctx.quadraticCurveTo(-10, -this.size * 0.5, -5, -this.size * 0.2);
                ctx.fillStyle = this.color + "88";
                ctx.fill();

                ctx.restore();
            }
        }

        // Increase fish count to 12
        const fishes = Array.from({ length: 12 }, () => new Fish());

        function animate() {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add very subtle background tint/depth
            // ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
            // ctx.fillRect(0, 0, canvas.width, canvas.height);

            fishes.forEach((fish) => {
                fish.update();
                fish.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("click", handleMouseClick);
            window.removeEventListener("mousemove", handleMouseMove);
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
