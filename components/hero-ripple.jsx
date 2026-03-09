import React from "react";
import { Ripple } from "./ui/ripple.jsx";

export default function HeroRipple() {
    return (
        <div className="absolute inset-0 flex items-center justify-center w-full h-full overflow-hidden pointer-events-none">
            <Ripple
                mainCircleSize={220}
                mainCircleOpacity={0.15}
                numCircles={10}
            />
            {/* Subtle purple glow accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-500/5 blur-[120px] rounded-full" />
        </div>
    );
}
