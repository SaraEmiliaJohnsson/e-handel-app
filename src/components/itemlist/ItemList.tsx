import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Item } from '../../types';
import './ItemsList.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/shoppingCartSlice';

interface ItemListProps {
    collectionPath: string; // Path to the collection in Firestore
    onItemClicked: (category: string, itemId: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ collectionPath, onItemClicked }) => {
    const [itemList, setItemList] = useState<Item[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, collectionPath));
                const itemsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Item));
                setItemList(itemsData);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();

        return () => {};
    }, [collectionPath]);

    const handleAddToCart = (item: Item, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation(); // Prevent event propagation to the parent element
        dispatch(addToCart(item));
    };

    return (
        <div className="item-list">
            <ul className="items" role="list">
                {itemList.map((item) => (
                    <li key={item.id} className="item" onClick={() => onItemClicked(item.category, item.id)}>
                        <img src={item.imgURL} alt={item.name} className="item-image" />
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-description">{item.description}</p>
                        <p className="item-price">{item.price}:-</p>
                        <button type="button" className="buy-button" onClick={(e) => handleAddToCart(item, e)}>
                            Köp
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
