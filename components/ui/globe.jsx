import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { cn } from "../../src/utils";

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG = {
    width: 800,
    height: 800,
    onRender: () => { },
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.388, 0.4, 0.945], // #6366f1 Purple/Indigo
    glowColor: [0.388, 0.4, 0.945], // Purple glow
    markers: [
        { location: [28.6139, 77.2090], size: 0.1 }, // New Delhi
        { location: [19.0760, 72.8777], size: 0.07 }, // Mumbai
        { location: [12.9716, 77.5946], size: 0.08 }, // Bangalore
        { location: [17.3850, 78.4867], size: 0.06 }, // Hyderabad
        { location: [13.0827, 80.2707], size: 0.05 }, // Chennai
        { location: [22.5726, 88.3639], size: 0.06 }, // Kolkata
        { location: [37.7595, -122.4367], size: 0.03 }, // SF
        { location: [40.7128, -74.006], size: 0.1 }, // NY
        { location: [51.5074, -0.1278], size: 0.07 }, // London
        { location: [35.6895, 139.6917], size: 0.06 }, // Tokyo
    ],
};

export function Globe({ className, config = GLOBE_CONFIG }) {
    const canvasRef = useRef(null);
    const phiRef = useRef(0);
    const widthRef = useRef(0);
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);

    const r = useMotionValue(0);
    const rs = useSpring(r, {
        mass: 1,
        damping: 30,
        stiffness: 100,
    });

    const updatePointerInteraction = (value) => {
        pointerInteracting.current = value;
        if (canvasRef.current) {
            canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
        }
    };

    const updateMovement = (clientX) => {
        if (pointerInteracting.current !== null) {
            const delta = clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            r.set(r.get() + delta / MOVEMENT_DAMPING);
        }
    };

    useEffect(() => {
        const onResize = () => {
            if (canvasRef.current) {
                widthRef.current = canvasRef.current.offsetWidth;
            }
        };

        window.addEventListener("resize", onResize);
        onResize();

        const globe = createGlobe(canvasRef.current, {
            ...config,
            width: widthRef.current * 2,
            height: widthRef.current * 2,
            onRender: (state) => {
                if (!pointerInteracting.current) phiRef.current += 0.005;
                state.phi = phiRef.current + rs.get();
                state.width = widthRef.current * 2;
                state.height = widthRef.current * 2;
            },
        });

        setTimeout(() => {
            if (canvasRef.current) canvasRef.current.style.opacity = "1";
        }, 0);

        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, [rs, config]);

    return (
        <div
            className={cn(
                "absolute inset-0 mx-auto aspect-square w-full max-w-[600px] border-none shadow-none bg-transparent",
                className
            )}
        >
            <canvas
                className={cn(
                    "h-full w-full opacity-0 transition-opacity duration-500 border-none outline-none ring-0"
                )}
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteracting.current = e.clientX;
                    updatePointerInteraction(e.clientX);
                }}
                onPointerUp={() => updatePointerInteraction(null)}
                onPointerOut={() => updatePointerInteraction(null)}
                onMouseMove={(e) => updateMovement(e.clientX)}
                onTouchMove={(e) =>
                    e.touches[0] && updateMovement(e.touches[0].clientX)
                }
            />
        </div>
    );
}
