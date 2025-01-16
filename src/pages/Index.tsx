import React from 'react';
import { Logo } from '@/components/Logo';
import { EmailSignup } from '@/components/EmailSignup';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-mayGray flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto text-center animate-fadeIn">
        <Logo />
        
        <h1 className="text-4xl md:text-6xl font-bold text-mayNavy mt-8 mb-4">
          MAY VENTURES
        </h1>
        
        <p className="text-xl md:text-2xl text-mayNavy/80 mb-8 max-w-2xl mx-auto">
          Empowering the next generation of groundbreaking startups.
        </p>
        
        <div className="h-px w-24 bg-mayPink mx-auto mb-8" />
        
        <p className="text-lg text-mayNavy/60 mb-12">
          Something exciting is in the works. Stay tuned for updates.
        </p>
        
        <div className="flex justify-center">
          <EmailSignup />
        </div>
      </div>
    </div>
  );
};

export default Index;