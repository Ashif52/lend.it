import React from "react";
import { cn } from "./utils";

export function OrbitingCircles({
    className,
    children,
    reverse,
    duration = 20,
    delay = 10,
    radius = 50,
    path = true,
    iconSize = 30,
    speed = 1,
}) {
    return (
        <div
            className={cn("absolute inset-0 flex items-center justify-center", className)}
            style={{ "--radius": radius }}
        >
            {path && (
                <div
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
                    style={{
                        width: `${radius * 2}px`,
                        height: `${radius * 2}px`,
                        width: "calc(var(--radius, " + radius + ") * 2px)",
                        height: "calc(var(--radius, " + radius + ") * 2px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        zIndex: 0,
                    }}
                />
            )}

            {React.Children.map(children, (child, index) => {
                const angle = (360 / React.Children.count(children)) * index;
                const animDelay = (duration / speed) * (angle / 360);
                const animDirection = reverse ? 'reverse' : 'normal';
                return (
                    <div
                        style={{
                            "--icon-size": `${iconSize}px`,
                            animation: `orbit ${duration / speed}s linear infinite ${animDirection}`,
                            animationDelay: `-${animDelay}s`,
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: `-${iconSize / 2}px`,
                            marginLeft: `-${iconSize / 2}px`,
                            zIndex: 10,
                        }}
                        className={cn(
                            `flex size-[var(--icon-size)] items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-sm`,
                        )}
                    >
                        {child}
                    </div>
                );
            })}
        </div>
    );
}
