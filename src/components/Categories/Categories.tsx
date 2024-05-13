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
            const categoryData = querySnapshot.docs.map((doc) => doc.data() as Category);
            setCategories(categoryData);
            console.log(categoryData);
        };
        fetchCategories();
    }, []);
    return (
        <>
            <h2 className="categories__title">Kategorier</h2>
            <ul className="categories__list" role="list">
                {categories.map((category) => (
                    <li className="categories__item" key={category.name}>
                        {/* <img src={`/landing-icons/${category.icon}`} alt="" /> */}
                        <Link className="categories__link" to={`kategori/${category.slug}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
