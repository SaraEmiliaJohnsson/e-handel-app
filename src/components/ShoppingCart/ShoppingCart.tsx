import ShoppingCartItem from './ShoppingCartItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../main';
import closeIcon from '../../assets/close.svg';
import { selectTotalPrice } from '../../features/shoppingCartSlice';
import './ShoppingCart.css';
import { toggleCart } from '../../features/cartVisibilitySlice';
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
                {shoppingCart && shoppingCart.map((item) => <ShoppingCartItem key={item.id} item={item} />)}
            </ul>
            <p className="shopping-cart__total">
                Total: <span>{totalPrice}</span> kr
            </p>
            <button className="shopping-cart__button shopping-cart__button--checkout" type="button">
                Kassa
            </button>
        </aside>
    );
}
