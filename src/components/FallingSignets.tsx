import React, { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';

interface Plant {
  id: number;
  left: string;
}

const MAX_PLANTS = 6; // Maximale Anzahl an Pflanzen
const CENTER_EXCLUSION_ZONE = 25; // Prozent der Breite, die in der Mitte ausgespart wird
const PLANT_WIDTH = 8; // Breite einer Pflanze in Viewport-Einheiten

const FallingSignet = ({ delay, left, onReachBottom }: { delay: number; left: string; onReachBottom: (left: string) => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onReachBottom(left);
    }, delay * 1000 + 10000); // 10 seconds is the fall animation duration

    return () => clearTimeout(timer);
  }, [delay, left, onReachBottom]);

  return (
    <div
      className="absolute animate-fall will-change-transform"
      style={{
        left,
        animationDelay: `${delay}s`,
        top: '-50px',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
    >
      <img
        src="/lovable-uploads/1a975ed3-dd21-4670-bff8-9cd48991c33e.png"
        alt=""
        className="w-8 h-8 md:w-12 md:h-12"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
        }}
      />
    </div>
  );
};

const Plant = ({ left }: { left: string }) => {
  return (
    <div
      className="absolute bottom-0 animate-grow text-mayPink will-change-transform"
      style={{ 
        left,
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
      }}
    >
      <Sprout className="w-6 h-6 md:w-8 md:h-8" />
    </div>
  );
};

export const FallingSignets = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  const isPositionOccupied = (newLeft: number) => {
    return plants.some(plant => {
      const existingLeft = parseFloat(plant.left);
      const distance = Math.abs(existingLeft - newLeft);
      return distance < PLANT_WIDTH;
    });
  };

  const handleSignetReachBottom = (left: string) => {
    const leftValue = parseFloat(left);
    
    const centerStart = (100 - CENTER_EXCLUSION_ZONE) / 2;
    const centerEnd = centerStart + CENTER_EXCLUSION_ZONE;
    
    if (leftValue >= centerStart && leftValue <= centerEnd) {
      return;
    }

    if (isPositionOccupied(leftValue)) {
      return;
    }

    setPlants(prev => {
      if (prev.length >= MAX_PLANTS) {
        return prev;
      }
      return [...prev, { id: Date.now(), left }];
    });
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <FallingSignet
          key={i}
          delay={Math.random() * 20}
          left={`${Math.random() * 100}%`}
          onReachBottom={handleSignetReachBottom}
        />
      ))}
      {plants.map(plant => (
        <Plant key={plant.id} left={plant.left} />
      ))}
    </div>
  );
};