import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { DeleteButtonProps } from '../../types';

const DeleteItem = ({ item, onDelete }: DeleteButtonProps) => {
    const deleteItemHandler = async () => {
        try {
            const itemRef = doc(db, `category/${item.category}/items`, item.docId);
            await deleteDoc(itemRef);
            console.log('Item deleted successfully!');
            onDelete(item.docId);
        } catch (error) {
            console.error('Error deleting item: ', error);
        }
    };

    return (
        <button className="admin-view-btn" onClick={deleteItemHandler}>
            Radera
        </button>
    );
};

export default DeleteItem;
