import React, { useRef } from 'react';
import gsap from 'gsap';

const links = ['Home', 'About', 'Services', 'Contact'];
const colors = ['#ff6f61', '#ffca3a', '#1982c4']; // Vibrant gradient layers

function Navbar({ onClose }) {
    const linkRefs = useRef([]);
    const planeRefs = useRef([]);

    const handleMouseEnter = (i) => {
        const planes = planeRefs.current[i].children;
        const tl = gsap.timeline();

        tl.fromTo(
            planes,
            { x: '-100%' },
            {
                x: '0%',
                duration: 0.9,
                ease: 'power2.out',
                stagger: 0.1,
            }
        );

        tl.to(
            linkRefs.current[i],
            {
                scale: 1.08,
                duration: 0.3,
                ease: 'power2.out',
            },
            '<'
        );
    };

    const handleMouseLeave = (i) => {
        gsap.to(linkRefs.current[i], {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
        });
    };

    return (
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 w-full h-screen p-10 flex items-center justify-center relative overflow-hidden">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-black text-2xl font-bold px-4 py-2 bg-black/40 backdrop-blur rounded-full shadow hover:bg-white hover:text-black transition z-50"
            >
                ✕
            </button>

            <nav className="flex flex-col items-center space-y-6 text-4xl font-bold tracking-wide">
                {links.map((link, i) => (
                    <div
                        key={link}
                        className="relative overflow-hidden cursor-pointer group w-[600px] h-28 rounded-3xl border border-white/20 shadow-lg"
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={() => handleMouseLeave(i)}
                        onClick={onClose}
                        ref={(el) => (linkRefs.current[i] = el)}
                        style={{
                            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                        }}
                    >
                        {/* Animated planes */}
                        <div
                            className="absolute inset-0"
                            ref={(el) => (planeRefs.current[i] = el)}
                        >
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`w-full h-full absolute left-0 top-0 z-${10 + index * 10} opacity-80`}
                                    style={{
                                        backgroundColor: color,
                                        mixBlendMode: 'screen',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Link text */}
                        <span className="relative z-50 h-full flex items-center justify-center text-black drop-shadow-lg transition duration-300">
                            {link}
                        </span>
                    </div>
                ))}
            </nav>
        </div>
    );
}

export default Navbar;
