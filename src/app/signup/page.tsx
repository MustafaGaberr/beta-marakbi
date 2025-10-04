'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { mockApi } from '@/lib/api';

const EyeIcon = ({ showPassword }: { showPassword: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-500">
    {showPassword ? (
      // Eye with slash (hidden)
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M7 7l10 10" stroke="currentColor" strokeWidth="2"/>
        <path d="M3 13c1.5-3 4.5-5 9-5s7.5 2 9 5" stroke="currentColor" strokeWidth="2" fill="none"/>
      </>
    ) : (
      // Normal eye (visible)
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4z" fill="currentColor"/>
      </>
    )}
  </svg>
);

export default function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validation
      if (!fullName || !email || !password || !confirmPassword) {
        setError('Please fill in all fields');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (!agreeTerms) {
        setError('Please agree to the Terms of Service and Privacy Policy');
        return;
      }

      // Call API
      const response = await mockApi.signup({ fullName, email, password });

      if (response.success) {
        // Navigate to verification page
        router.push('/verify-code');
      } else {
        setError(response.error || 'Sign up failed. Please try again.');
      }
      
    } catch (err) {
      console.error('Sign up error:', err);
      setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Left Side - Image */}
      <div className="auth-left-side">
        <Image 
          className="auth-left-image"
          src="/images/Rectangle 3463873.png" 
          alt="Yacht background"
          width={500}
          height={700}
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
        <div className="max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2 text-center">
              Welcome
            </h1>
            <p className="text-lg font-medium text-gray-500 mb-8 text-center">
              Join us and start your next adventure
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp}>
            {/* Full Name Field */}
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-semibold mb-2 capitalize">
                Full Name
              </label>
              <input 
                type="text"
                placeholder="Your Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="auth-input h-12 px-4"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-semibold mb-2 capitalize">
                Email Address
              </label>
              <input 
                type="email"
                placeholder="Your@Example.Com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input h-12 px-4"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-semibold mb-2 capitalize">
                Password
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

            {/* Confirm Password Field */}
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-semibold mb-2 capitalize">
                Confirm Password
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

            {/* Terms Agreement */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-500 leading-5">
                <div
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={`w-4 h-4 rounded border-2 border-gray-400 cursor-pointer flex items-center justify-content-center ${
                    agreeTerms ? 'bg-gray-500' : ''
                  } flex-shrink-0 mt-0.5`}
                >
                  {agreeTerms && <div className="w-2 h-2 bg-white rounded-sm" />}
                </div>
                <span>
                  I Agree To The{' '}
                  <a 
                    href="#" 
                    className="text-blue-600 no-underline"
                  >
                    Terms Of Service
                  </a>
                  {' '}And{' '}
                  <a 
                    href="#" 
                    className="text-blue-600 no-underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="auth-error-message">
                {error}
              </div>
            )}

            {/* Sign Up Button */}
            <button 
              type="submit"
              disabled={loading}
              className="auth-submit-button h-12 mb-5"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-500 mb-5">
              You Have An Account?{' '}
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="auth-link-button"
              >
                Sign In
              </button>
            </p>

             {/* Separator */}
             <div className="flex items-center my-5">
               <div className="flex-1 h-px bg-gray-300" />
               <span className="px-4 text-sm text-gray-400 font-normal">
                 Or continue with
               </span>
               <div className="flex-1 h-px bg-gray-300" />
             </div>

             {/* Social Login Icons */}
             <div className="flex justify-between items-center w-full px-12">
               {/* Facebook */}
               <button
                 type="button"
                 onClick={() => console.log('Facebook login clicked')}
                 className="w-12 h-12 rounded-full border-none cursor-pointer bg-transparent flex items-center justify-center p-2"
               >
                 <Image 
                   src="/icons/flat-color-icons_fb.svg" 
                   alt="Facebook"
                   width={32}
                   height={32}
                 />
               </button>

               {/* Google */}
               <button
                 type="button"
                 onClick={() => console.log('Google login clicked')}
                 className="w-12 h-12 rounded-full border-none cursor-pointer bg-transparent flex items-center justify-center p-2"
               >
                 <Image 
                   src="/icons/flat-color-icons_google.svg" 
                   alt="Google"
                   width={32}
                   height={32}
                 />
               </button>

               {/* Apple */}
               <button
                 type="button"
                 onClick={() => console.log('Apple login clicked')}
                 className="w-12 h-12 rounded-full border-none cursor-pointer bg-transparent flex items-center justify-center p-2"
               >
                 <Image 
                   src="/icons/flat-color-icons_apple.svg" 
                   alt="Apple"
                   width={32}
                   height={32}
                 />
               </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
