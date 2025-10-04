'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockApi } from '@/lib/api';

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

export default function VerifyCodePage() {
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  // Timer for resend functionality
  useEffect(() => {
    let timer: number;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setError('');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if code is entered
      if (!code) {
        setError('Please enter the verification code');
        return;
      }

      // Call API
      const response = await mockApi.verifyCode(code);

      if (response.success) {
        // Navigate to set password page on success
        router.push('/set-password');
      } else {
        setError(response.error || 'Invalid verification code. Please try again.');
      }
      
    } catch (err) {
      console.error('Verification error:', err);
      setError('Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setResendTimer(60);
    setCanResend(false);
    setError('');
    
    try {
      const response = await mockApi.resendCode();
      
      if (!response.success) {
        setError(response.error || 'Failed to resend code. Please try again.');
      }
      
    } catch (err) {
      console.error('Resend error:', err);
      setError('Failed to resend code. Please try again.');
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
          src="/images/Rectangle 3463875.png" 
          alt="Verification background"
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
          {/* Navigation */}
          <div className="flex items-center mb-16">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="auth-back-button"
            >
              <span className="text-lg font-bold">&lt;</span>
              Back to login
            </button>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-black mb-3 text-left">
              Verify code
            </h1>
            <p className="text-base text-black mb-10 text-left">
              An authentication code has been sent to your email.
            </p>
          </div>

          {/* Verification Code Form */}
          <form onSubmit={handleVerify}>
            {/* Code Input */}
            <div className="mb-6">
              <label className="block text-black text-base mb-2">
                Enter Code
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="**************"
                  value={code}
                  onChange={handleCodeChange}
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

            {/* Error Message */}
            {error && (
              <div className="auth-error-message text-center">
                {error}
              </div>
            )}

            {/* Resend Section */}
            <div className="mb-6">
              {canResend ? (
                <p className="text-base text-black">
                  Didn't Receive A Code?{' '}
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={loading}
                    className={`text-blue-600 font-medium bg-none border-none cursor-pointer text-base underline ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Resend
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Resend code in {resendTimer}s
                </p>
              )}
            </div>

            {/* Verify Button */}
            <button 
              type="submit"
              disabled={loading || !code}
              className={`w-full h-12 bg-blue-800 rounded-lg border-none text-white text-base font-medium cursor-pointer transition-colors ${
                loading || !code ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-blue-900'
              } ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
