import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Item } from '../../types';
import './ItemsList.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/shoppingCartSlice';
import { useNavigate } from 'react-router-dom';

interface ItemListProps {
    collectionPath: string; // Path to the collection in Firestore
}

const ItemList: React.FC<ItemListProps> = ({ collectionPath }) => {
    const [itemList, setItemList] = useState<Item[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

        return () => { };
    }, [collectionPath]);

    const handleGoToPruductDetailPage = (category: string, itemId: string) => {
        navigate(`/kategori/${category}/produkt/${itemId}`);

    }

    const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>, item: Item) => {
        event.stopPropagation();
        dispatch(addToCart(item));
    };

    return (
        <div className="item-list">
            <ul className="items" >
                {itemList.map((item) => (
                    <li key={item.id} className="item" onClick={() => handleGoToPruductDetailPage(item.category, item.id)}>
                        <div className="item-info" >
                            <h3 className="item-name">{item.name}</h3>
                            <p className="item-description">{item.description}</p>
                            <p className="item-price">
                                Pris: {item.price}kr
                                <button type="button" className="buy-button" onClick={(e) => handleAddToCart(e, item)}>
                                    Köp
                                </button>
                            </p>
                        </div>
                        <img src={item.imgURL} alt={item.name} className="item-image medium-image" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
