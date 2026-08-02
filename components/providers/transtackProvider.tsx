'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react'; 

export default function TanstackProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const pingBackend = () => {
      fetch("https://assignment-4-vnjw.onrender.com")
        .then(() => console.log("Render Database kept alive successfully!"))
        .catch((err) => console.error("Keep-alive ping failed", err));
    };

    pingBackend();

    const keepAliveInterval = setInterval(pingBackend, 540000); 

    return () => clearInterval(keepAliveInterval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
