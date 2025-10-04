'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/api';

export default function QuickLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const clearEverything = async () => {
      try {
        // Call API to clear server-side cookies
        await fetch('/api/clear-session', { method: 'POST' });
      } catch (error) {
        console.error('Clear session API error:', error);
      }
      
      // Force clear all localStorage data
      storage.clearAll();
      
      // Clear all cookies manually as backup
      if (typeof document !== 'undefined') {
        document.cookie.split(";").forEach(function(c) { 
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });
      }
      
      // Force reload and redirect to test page
      setTimeout(() => {
        window.location.href = '/test-auth';
      }, 500);
    };

    clearEverything();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Clearing session and redirecting...</p>
      </div>
    </div>
  );
}
