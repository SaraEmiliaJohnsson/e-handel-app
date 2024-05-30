import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import TableRow from './TableRow';
import AddItem from './Additem';
import { Item } from '../../types';
import './AdminView.css';

const Adminview = () => {
    const [allItemsData, setAllItemsData] = useState<Item[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categorySnapshot = await getDocs(collection(db, 'category'));

                const allItemsPromise = categorySnapshot.docs.map(async (categoryDoc) => {
                    const categoryName = categoryDoc.id;
                    const itemsQuery = query(collection(categoryDoc.ref, 'items'));

                    const itemsSnapshot = await getDocs(itemsQuery);
                    const itemsData: Item[] = itemsSnapshot.docs.map((itemDoc) => ({
                        ...(itemDoc.data() as Item),
                        id: itemDoc.id,
                        category: categoryName,
                    }));
                    return itemsData;
                });
                const allItems = await Promise.all(allItemsPromise);
                setAllItemsData(allItems.flat());
            } catch (error) {
                console.log('Error getting documents: ', error);
            }
        };

        fetchData();
    }, []);

    const handleItemDeleted = (docId: string) => {
        setAllItemsData((prevItems) => prevItems.filter((item) => item.id !== docId));
    };
    const handleItemAdded = (newItem: Item) => {
        setAllItemsData((prevItems) => [...prevItems, newItem]);
    };

    return (
        <section className="adminView-container">
            <AddItem onAdd={handleItemAdded} />
            <table className="adminview-table">
                <thead className="adminview-table-header">
                    <tr className="adminview-table-row">
                        <th>Kategori</th>
                        <th>Namn</th>
                        <th>Pris</th>
                        <th>Beskrivning</th>
                        <th>Bild URL</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="adminview-table-body">
                    {allItemsData.map((item) => (
                        <TableRow key={item.id} item={item} deleteItem={handleItemDeleted} />
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default Adminview;
