'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockApi, storage } from '@/lib/api';


export default function SetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!password || !confirmPassword) {
        setError('Please fill in all password fields');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // Call API
      const response = await mockApi.resetPassword(password, confirmPassword);

      if (response.success) {
        // Navigate to dashboard
        router.push('/dashboard');
      } else {
        setError(response.error || 'Failed to set password. Please try again.');
      }
      
    } catch (err) {
      console.error('Set password error:', err);
      setError('Failed to set password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Left Side - Image */}
      <div className="auth-left-side">
        <img 
          className="auth-left-image"
          src="/images/Rectangle 3463876.png" 
          alt="Set password background"
        />
        
        {/* Circle Background */}
        <div className="auth-logo-container">
          <img 
            src="/icons/Ellipse 46.svg" 
            alt="Circle Background"
            className="auth-circle-bg"
          />
          
          {/* Logo */}
          <div className="auth-logo">
            <img 
              src="/logo.png" 
              alt="Marakbi Logo"
              style={{ height: '110px' }}
            />
          </div>
        </div>

      </div>

      {/* Right Side - Form */}
      <div className="auth-form-container">
        <div className="auth-form-content">
          {/* Navigation */}
          <div className="flex items-center mb-16">
            <button
              type="button"
              onClick={() => router.push('/verify-code')}
              className="auth-back-button"
            >
              <i className="fas fa-angle-left text-lg"></i>
              Back to verify code
            </button>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-black mb-3 text-left font-poppins">
              Set a password
            </h1>
            <p className="text-base text-gray-500 mb-10 text-left leading-relaxed font-poppins">
              Your previous password has been reseted. Please set a new password for your account.
            </p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSetPassword}>
            {/* Create Password Field */}
            <div className="mb-6">
              <label className="block text-black text-base mb-2">
                Create Password
              </label>
              <input 
                type="password"
                placeholder="**************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input h-12 px-4"
                required
              />
            </div>

            {/* Re-Enter Password Field */}
            <div className="mb-6">
              <label className="block text-black text-base mb-2">
                Re-Enter Password
              </label>
              <input 
                type="password"
                placeholder="**************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input h-12 px-4"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="auth-error-message text-center">
                {error}
              </div>
            )}

            {/* Set Password Button */}
            <button 
              type="submit"
              disabled={loading || !password || !confirmPassword}
              className={`w-[70%] h-12 rounded-lg border-none text-white text-base font-medium cursor-pointer transition-colors ${
                loading || !password || !confirmPassword ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-900'
              } ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? 'Setting Password...' : 'Set Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
