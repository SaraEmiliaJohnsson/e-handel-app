import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { AdminItem, Item } from '../../types';

const AddItem = ({ onAdd }: { onAdd: (item: AdminItem) => void }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [newItem, setNewItem] = useState<Partial<Item>>({
        name: '',
        description: '',
        price: 0,
        imgURL: '',
    });
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categorySnapshot = await getDocs(collection(db, 'category'));
                const categoryNames = categorySnapshot.docs.map((doc) => doc.id);
                setCategories(categoryNames);
            } catch (error) {
                console.log('Error getting categories: ', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedCategory) {
            alert('Please select a category.');
            return;
        }
        try {
            const categoryRef = collection(db, `category/${selectedCategory}/items`);
            const newItemRef = await addDoc(categoryRef, newItem);
            const newItemData: AdminItem = {
                docId: newItemRef.id,
                category: selectedCategory,
                ...newItem,
            } as AdminItem;
            onAdd(newItemData);
            setNewItem({
                name: '',
                description: '',
                price: 0,
                imgURL: '',
            });
            setSelectedCategory('');
            setIsAdding(false);
        } catch (error) {
            console.error('Error adding item: ', error);
        }
    };
    const handleCancel = () => {
        setIsAdding(false);
    };

    return (
        <>
            <button className="open-add-item-popup" onClick={() => setIsAdding(true)}>
                Lägg till objekt
            </button>
            {isAdding && (
                <div className="add-item-popup">
                    <div className="add-item-popup-content">
                        <form onSubmit={handleSubmit} className="add-item-form">
                            <label htmlFor="category">Kategori:</label>
                            <input
                                list="categories"
                                id="category"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            />
                            <datalist id="categories">
                                {categories.map((category) => (
                                    <option key={category} value={category} />
                                ))}
                            </datalist>
                            <label htmlFor="name">Namn:</label>
                            <input
                                type="text"
                                id="name"
                                value={newItem.name}
                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                required
                            />
                            <label htmlFor="price">Pris:</label>
                            <input
                                type="number"
                                id="price"
                                value={newItem.price}
                                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                                required
                            />
                            <label htmlFor="description">Beskrivning:</label>
                            <input
                                type="text"
                                id="description"
                                value={newItem.description}
                                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                required
                            />
                            <label htmlFor="imgURL">Bild URL:</label>
                            <input
                                type="text"
                                id="imgURL"
                                value={newItem.imgURL}
                                onChange={(e) => setNewItem({ ...newItem, imgURL: e.target.value })}
                            />
                            <button type="submit" className="add-item-btn">
                                Lägg till objekt
                            </button>
                            <button type="button" className="add-item-btn" onClick={handleCancel}>
                                Avbryt
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddItem;
