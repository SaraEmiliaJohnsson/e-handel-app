import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Item } from "../../types";
import './ProductDetailPage.css';

const ProductPage: React.FC = () => {
    const { slug, itemId } = useParams<{ slug: string; itemId: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            if (slug && itemId) {
                const itemDoc = await getDoc(doc(db, `category/${slug}/items`, itemId));
                if (itemDoc.exists()) {
                    setItem(itemDoc.data() as Item);
                }
            }
        };

        fetchItem();
    }, [slug, itemId]);

    if (!item) return <div>Loading...</div>;

    return (
        <div className="product-page">

            <div className="inside-product-page">
                <button onClick={() => navigate(-1)} className="back-button">Tillbaka</button>

                <h1>{item.name}</h1>
                <img src={item.imgURL} alt={item.name} className="product-image" />
                <div className="product-info">
                    <p>{item.description}</p>
                    <p>{item.price} kr</p>
                </div>
            </div>

        </div>
    );
};

export default ProductPage;
