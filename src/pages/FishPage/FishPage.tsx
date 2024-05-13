import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Fish } from '../../types';


const FishPage: React.FC = () => {
  const [fishList, setFishList] = useState<Fish[]>([]);

  useEffect(() => {
    const fetchFishes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'category', 'fish', 'items'));
        const fishesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Fish);
        setFishList(fishesData);
      } catch (error) {
        console.error('Error fetching fishes:', error);
      }
    };

    fetchFishes();

    return () => {};
  }, []);

  return (
    <div>
      <h2>Fishes</h2>
      <ul>
        {fishList.map((fish) => (
          <li key={fish.id}>
            {fish.name} - {fish.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FishPage;
