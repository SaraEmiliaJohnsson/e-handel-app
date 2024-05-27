import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Item } from '../../types';
import './ProductDetailPage.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/shoppingCartSlice';

const ProductPage: React.FC = () => {
    const { slug, itemId } = useParams<{ slug: string; itemId: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchItem = async () => {
            if (slug && itemId) {
                const itemDoc = await getDoc(doc(db, `category/${slug}/items`, itemId));
                if (itemDoc.exists()) {
                    const itemData = itemDoc.data() as Item;
                    setItem({ ...itemData, id: itemDoc.id });
                }
            }
        };

        fetchItem();
    }, [slug, itemId]);

    const handleAddToCart = (item: Item) => {
        dispatch(addToCart(item));
    };

    if (!item) return <div>Loading...</div>;

    return (
        <div className="product-page">
            <div className="inside-product-page">
                <button onClick={() => navigate('/kategorier')} className="back-button">
                    Tillbaka
                </button>

                <h1>{item.name}</h1>
                <img src={item.imgURL} alt={item.name} className="product-image" />
                <div className="product-info">
                    <p>{item.description}</p>
                    <p>Pris: {item.price} kr</p>
                    <button className="product-buy-btn" type="button" onClick={() => handleAddToCart(item)}>
                        Köp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
