import React from "react";
import { Globe } from "./ui/globe.jsx";

export default function HeroGlobe() {
    return (
        <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden bg-transparent border-none shadow-none">
            <div className="relative w-full max-w-[500px] aspect-square border-none shadow-none bg-transparent">
                <Globe />
                {/* Subtle purple glow accent behind the globe */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/10 blur-[100px] rounded-full -z-10" />
            </div>
        </div>
    );
}
