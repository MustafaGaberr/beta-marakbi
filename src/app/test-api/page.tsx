'use client';

import { useState } from 'react';
import { 
  getHomeData, 
  getBoats, 
  getCities, 
  getSharingVoyages,
  login,
  register,
  handleApiError
} from '@/lib/api';

export default function TestApiPage() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState('');

  const testApiCall = async (name, apiCall) => {
    setLoading(prev => ({ ...prev, [name]: true }));
    setError('');
    
    try {
      const result = await apiCall();
      setResults(prev => ({ ...prev, [name]: result }));
      console.log(`${name} result:`, result);
    } catch (err) {
      const errorMsg = handleApiError(err);
      setError(`${name} failed: ${errorMsg}`);
      console.error(`${name} error:`, err);
    } finally {
      setLoading(prev => ({ ...prev, [name]: false }));
    }
  };

  const testLogin = async () => {
    await testApiCall('login', () => login('yaser2', '1234'));
  };

  const testRegister = async () => {
    await testApiCall('register', () => register('testuser', 'password123', 'test@example.com'));
  };

  const testHomeData = async () => {
    await testApiCall('homeData', getHomeData);
  };

  const testBoats = async () => {
    await testApiCall('boats', getBoats);
  };

  const testCities = async () => {
    await testApiCall('cities', getCities);
  };

  const testSharingVoyages = async () => {
    await testApiCall('sharingVoyages', getSharingVoyages);
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Test (Dummy Data Mode)</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">🔐 Authentication</h2>
            <div className="space-y-3">
              <button
                onClick={testLogin}
                disabled={loading.login}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading.login ? 'Testing...' : 'Test Login'}
              </button>
              <button
                onClick={testRegister}
                disabled={loading.register}
                className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              >
                {loading.register ? 'Testing...' : 'Test Register'}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">📊 Data APIs</h2>
            <div className="space-y-3">
              <button
                onClick={testHomeData}
                disabled={loading.homeData}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
              >
                {loading.homeData ? 'Testing...' : 'Test Home Data'}
              </button>
              <button
                onClick={testBoats}
                disabled={loading.boats}
                className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
              >
                {loading.boats ? 'Testing...' : 'Test Boats'}
              </button>
              <button
                onClick={testCities}
                disabled={loading.cities}
                className="w-full bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 disabled:opacity-50"
              >
                {loading.cities ? 'Testing...' : 'Test Cities'}
              </button>
              <button
                onClick={testSharingVoyages}
                disabled={loading.sharingVoyages}
                className="w-full bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 disabled:opacity-50"
              >
                {loading.sharingVoyages ? 'Testing...' : 'Test Sharing Voyages'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">API Results</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <pre className="text-sm overflow-auto max-h-96">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
