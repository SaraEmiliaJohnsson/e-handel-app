import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Item } from "../../types";
import './ProductDetailPage.css';

const ProductDetailPage: React.FC = () => {
    const { category, id } = useParams<{ category: string; id: string }>();
    const [product, setProduct] = useState<Item | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (category && id) {
                const docRef = doc(db, `category/${category}/items`, id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() } as Item);
                } else {
                    console.error("No such document!");
                }
            }
        };

        fetchProduct();
    }, [category, id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail-container">
            <h1>{product.name}</h1>
            <img src={product.imgURL} alt={product.name} className="product-image" />
            <p>{product.description}</p>
            <p>{product.price} kr</p>
        </div>
    );
};

export default ProductDetailPage;
