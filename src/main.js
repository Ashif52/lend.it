import React from 'react';
import { createRoot } from 'react-dom/client';
import { OrbitingCircles } from './OrbitingCircles';
import { Bike, Smartphone, MapPin, Lock, Star } from 'lucide-react';
import HeroGlobe from '../components/hero-globe.jsx';

// 1. Render Hero Globe
const globeRootElement = document.getElementById('hero-globe');
if (globeRootElement) {
    const globeRoot = createRoot(globeRootElement);
    globeRoot.render(<HeroGlobe />);
}

// 2. Render Orbiting Circles (Vision Section)
export function OrbitingCirclesDemo() {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
            {/* Inner Circle */}
            <OrbitingCircles iconSize={40} radius={120} className="inner-orbit">
                <Bike className="text-white" size={24} />
                <Smartphone className="text-white" size={24} />
                <MapPin className="text-white" size={24} />
                <Lock className="text-white" size={24} />
                <Star className="text-white" size={24} />
            </OrbitingCircles>

            {/* Outer Circle */}
            <OrbitingCircles iconSize={30} radius={200} reverse speed={1.5} className="outer-orbit">
                <Bike className="text-white/70" size={20} />
                <Smartphone className="text-white/70" size={20} />
                <MapPin className="text-white/70" size={20} />
                <Lock className="text-white/70" size={20} />
                <Star className="text-white/70" size={20} />
            </OrbitingCircles>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-3xl z-20 whitespace-nowrap">
                LendIt
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-6 text-white/50 text-base z-20 text-center w-80 whitespace-nowrap">
                Connected by people's
            </div>
        </div>
    );
}

const orbitingRootElement = document.getElementById('orbiting-effect');
if (orbitingRootElement) {
    const orbitingRoot = createRoot(orbitingRootElement);
    orbitingRoot.render(<OrbitingCirclesDemo />);
}

import { DottedMap } from './components/ui/dotted-map.jsx';

// 3. Render Dotted Map Section (India-only glowing markers)
const dottedMapRootElement = document.getElementById('dotted-map-container');
if (dottedMapRootElement) {
    const dottedMapRoot = createRoot(dottedMapRootElement);
    dottedMapRoot.render(
        <DottedMap
            markerColor="#a855f7"
            dotColor="#ffffff20"
            dotRadius={0.4}
            markers={[
                { lat: 19.0760, lng: 72.8777, size: 0.8 },  // Mumbai
                { lat: 28.6139, lng: 77.2090, size: 0.8 },  // Delhi
                { lat: 12.9716, lng: 77.5946, size: 0.7 },  // Bangalore
                { lat: 17.3850, lng: 78.4867, size: 0.7 },  // Hyderabad
                { lat: 13.0827, lng: 80.2707, size: 0.6 },  // Chennai
                { lat: 18.5204, lng: 73.8567, size: 0.6 },  // Pune
                { lat: 22.5726, lng: 88.3639, size: 0.6 },  // Kolkata
                { lat: 23.0225, lng: 72.5714, size: 0.5 },  // Ahmedabad
                { lat: 26.9124, lng: 75.7873, size: 0.5 },  // Jaipur
            ]}
        />
    );
}
