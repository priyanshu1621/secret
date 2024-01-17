// SecretList.js

import React, { useEffect, useState } from 'react';
import { fetchSecrets } from '../utils/api';
// import '../styles.css'; // Import the Tailwind CSS file

const SecretList = () => {
  const [secrets, setSecrets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSecrets();
        setSecrets(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Secret List</h2>
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

export default SecretList;
