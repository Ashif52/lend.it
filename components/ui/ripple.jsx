import React from "react";
import { cn } from "../../src/utils";

export const Ripple = React.memo(function Ripple({
    mainCircleSize = 210,
    mainCircleOpacity = 0.24,
    numCircles = 8,
    className,
}) {
    return (
        <div
            className={cn(
                "pointer-events-none select-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]",
                className
            )}
        >
            {Array.from({ length: numCircles }, (_, i) => {
                const size = mainCircleSize + i * 70;
                const opacity = mainCircleOpacity - i * 0.03;
                const animationDelay = `${i * 0.06}s`;
                const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
                const borderOpacity = 5 + i * 5;

                return (
                    <div
                        key={i}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full border bg-white/5"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            opacity: opacity,
                            animationDelay: animationDelay,
                            borderStyle: borderStyle,
                            borderWidth: "1px",
                            borderColor: `rgba(124, 92, 252, ${borderOpacity / 100})`,
                        }}
                    />
                );
            })}
        </div>
    );
});

Ripple.displayName = "Ripple";
