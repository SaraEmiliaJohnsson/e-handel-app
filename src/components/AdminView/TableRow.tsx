import { useState } from 'react';
import { AdminItem, TableRowProps } from '../../types';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import EditForm from './EditForm';
import DeleteItem from './DeleteItem';

const TableRow = ({ item, deleteItem }: TableRowProps) => {
    const [isEditing, setIsEditing] = useState(false);

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
    };

    const handleSave = (editedItem: Partial<AdminItem>) => {
        if (JSON.stringify(item) !== JSON.stringify(editedItem)) {
            updateItem(item.docId, editedItem);
        }
        setIsEditing(false);
    };

    return (
        <>
            <tr className="adminview-table-row">
                <td>{item.category}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>{item.imgURL}</td>
                <td className="btn-column-container">
                    <button className="admin-view-btn" onClick={handleEdit}>
                        Redigera
                    </button>
                    <DeleteItem item={item} onDelete={deleteItem} />
                </td>
            </tr>
            {isEditing && <EditForm item={item} onSave={handleSave} onClose={handleClose} />}
        </>
    );
};

export default TableRow;
