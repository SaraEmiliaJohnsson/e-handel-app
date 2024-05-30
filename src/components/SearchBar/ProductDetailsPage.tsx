import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Item } from '../../types';
import './ProductDetailPage.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/shoppingCartSlice';
import backarrow from '../../assets/backarrow.svg';

const ProductPage: React.FC = () => {
    const { slug, itemId } = useParams<{ slug: string; itemId: string }>();
    const [item, setItem] = useState<Item | null>(null);
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
                <button onClick={() => window.history.back()} className="back-button">
                    <img src={backarrow} alt="back arrow" />
                </button>

                <img src={item.imgURL} alt={item.name} className="product-image" />
                <div className="product-info">
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                    <p className="product-info--price">{item.price} :-</p>
                    <button className="product-buy-btn" type="button" onClick={() => handleAddToCart(item)}>
                        Köp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
