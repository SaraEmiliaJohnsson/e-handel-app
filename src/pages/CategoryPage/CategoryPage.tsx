import { useEffect, useState } from "react";
import "./CategoryPage.css"
import { Category } from "../../types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Link } from "react-router-dom";

export default function CategoryPage() {
	const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            const querySnapshot = await getDocs(collection(db, 'category'));
            const categoryData = querySnapshot.docs.map((doc) => ({ slug: doc.id, ...doc.data() } as Category));
            setCategories(categoryData);
        };
        fetchCategories();
    }, []);
    return <div className="category-container">
		<h2 className="category-title">Kategorier</h2>
            <ul className="category-list" role="list">
                {categories.map((category) => (
                        <Link className="category-link" key={category.name} to={`/kategori/${category.slug}`}>
                            {category.name}
                        </Link>
                ))}
            </ul>
		
		</div>;
}
