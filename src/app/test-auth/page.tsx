'use client';

import { useRouter } from 'next/navigation';

export default function TestAuthPage() {
  const router = useRouter();

  const authPages = [
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
    { name: 'Verify Code', path: '/verify-code' },
    { name: 'Forgot Password', path: '/forgot-password' },
    { name: 'Set Password', path: '/set-password' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Quick Logout', path: '/quick-logout' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🔒 Marakbi Auth Pages Testing</h1>
          <p className="text-gray-600 mb-6">
            Click any button below to test the authentication pages without needing to login.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {authPages.map((page) => (
              <button
                key={page.path}
                onClick={() => router.push(page.path)}
                className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-left"
              >
                <h3 className="font-semibold mb-1">{page.name}</h3>
                <p className="text-blue-100 text-sm opacity-90">{page.path}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 Test Credentials</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="mb-2">
              <span className="font-medium text-gray-700">Email:</span>
              <code className="ml-2 bg-white px-2 py-1 rounded">admin@marakbi.com</code>
            </div>
            <div>
              <span className="font-medium text-gray-700">Password:</span>
              <code className="ml-2 bg-white px-2 py-1 rounded">password</code>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Use these credentials to login and test the dashboard + logout functionality.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">🐛 Debug Actions</h2>
          <div className="space-y-2">
            <button
              onClick={async () => {
                try {
                  // Clear server-side session first
                  await fetch('/api/clear-session', { method: 'POST' });
                } catch (error) {
                  console.error('Clear session error:', error);
                }
                
                if (typeof window !== 'undefined') {
                  // Clear localStorage
                  localStorage.clear();
                  sessionStorage.clear();
                  
                  // Clear all cookies
                  document.cookie.split(";").forEach(function(c) { 
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                  });
                  
                  // Force reload
                  window.location.reload();
                }
              }}
              className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              💥 Complete Session Clear & Reload
            </button>
            
            <button
              onClick={() => {
                window.location.href = '/quick-logout';
              }}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🚀 Go to Quick Logout Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
