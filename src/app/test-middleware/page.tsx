'use client';

import { useEffect, useState } from 'react';

export default function TestMiddlewarePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user') as string | null;
    const parsed = stored ? JSON.parse(stored) : null;
    setUser(parsed);
  }, []);

  const directNavigationTest = (href: string) => {
    window.location.href = href;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">🛡️ Middleware Route Guard Test</h1>
          <div className="mb-4">
            <strong>Logged in as:</strong> {user?.email || 'Guest'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Protected Routes (logged-in should redirect)</h2>
          <div className="space-y-2">
            <button
              onClick={() => directNavigationTest('/forgot-password')}
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 clickable"
            >
              Try /forgot-password →
            </button>
            <button
              onClick={() => directNavigationTest('/set-password')}
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 clickable"
            >
              Try /set-password →
            </button>
            <button
              onClick={() => directNavigationTest('/verify-code')}
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 clickable"
            >
              Try /verify-code →
            </button>

            <button
              onClick={() => directNavigationTest('/login')}
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 clickable"
            >
              Try /login →
            </button>

            <button
              onClick={() => directNavigationTest('/signup')}
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 clickable"
            >
              Try /signup →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Allowed Routes (always)</h2>
          <div className="space-y-2">
            <button
              onClick={() => directNavigationTest('/test-clicks')}
              className="block w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 clickable"
            >
              Try /test-clicks →
            </button>
            <button
              onClick={() => directNavigationTest('/quick-logout')}
              className="block w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 clickable"
            >
              Try /quick-logout →
            </button>
            <button
              onClick={() => directNavigationTest('/test-middleware')}
              className="block w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 clickable"
            >
              Try /test-middleware →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Protected Dashboard (requires login)</h2>
          <div className="space-y-2">
            <button
              onClick={() => directNavigationTest('/dashboard')}
              className="block w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 clickable"
            >
              Try /dashboard →
            </button>
          </>
          </div>
        </div>
      </div>
    </div>
  );
}

