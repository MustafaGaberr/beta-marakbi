'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCustomerProfile, updateCustomerProfile, createCustomerProfile, getToken, handleApiError } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  const [user, setUser] = useState<{id?: string; fullName?: string; email?: string; role?: 'user' | 'boat_owner' | 'admin'} | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  // const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const profileData = await getCustomerProfile();
        console.log('Profile data:', profileData);
        
        // Set user data from API response
        setUser({
          id: profileData.user_id?.toString(),
          fullName: profileData.username,
          email: profileData.email || '',
          role: 'user'
        });
        
        setFormData({
          firstName: profileData.username || '',
          lastName: '',
          email: profileData.email || '',
          address: profileData.address || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist, we'll create it when user saves
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    try {
      const profileData = {
        bio: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.email, // Using email as phone for now
        address: formData.address
      };

      // Try to update existing profile first
      try {
        await updateCustomerProfile(profileData);
        setSuccess('Profile updated successfully!');
      } catch (updateError) {
        // If update fails, try to create new profile
        await createCustomerProfile(profileData);
        setSuccess('Profile created successfully!');
      }
      
      // Update local user data
      const updatedUser = {
        id: user?.id || '1',
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        role: (user?.role as 'user' | 'boat_owner' | 'admin') || 'user'
      };
      
      setUser(updatedUser);
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
    } catch (error) {
      console.error('Profile update error:', error);
      setError(handleApiError(error));
    }
  };

  const handleCancel = () => {
    // setIsEditing(false);
    setError('');
    setSuccess('');
    // Reset form data
    setFormData(prev => ({
      ...prev,
      firstName: user?.fullName?.split(' ')[0] || '',
      lastName: user?.fullName?.split(' ').slice(1).join(' ') || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-black relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center opacity-60" 
             style={{backgroundImage: "url('/images/Rectangle 3463878.jpg')"}}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-center justify-center">
            {/* Left Side - My Profile Text */}
            <div className="flex flex-col items-start">
              <h1 className="text-6xl font-bold text-white font-poppins leading-tight">
                My
              </h1>
              <h1 className="text-6xl font-bold text-white font-poppins leading-tight">
                Profile
              </h1>
            </div>
            
            {/* Vertical Line */}
            <div className="w-px h-32 bg-white mx-8"></div>
            
            {/* Right Side - Description */}
            <div className="flex-1 max-w-2xl">
              <p className="text-xl text-white leading-relaxed font-poppins">
                No Matter The Journey, We Have A Boat For Your Story. Explore Egypt&apos;s Stunning Waterways With A Curated Selection Of Vessels And Seasoned Captains.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Profile Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6">
              <div className="mb-8">
                <h2 className="text-5xl font-bold text-gray-900 mb-2 font-poppins">Welcome!</h2>
                <p className="text-blue-600 text-5xl font-bold font-poppins">{user.fullName?.split(' ')[0] || 'User'}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Manage My Account</h3>
                <nav className="space-y-1">
                  <a href="/profile" className="block text-blue-600 font-medium font-poppins text-base">
                    My Profile
                  </a>
                  <a href="/payment-options" className="block text-gray-600 font-poppins text-base">
                    My Payment Options
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* Right Content - Edit Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-2xl font-medium text-blue-600 mb-6 font-poppins">Edit Your Profile</h2>
              
              <form onSubmit={handleSaveChanges} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white font-poppins"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white font-poppins"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white font-poppins"
                      placeholder="Email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white font-poppins"
                      placeholder="Address"
                    />
                  </div>
                </div>

                {/* Password Changes Section */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Password Changes</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white font-poppins"
                      placeholder="Current Password"
                    />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white font-poppins"
                      placeholder="New Password"
                    />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white font-poppins"
                      placeholder="Confirm New Password"
                    />
                    </div>
                  </div>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg font-poppins">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg font-poppins">
                    {success}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 text-gray-700 hover:text-gray-900 font-medium font-poppins"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors font-poppins"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
