import React, { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';

interface Plant {
  id: number;
  left: string;
}

const FallingSignet = ({ delay, left, onReachBottom }: { delay: number; left: string; onReachBottom: (left: string) => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onReachBottom(left);
    }, delay * 1000 + 6000); // 6 seconds is the new fall animation duration

    return () => clearTimeout(timer);
  }, [delay, left, onReachBottom]);

  return (
    <div
      className="absolute animate-fall opacity-10"
      style={{
        left,
        animationDelay: `${delay}s`,
        top: '-50px',
      }}
    >
      <img
        src="/lovable-uploads/1a975ed3-dd21-4670-bff8-9cd48991c33e.png"
        alt=""
        className="w-8 h-8 md:w-12 md:h-12"
      />
    </div>
  );
};

const Plant = ({ left }: { left: string }) => {
  return (
    <div
      className="absolute bottom-0 animate-grow text-mayPink"
      style={{ left }}
    >
      <Sprout className="w-6 h-6 md:w-8 md:h-8" />
    </div>
  );
};

export const FallingSignets = () => {
  const [plants, setPlants] = useState<Plant[]>([]);

  const handleSignetReachBottom = (left: string) => {
    setPlants(prev => [...prev, { id: Date.now(), left }]);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => (
        <FallingSignet
          key={i}
          delay={Math.random() * 10} // Reduced delay range
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