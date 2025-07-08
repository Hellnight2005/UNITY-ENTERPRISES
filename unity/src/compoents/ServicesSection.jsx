"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "AI & DIGITAL",
        description: "Smart solutions to empower real-time automation and data intelligence.",
        items: [
            "AI-driven automation",
            "IoT dashboards & logging",
            "Real-time energy tracking",
            "Edge computing integration",
        ],
        video: "/video/Ai-and.mp4",
        bg: "#0f172a"
    },
    {
        title: "ELECTRICAL",
        description: "Robust electrical systems designed for efficiency and reliability.",
        items: [
            "Smart electrical panels",
            "Automatic Power Management",
            "Motor control systems",
            "Industrial wiring & safety",
        ],
        video: "/video/ELECTRICAL.mp4",
        bg: "#1e293b"
    },
    {
        title: "SURVEILLANCE",
        description: "Advanced monitoring and security systems tailored to your environment.",
        items: [
            "CCTV & IP camera setup",
            "Biometric systems",
            "Door access control",
            "Remote monitoring dashboard",
        ],
        video: "/video/SURVEILLANCE.mp4",
        bg: "#1e3a8a"
    },
    {
        title: "MAINTENANCE",
        description: "Keeping your operations running with proactive, expert service.",
        items: [
            "Scheduled industrial care",
            "Spare parts availability",
            "Equipment diagnostics",
            "Remote fault alerts",
        ],
        video: "/video/MAINTENANCE.mp4",
        bg: "#083344"
    },
];

export default function ServicesSection() {
    const wrapperRef = useRef(null);
    const cardRefs = useRef([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        ScrollTrigger.defaults({ markers: false });

        cardRefs.current.forEach((card, i) => {
            const content = card.querySelector(".service-card");

            gsap.fromTo(
                content,
                { opacity: 0, y: 100, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top center+=100",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            ScrollTrigger.create({
                trigger: card,
                start: "top center",
                end: "bottom center",
                scrub: true,
                onUpdate: (self) => {
                    const percent = ((i + self.progress) / services.length) * 100;
                    setProgress(percent);
                },
            });
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <section ref={wrapperRef} className="relative bg-[#0f172a] text-white">
            {/* Title */}
            <div className="text-center pt-24 pb-10 px-4">
                <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 to-teal-400 text-transparent bg-clip-text">
                    Our Expertise
                </h2>
                <p className="text-white/60 mt-4 text-lg max-w-2xl mx-auto">
                    We offer a wide range of services tailored for modern industrial needs.
                </p>
            </div>

            {/* Stack of Cards */}
            <div className="relative min-h-[500vh]">
                {services.map((service, i) => (
                    <div
                        key={i}
                        ref={(el) => (cardRefs.current[i] = el)}
                        className="sticky top-32 w-full z-0"
                        style={{ zIndex: i + 10 }}
                    >
                        <div className="relative mx-auto max-w-5xl p-10 md:p-16 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
                            {/* Background Video */}
                            <video
                                className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
                                src={service.video}
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                            {/* Blur Overlay */}
                            <div
                                className="absolute inset-0 z-0"
                                style={{
                                    backgroundColor: service.bg,
                                    opacity: 0.6,
                                    mixBlendMode: "multiply",
                                }}
                            />
                            {/* Card Content */}
                            <div className="relative z-10">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-3xl md:text-5xl font-bold text-cyan-300">
                                        {service.title}
                                    </h3>
                                    <span className="text-sm text-white/50">
                                        {String(i + 1).padStart(2, "0")} / {services.length}
                                    </span>
                                </div>
                                <p className="text-white/80 text-lg mb-6">{service.description}</p>
                                <ul className="space-y-2 text-white/90 text-md md:text-lg font-light">
                                    {service.items.map((item, j) => (
                                        <li key={j}>
                                            <span className="text-cyan-400">▹</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </section>
    );
}
