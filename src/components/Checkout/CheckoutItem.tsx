import './CheckoutItem.css';
import trashcanIcon from '../../assets/trashCan.svg';
import type { CartItem } from '../../types';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../../features/shoppingCartSlice';
interface CheckoutItemProps {
    item: CartItem;
}
export default function CheckoutItem({ item }: CheckoutItemProps) {
    const dispatch = useDispatch();
    return (
        <li className="checkout-item">
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
                onClick={() => dispatch(removeItemFromCart(item.id))}
            >
                <img src={trashcanIcon} alt="trashcan" />
            </button>
        </li>
    );
}
