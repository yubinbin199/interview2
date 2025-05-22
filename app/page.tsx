'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Automatically redirect to the interview system page
    router.push('/interview-system?tab=invitation');
  }, [router]);
  
  return null; // No visible content on this page as we're redirecting
}
