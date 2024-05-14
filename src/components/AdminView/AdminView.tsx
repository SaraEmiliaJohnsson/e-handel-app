import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import TableRow from './TableRow';
import { AdminItem, Item } from '../../types';

const Adminview = () => {
    const [allItemsData, setAllItemsData] = useState<AdminItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categorySnapshot = await getDocs(collection(db, 'category'));

                const allItemsPromise = categorySnapshot.docs.map(async (categoryDoc) => {
                    const categoryName = categoryDoc.id;
                    const itemsQuery = query(collection(categoryDoc.ref, 'items'));
                    const itemsSnapshot = await getDocs(itemsQuery);
                    const itemsData: AdminItem[] = itemsSnapshot.docs.map((itemDoc) => ({
                        category: categoryName,
                        ...(itemDoc.data() as Item),
                    }));
                    return itemsData;
                });
                const allItems = await Promise.all(allItemsPromise);
                console.log(allItems.flat());
                setAllItemsData(allItems.flat());
            } catch (error) {
                console.log('Error getting documents: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Kategori</th>
                        <th>Namn</th>
                        <th>Pris</th>
                        <th>Beskrivning</th>
                        <th>Bild URL</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {allItemsData.map((item) => (
                        <TableRow item={item} />
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Adminview;
