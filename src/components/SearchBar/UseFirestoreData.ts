import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Item } from "../../types";

export const UseFirestoreData = (categoryPath: string) => {
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchItems = async () => {
            setLoading(true);

            try {
                const categorySnapshot = await getDocs(collection(db, 'category'));
                const allItems: Item[] = [];

                for (const categoryDoc of categorySnapshot.docs) {
                    const category = categoryDoc.id;

                    const itemsSnapshot = await getDocs(collection(db, `category/${category}/items`));

                    const itemsData = itemsSnapshot.docs.map(doc => {
                        const itemData = doc.data();
                        return {
                            id: doc.id,
                            category,
                            name: itemData.name,
                            price: itemData.price,
                            description: itemData.description,
                            imgURL: itemData.imgURL,
                            imgId: itemData.imgId,
                            title: itemData.title,
                        } as Item;
                    });
                    allItems.push(...itemsData);
                }

                console.log('Fetched items:', allItems);
                setData(allItems);
            } catch (error) {
                console.error('Error fetching items:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, [categoryPath]);

    return { data, loading };
};
