import React, { useEffect } from 'react';

export default function LoadingPage() {
  useEffect(() => {
    document.title = 'Loading...';
  }, []);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <p className="font-serif text-5xl text-gray-900 animate-bounce">W</p>
    </div>
  );
}
