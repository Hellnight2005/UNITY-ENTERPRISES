"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
    const [showNavbar, setShowNavbar] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const blobRef = useRef(null);
    const contentRef = useRef(null);
    const videoRefs = useRef([]);
    const bgWaveRef = useRef(null);
    const mainRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });
        tl.fromTo(contentRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1 });

        videoRefs.current.forEach((ref, i) => {
            if (!ref) return;

            // Entry animation
            gsap.fromTo(
                ref,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power2.out" }
            );

            // Parallax animation
            gsap.to(ref, {
                y: i % 2 === 0 ? -50 : 50,
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });
        });

        gsap.to(blobRef.current, {
            scale: 1.05,
            yoyo: true,
            repeat: -1,
            duration: 4,
            ease: "sine.inOut",
            transformOrigin: "center",
        });

        gsap.to(bgWaveRef.current, {
            y: 100,
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

        gsap.to(contentRef.current, {
            y: -50,
            scrollTrigger: {
                trigger: mainRef.current,
                start: "top bottom",
                end: "top top",
                scrub: true,
            },
        });
    }, []);

    return (
        <div
            ref={mainRef}
            className="relative min-h-screen w-screen overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white"
        >
            {/* Navbar Slide-in */}
            <div
                className={`fixed top-0 right-0 h-full w-1/2 z-50 flex justify-center items-center transition-transform duration-500 ${showNavbar ? "translate-x-0" : "translate-x-full"}`}
            >
                <Navbar onClose={() => setShowNavbar(false)} />
            </div>

            {/* Toggle Menu Button */}
            <button
                onClick={() => setShowNavbar(!showNavbar)}
                className={`fixed top-6 right-6 z-50 px-4 py-2 bg-amber-600 text-white rounded-lg shadow hover:bg-amber-700 transition-opacity duration-500 ${showNavbar ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
                {showNavbar ? "Hide Menu" : "Show Menu"}
            </button>

            {/* Background Waves */}
            <svg
                ref={bgWaveRef}
                className="absolute top-0 left-0 w-full h-full z-0 animate-pulse opacity-40"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <path
                    fill="#1e293b"
                    d="M0,128L60,122.7C120,117,240,107,360,133.3C480,160,600,224,720,218.7C840,213,960,139,1080,133.3C1200,128,1320,192,1380,224L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                />
            </svg>

            {/* Main Section */}
            <main className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-20 py-24">
                {/* Left Content */}
                <div
                    ref={contentRef}
                    className="flex-1 space-y-6 backdrop-blur-xl bg-white/10 p-10 rounded-3xl shadow-2xl border border-white/20"
                >
                    <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-500 to-red-500">
                        UNITY ENTERPRISES
                    </h1>
                    <p className="text-3xl text-white/90 font-cursive">
                        A BETTER TOMORROW BEGINS WITH TODAY’S INNOVATION
                    </p>
                    <button className="mt-4 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition duration-300">
                        Explore Now
                    </button>
                </div>

                {/* Right Video Grid */}
                <div className="flex-1 flex flex-col justify-center items-center gap-6">
                    <div className="flex gap-4">
                        {[1, 3].map((num, i) => (
                            <div
                                key={i}
                                ref={(el) => (videoRefs.current[i] = el)}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`rounded-3xl overflow-hidden shadow-xl transition-transform transform-gpu will-change-transform duration-300 ${hoveredIndex === i ? "scale-105 shadow-yellow-500/50" : "scale-100"}`}
                            >
                                <video
                                    src={`/video/gif${num}.mp4`}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        ref={(el) => (videoRefs.current[2] = el)}
                        onMouseEnter={() => setHoveredIndex(2)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className={`rounded-3xl overflow-hidden shadow-xl transition-transform transform-gpu will-change-transform duration-300 ${hoveredIndex === 2 ? "scale-105 shadow-yellow-500/50" : "scale-100"}`}
                    >
                        <video
                            src="/video/gif2.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HeroSection;
