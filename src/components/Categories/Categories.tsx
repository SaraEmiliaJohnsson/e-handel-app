import './Categories.css';
import { Link } from 'react-router-dom';
import { db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Category } from '../../types';

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const querySnapshot = await getDocs(collection(db, 'category'));
            const categoryData = querySnapshot.docs.map((doc) => ({ slug: doc.id, ...doc.data() } as Category));
            setCategories(categoryData);
        };
        fetchCategories();
    }, []);
    return (
        <>
            
            <h2 className="category-title">Kategorier</h2>
            <ul className="category-list" role="list">
                {categories.map((category) => (
                        <Link className="category-link" key={category.slug} to={`/kategorier/${category.slug}`}>
                            {category.slug}
						<img src={category.imgURL} alt={category.slug} className="category-image" />

                        </Link>
                ))}
            </ul>
        </>
    );
}
