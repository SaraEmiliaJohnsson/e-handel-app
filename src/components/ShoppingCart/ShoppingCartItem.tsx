import { useDispatch } from 'react-redux';
import type { CartItem } from '../../types';
import { addToCart, removeFromCart } from '../../features/shoppingCartSlice';

interface CartItemProps {
    item: CartItem;
}
export default function ShoppingCartItem({ item }: CartItemProps) {
    const dispatch = useDispatch();

    const handleAddQuantity = () => {
        dispatch(addToCart(item));
    };
    const handleRemoveQuantity = () => {
        dispatch(removeFromCart(item.id));
    };
    return (
        <li className="shopping-cart-item">
            <img className="shopping-cart-item__image" src={item.imgURL} alt={item.name} />
            <div className="shopping-cart-item__details">
                <p className="shopping-cart-item__name">{item.name}</p>
                <p className="shopping-cart-item__price">{item.price * item.quantity} :-</p>
            </div>
            <div className="shopping-cart-item__quantity">
                <button
                    type="button"
                    onClick={handleRemoveQuantity}
                    className="shopping-cart-item__quantity-button shopping-cart-item__quantity-button--decrease"
                >
                    -
                </button>
                <p className="shopping-cart-item__quantity-value">{item.quantity}</p>
                <button
                    type="button"
                    onClick={handleAddQuantity}
                    className="shopping-cart-item__quantity-button shopping-cart-item__quantity-button--increase"
                >
                    +
                </button>
            </div>
        </li>
    );
}
