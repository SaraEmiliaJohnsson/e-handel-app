import { useState } from 'react';
import { AdminItem } from '../../types';
import './AdminView.css';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface TableRowProps {
    item: AdminItem;
    deleteItem: (docId: string) => void;
}

const TableRow = ({ item, deleteItem }: TableRowProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState<Partial<AdminItem>>({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        imgURL: item.imgURL,
    });

    const updateItem = async (docId: string, newData: Partial<AdminItem>) => {
        try {
            const itemRef = doc(db, `category/${newData.category}/items`, docId);
            await updateDoc(itemRef, newData);
            console.log('Item updated successfully!');
        } catch (error) {
            console.error('Error updating item: ', error);
        }
    };
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleClose = () => {
        setIsEditing(false);
        setEditedItem({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            imgURL: item.imgURL,
        });
    };

    const handleSave = () => {
        console.log(item.docId);
        console.log(editedItem);
        if (JSON.stringify(item) !== JSON.stringify(editedItem)) {
            updateItem(item.docId, editedItem);
        }
        setIsEditing(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSave();
    };

    const deleteItemHandler = async (docId: string) => {
        try {
            const itemRef = doc(db, `category/${item.category}/items`, docId);
            await deleteDoc(itemRef);
            console.log('Item deleted successfully!');
            deleteItem(docId);
        } catch (error) {
            console.error('Error deleting item: ', error);
        }
    };

    return (
        <>
            <tr className="adminview-table-row">
                <td>{item.category}</td>
                <td>{item.name}</td>
                <td>{item.price} </td>
                <td>{item.description}</td>
                <td>{item.imgURL}</td>
                <td className="btn-column-container">
                    <button className="admin-view-btn" onClick={handleEdit}>
                        Redigera
                    </button>
                    <button className="admin-view-btn" onClick={() => deleteItemHandler(item.docId)}>
                        Radera
                    </button>
                </td>
            </tr>
            {isEditing && (
                <div className="overlay">
                    <div className="popup">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={editedItem.name}
                                onChange={(e) => setEditedItem((prevState) => ({ ...prevState, name: e.target.value }))}
                            />
                            <input
                                type="number"
                                name="price"
                                value={editedItem.price}
                                onChange={(e) =>
                                    setEditedItem((prevState) => ({ ...prevState, price: e.target.value }))
                                }
                            />
                            <input
                                type="text"
                                name="description"
                                value={editedItem.description}
                                onChange={(e) =>
                                    setEditedItem((prevState) => ({ ...prevState, description: e.target.value }))
                                }
                            />
                            <input
                                type="text"
                                name="imgURL"
                                value={editedItem.imgURL}
                                onChange={(e) =>
                                    setEditedItem((prevState) => ({ ...prevState, imgURL: e.target.value }))
                                }
                            />
                            <button className="admin-view-btn" type="submit">
                                Spara
                            </button>
                            <button className="admin-view-btn" type="button" onClick={handleClose}>
                                Avbryt
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default TableRow;
