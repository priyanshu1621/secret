import React, { useState, useEffect } from 'react';
import { fetchSecrets } from '../utils/api';


const HomeScreen = () => {
  const [secrets, setSecrets] = useState([]);
  const [newSecret, setNewSecret] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchSecrets();
      setSecrets(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostSecret = async () => {
    // Assuming you have a function to post secrets in your API
    try {
      // Implement the API call to post the new secret
      // await postSecret(newSecret);

      // After posting, fetch the updated secrets
      fetchData();

      // Clear the new secret input field
      setNewSecret('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Welcome to the Home Screen!</h2>
      
      {/* Section for posting secrets */}
      <div className="mb-8 justify-center">
        <textarea
          className="w-full h-24 p-2 border rounded-md"
          placeholder="Share your secret..."
          value={newSecret}
          onChange={(e) => setNewSecret(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          onClick={handlePostSecret}
        >
          Post Secret
        </button>
      </div>

      {/* Section for displaying secrets */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {secrets.map((secret, index) => (
          <div key={index} className="bg-white border p-4 rounded-md shadow-md">
            <p className="text-lg">{secret.secret}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
