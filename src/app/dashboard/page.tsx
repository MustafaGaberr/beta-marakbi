'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage, authApi } from '@/lib/api';
import Header from '../../components/Header';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const userData = storage.getUser();
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(userData);
  }, [router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Call logout API to clear server-side session/cookies
      await authApi.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    }
    
    // Clear local storage and session storage
    storage.clearAll();
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear all cookies manually
      document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
      });
    }
    
    // Force page reload to clear any cached state
    window.location.href = '/login';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-poppins">Marakbi Dashboard</h1>
              <p className="text-gray-600 font-poppins">Welcome back, {user.fullName}</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
                isLoggingOut 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
              }`}
            >
              {isLoggingOut && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">Your Account</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <p className="text-gray-900">{user.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="text-gray-900 capitalize">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <h3 className="font-medium text-gray-900">Browse Boats</h3>
              <p className="text-gray-600 text-sm mt-1">Find your perfect boat rental</p>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <h3 className="font-medium text-gray-900">My Bookings</h3>
              <p className="text-gray-600 text-sm mt-1">View your reservation history</p>
            </button>
            <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <h3 className="font-medium text-gray-900">Profile Settings</h3>
              <p className="text-gray-600 text-sm mt-1">Update your account details</p>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}