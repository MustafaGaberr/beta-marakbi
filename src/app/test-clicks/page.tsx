'use client';

export default function TestClicksPage() {
  const testButtons = [
    { text: 'Test Button 1', color: 'bg-blue-500' },
    { text: 'Test Button 2', color: 'bg-green-500' },
    { text: 'Test Button 3', color: 'bg-red-500' },
    { text: 'Test Button 4', color: 'bg-purple-500' },
    { text: 'Test Button 5', color: 'bg-yellow-500' },
    { text: 'Test Button 6', color: 'bg-pink-500' },
  ];

  const handleClick = (buttonText: string) => {
    alert(`You clicked ${buttonText}!`);
    console.log(`Clicked: ${buttonText}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🔧 Click Testing Page
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {testButtons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleClick(button.text)}
                className={`${button.color} text-white px-6 py-3 rounded-lg hover:opacity-80 transition-all duration-200 transform hover:scale-105 clickable border-2 border-transparent hover:border-white`}
              >
                {button.text}
              </button>
            ))}
          </div>

          {/* Link Tests */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Link Tests:</h2>
            <div className="space-y-2">
              <a 
                href="/login" 
                className="block text-blue-600 hover:text-blue-800 underline clickable"
              >
                → Go to Login Page
              </a>
              <a 
                href="/dashboard" 
                className="block text-blue<｜tool▁sep｜>600 hover:text-blue-800 underline clickable"
              >
                → Go to Dashboard
              </a>
              <a 
                href="/test-auth" 
                className="block text-blue-600 hover:text-blue-800 underline clickable"
              >
                → Go to Test Auth Page
              </a>
            </div>
          </div>

          {/* CSS Debug */}
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-yellow-900 mb-4">CSS Debug Info:</h2>
            <div className="space-y-2 text-sm">
              <div>✅ Global CSS Click Fixes Applied</div>
              <div>✅ Z-index fixes applied</div>
              <div>✅ Pointer events enabled</div>
              <div>✅ Cursor pointer set globally</div>
              <div>✅ Class "clickable" available</div>
            </div>
          </div>
        </div>

        {/* Debug overlay blocker */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Debugging Tools:</h2>
          <div className="space-y-3">
            <button
              onClick={() => {
                const buttons = document.querySelectorAll('button');
                console.log(`Found ${buttons.length} buttons on page`);
                buttons.forEach((btn, i) => {
                  console.log(`Button ${i}:`, btn);
                });
              }}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors clickable"
            >
              📊 Count All Buttons on Page
            </button>
            
            <button
              onClick={() => {
                const links = document.querySelectorAll('a');
                console.log(`Found ${links.length} links on page`);
                links.forEach((link, i) => {
                  console.log(`Link ${i}:`, link);
                });
              }}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors clickable"
            >
              🔗 Count All Links on Page
            </button>
            
            <button
              onClick={() => {
                console.log('Current page:', window.location.href);
                console.log('User agent:', navigator.userAgent);
                console.log('Viewport:', { width: window.innerWidth, height: window.innerHeight });
              }}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors clickable"
            >
              ℹ️ Page Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
