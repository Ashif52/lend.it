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

// 3. Render Dotted Map Section
const dottedMapRootElement = document.getElementById('dotted-map-container');
if (dottedMapRootElement) {
    const dottedMapRoot = createRoot(dottedMapRootElement);
    // Render markers matching the user prompt (Tokyo, Sydney, etc.)
    dottedMapRoot.render(
        <DottedMap
            markerColor="#a855f7"
            dotColor="#ffffff20"
            dotRadius={0.4}
            markers={[
                { lat: 40.7128, lng: -74.0060, size: 0.6 }, // New York
                { lat: 51.5074, lng: -0.1278, size: 0.8 }, // London
                { lat: 25.2048, lng: 55.2708, size: 0.6 }, // Dubai
                { lat: 1.3521, lng: 103.8198, size: 0.8 }, // Singapore
                { lat: -33.8688, lng: 151.2093, size: 0.6 }, // Sydney
                { lat: 35.6762, lng: 139.6503, size: 0.8 } // Tokyo
            ]}
        />
    );
}
