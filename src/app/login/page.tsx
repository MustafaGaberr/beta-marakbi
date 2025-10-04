'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockApi, storage } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simple validation
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      // Call API
      const response = await mockApi.login({ email, password, rememberMe });

      if (response.success && response.data) {
        // Save tokens and user data
        storage.setTokens(response.data.tokens);
        storage.setUser(response.data.user);
        
        // Navigate to dashboard
        router.push('/dashboard');
      } else {
        setError(response.error || 'Login failed. Please try again.');
      }
      
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials.');
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
          src="/images/Rectangle 3463861.png" 
          alt="Sailboat"
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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-black mb-2 text-center">
              Welcome Back
            </h1>
            <p className="text-xl font-medium text-gray-500 mb-24 text-center capitalize">
              log in to continue your adventure
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-8">
              <label className="block text-gray-600 text-sm font-semibold mb-2 capitalize">
                Email
              </label>
              <input 
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-semibold mb-2 capitalize">
                Password
              </label>
              <input 
                type="password"
                placeholder="**************"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            {/* Remember Me & Forget Password */}
            <div className="flex justify-between items-center mb-10">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded-full border-2 border-gray-500 cursor-pointer flex items-center justify-center ${
                    rememberMe ? 'bg-gray-500' : ''
                  }`}
                >
                  {rememberMe && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-gray-500 capitalize">
                  Remember me
                </span>
              </label>
              <button 
                type="button" 
                onClick={() => router.push('/forgot-password')}
                className="auth-link-button capitalize"
              >
                Forget Password?
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="auth-error-message">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button 
              type="submit"
              disabled={loading}
              className="auth-submit-button"
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-base text-gray-500 capitalize">
              You Don't Have An Account?{' '}
              <button
                type="button"
                onClick={() => router.push('/signup')}
                className="auth-link-button"
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
   </div>
  );
}
