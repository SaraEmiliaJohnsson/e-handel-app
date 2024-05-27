import { useState } from 'react';
import { EditFormProps, AdminItem } from '../../types';

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
        <div className="edit-overlay">
            <div className=" edit-popup">
                <h2>Redigera</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Namn:</label>
                    <input
                        type="text"
                        name="name"
                        value={editedItem.name}
                        onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                    />
                    <label htmlFor="price">Pris:</label>
                    <input
                        type="number"
                        name="price"
                        value={editedItem.price}
                        onChange={(e) => setEditedItem({ ...editedItem, price: parseInt(e.target.value) || 0 })}
                    />
                    <label htmlFor="description">Beskrivning:</label>
                    <textarea
                        name="description"
                        value={editedItem.description}
                        onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                    />
                    <label htmlFor="imgURL">Bild-URL:</label>
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
