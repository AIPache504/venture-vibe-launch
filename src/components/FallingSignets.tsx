import React from 'react';

const FallingSignet = ({ delay, left }: { delay: number; left: string }) => {
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

export const FallingSignets = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <FallingSignet
          key={i}
          delay={Math.random() * 20}
          left={`${Math.random() * 100}%`}
        />
      ))}
    </div>
  );
};