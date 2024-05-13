import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Item } from '../types';

interface ItemListProps {
	collectionPath: string; // Path to the collection in Firestore
	title: string; // Title of the item list
  }
  
  const ItemList: React.FC<ItemListProps> = ({ collectionPath, title }) => {
	const [itemList, setItemList] = useState<Item[]>([]);
  
	useEffect(() => {
	  const fetchItems = async () => {
		try {
		  const querySnapshot = await getDocs(collection(db, collectionPath));
		  const itemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Item);
		  setItemList(itemsData);
		} catch (error) {
		  console.error('Error fetching items:', error);
		}
	  };
  
	  fetchItems();
  
	  return () => {};
	}, [collectionPath]);
  
	return (
	  <div className='item-list'>
		<h2>{title}</h2>
		<ul className='items'>
		  {itemList.map((item) => (
			<li key={item.id}>
			  {item.name} - {item.type}
			</li>
		  ))}
		</ul>
	  </div>
	);
  };
  
  export default ItemList;