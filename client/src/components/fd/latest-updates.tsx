// Assuming necessary imports like React, etc. are already present.
import { Update } from "@shared/types"; 
import { useState, useEffect } from 'react';

function LatestUpdates() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    // Fetch updates from MongoDB
    const fetchUpdates = async () => {
      try {
        const response = await fetch('/api/updates?limit=3'); // Added limit for efficiency
        if (!response.ok) {
          throw new Error(`Failed to fetch updates: ${response.status}`);
        }
        const data = await response.json();
        setUpdates(data);
      } catch (error) {
        console.error("Error fetching updates:", error);
        // Consider adding error handling UI here (e.g., display an error message)
      }
    };

    fetchUpdates();
  }, []);

  return (
    <div>
      <h2>Latest Updates</h2>
      {updates?.map((update) => (
        <div key={update._id} className="mb-6">
          <h3>{update.title}</h3>
          <p>{update.description}</p>
        </div>
      ))}
    </div>
  );
}

export default LatestUpdates;