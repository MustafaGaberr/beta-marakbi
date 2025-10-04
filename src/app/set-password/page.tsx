'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockApi, storage } from '@/lib/api';

const EyeIcon = ({ showPassword }: { showPassword: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-500">
    {showPassword ? (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M7 7l10 10" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 13c1.5-3 4.5-5 9-5s7.5 2 9 5" stroke="currentColor" strokeWidth="2" fill="none"/>
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" fill="currentColor"/>
      </>
    )}
  </svg>
);

export default function SetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        <div className="max-w-lg">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-black mb-3 text-left">
              Set a password
            </h1>
            <p className="text-base text-gray-500 mb-10 text-left leading-relaxed">
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
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="**************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input auth-input-with-icon h-12 px-4"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-eye-icon"
                >
                  <EyeIcon showPassword={showPassword} />
                </button>
              </div>
            </div>

            {/* Re-Enter Password Field */}
            <div className="mb-6">
              <label className="block text-black text-base mb-2">
                Re-Enter Password
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="**************"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="auth-input auth-input-with-icon h-12 px-4"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="auth-eye-icon"
                >
                  <EyeIcon showPassword={showConfirmPassword} />
                </button>
              </div>
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
              className={`w-full h-12 rounded-lg border-none text-white text-base font-medium cursor-pointer transition-colors ${
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
