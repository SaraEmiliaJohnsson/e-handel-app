import { useState } from 'react';
import { AdminItem } from '../../types';

interface EditFormProps {
    item: AdminItem;
    onSave: (editedItem: Partial<AdminItem>) => void;
    onClose: () => void;
}

const EditForm = ({ item, onSave, onClose }: EditFormProps) => {
    const [editedItem, setEditedItem] = useState<Partial<AdminItem>>({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        imgURL: item.imgURL,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSave(editedItem);
    };

    return (
        <div className="overlay">
            <div className="popup">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={editedItem.name}
                        onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                    />
                    <input
                        type="number"
                        name="price"
                        value={editedItem.price}
                        onChange={(e) => setEditedItem({ ...editedItem, price: parseInt(e.target.value) || 0 })}
                    />
                    <input
                        type="text"
                        name="description"
                        value={editedItem.description}
                        onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                    />
                    <input
                        type="text"
                        name="imgURL"
                        value={editedItem.imgURL}
                        onChange={(e) => setEditedItem({ ...editedItem, imgURL: e.target.value })}
                    />
                    <button className="admin-view-btn" type="submit">
                        Spara
                    </button>
                    <button className="admin-view-btn" type="button" onClick={onClose}>
                        Avbryt
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditForm;
