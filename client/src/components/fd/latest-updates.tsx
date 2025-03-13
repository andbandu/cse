// Assuming necessary imports like React, etc. are already present.
import { Update } from "@shared/types"; // Updated import
import { useState, useEffect } from 'react';

function LatestUpdates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Fetch updates from MongoDB
    const fetchUpdates = async () => {
      try {
        const response = await fetch('/api/updates'); // Assuming an API endpoint exists
        const data = await response.json();
        setUpdates(data);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div>
      <h2>Latest Updates</h2>
      {updates?.map((update) => ( // Updated to use MongoDB ID
        <div key={update._id} className="mb-6">
          <h3>{update.title}</h3>
          <p>{update.description}</p>
        </div>
      ))}
    </div>
  );
}

export default LatestUpdates;