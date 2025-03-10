
import React, { useEffect, useState } from 'react';

interface SignetProps {
  delay: number;
  left: string;
  size: 'sm' | 'md' | 'lg';
  duration: number;
  opacity: number;
}

const FallingSignet = ({ delay, left, size, duration, opacity }: SignetProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6 md:w-8 md:h-8',
    md: 'w-8 h-8 md:w-12 md:h-12',
    lg: 'w-10 h-10 md:w-16 md:h-16',
  };

  return (
    <div
      className="absolute animate-fall"
      style={{
        left,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        top: '-50px',
        opacity: opacity,
        willChange: 'transform', // Performance-Optimierung
      }}
    >
      <img
        src="/lovable-uploads/1a975ed3-dd21-4670-bff8-9cd48991c33e.png"
        alt=""
        className={sizeClasses[size]}
        loading="lazy" // Lazy-Loading für Bilder
      />
    </div>
  );
};

export const FallingSignets = () => {
  const [signets, setSignets] = useState<SignetProps[]>([]);

  useEffect(() => {
    // Generiere Signets mit verschiedenen Eigenschaften
    const generatedSignets = Array.from({ length: 15 }).map((_, i) => ({
      delay: Math.random() * 15,
      left: `${Math.random() * 100}%`,
      size: ['sm', 'md', 'lg'][Math.floor(Math.random() * 3)] as 'sm' | 'md' | 'lg',
      duration: 8 + Math.random() * 7, // Verschiedene Geschwindigkeiten, 8-15 Sekunden
      opacity: 0.05 + Math.random() * 0.1, // Unterschiedliche Transparenz
    }));
    setSignets(generatedSignets);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {signets.map((signet, i) => (
        <FallingSignet key={i} {...signet} />
      ))}
    </div>
  );
};
