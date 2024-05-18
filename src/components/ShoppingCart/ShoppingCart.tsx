import ShoppingCartItem from './ShoppingCartItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../main';
import closeIcon from '../../assets/close.svg';
import { clearCart, selectTotalPrice } from '../../features/shoppingCartSlice';
import './ShoppingCart.css';
import { toggleCart } from '../../features/cartVisibilitySlice';
import { Link } from 'react-router-dom';
import trashcanIcon from '../../assets/trashCan.svg';
export default function ShoppingCart() {
    const dispatch = useDispatch();

    const totalPrice = useSelector(selectTotalPrice) as number;
    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
    const cartVisibility = useSelector((state: RootState) => state.cartVisibility);

    return (
        <aside className={`shopping-cart ${cartVisibility.isCartOpen ? 'open' : ''}`}>
            <button type="button" onClick={() => dispatch(toggleCart())} className="shopping-cart__button--close">
                <img src={closeIcon} alt="Close" />
            </button>
            <h2 className="shopping-cart__title">Kundkorg</h2>
            <ul className="shopping-cart__list" role="list">
                {shoppingCart.length > 0 ? (
                    shoppingCart.map((item) => <ShoppingCartItem key={item.id} item={item} />)
                ) : (
                    <li className="shopping-cart__empty-message">Här var det tomt</li>
                )}
            </ul>
            <p className="shopping-cart__total">
                Total: <span>{totalPrice}</span> kr
            </p>
            <button
                type="button"
                onClick={() => dispatch(clearCart())}
                className="shopping-cart__button shopping_cart__button--empty"
            >
                <span>
                    <img src={trashcanIcon} alt="trashcan" />
                </span>
                Töm kundvagn
            </button>
            <Link to={'/kassa'} className="shopping-cart__button shopping-cart__button--checkout" type="button">
                Kassa
            </Link>
        </aside>
    );
}
