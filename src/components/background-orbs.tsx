'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function BackgroundOrbs() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Main gradient orbs */}
            <motion.div
                className="absolute top-0 -left-4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute top-0 right-0 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
                animate={{
                    x: [0, -50, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Dot grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184_/_0.1)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184_/_0.05)_1px,transparent_0)] [background-size:40px_40px]" />
        </div>
    );
}
