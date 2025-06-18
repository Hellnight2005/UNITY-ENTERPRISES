import React, { useRef } from 'react';
import gsap from 'gsap';

const links = ['Home', 'About', 'Services', 'Contact'];
const colors = ['#67a9a2', '#ffca3a', '#244344'];

function Navbar({ onClose }) {
    const linkRefs = useRef([]);
    const planeRefs = useRef([]);

    const handleMouseEnter = (i) => {
        const planes = planeRefs.current[i]?.children;
        if (!planes) return;
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
        <div className="fixed top-0 right-0 h-fit w-[320px] bg-gradient-to-b from-[#3a5a40] via-[#588157] to-[#a3b18a] p-6 shadow-lg border-l border-white/10 z-50 flex flex-col">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="self-end mb-10 text-white text-xl font-bold px-3 py-1 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full transition"
            >
                ✕
            </button>

            <nav className="flex flex-col items-end space-y-6 w-full">
                {links.map((link, i) => (
                    <div
                        key={link}
                        className="relative overflow-hidden cursor-pointer w-full max-w-[240px] h-16 rounded-xl border border-white/20"
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={() => handleMouseLeave(i)}
                        onClick={onClose}
                        ref={(el) => (linkRefs.current[i] = el)}
                    >
                        {/* Animated planes */}
                        <div
                            className="absolute inset-0 rounded-xl"
                            ref={(el) => (planeRefs.current[i] = el)}
                        >
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="w-full h-full absolute left-0 top-0 opacity-70 rounded-xl"
                                    style={{
                                        backgroundColor: color,
                                        mixBlendMode: 'screen',
                                    }}
                                />
                            ))}
                        </div>

                        {/* Link text */}
                        <span className="relative z-10 h-full w-full flex items-center justify-center text-black font-semibold text-2xl text-center">
                            {link}
                        </span>
                    </div>
                ))}
            </nav>
        </div>
    );
}

export default Navbar;
