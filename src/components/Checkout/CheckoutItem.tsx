import './CheckoutItem.css';
import trashcanIcon from '../../assets/trashCan.svg';
import type { CartItem } from '../../types';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../../features/shoppingCartSlice';
import { useState } from 'react';
interface CheckoutItemProps {
    item: CartItem;
}
export default function CheckoutItem({ item }: CheckoutItemProps) {
    const dispatch = useDispatch();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleRemoveItem = () => {
        setIsDeleting(true);
        setTimeout(() => {
            dispatch(removeItemFromCart(item.id));
        }, 300);
    };
    return (
        <li className={`checkout-item ${isDeleting ? 'is-deleting' : ''}`}>
            <img className="checkout-item__image" src={item.imgURL} alt={item.name} />
            <p className="checkout-item__name">{item.name}</p>
            <div className="checkout-item__details">
                <p className="checkout-item__price">{item.price * item.quantity} :-</p>
                <p className="shopping-cart-item__quantity-value checkout-item-quantity-value">{item.quantity} st</p>
            </div>
            <button
                className="checkout-item__remove-button"
                type="button"
                title="Ta bort från kundvagnen"
                onClick={handleRemoveItem}
            >
                <img src={trashcanIcon} alt="trashcan" />
            </button>
        </li>
    );
}
