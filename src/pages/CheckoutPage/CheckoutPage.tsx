import './CheckoutPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../features/cartVisibilitySlice';
import { RootState } from '../../main';
import CheckoutItem from '../../components/Checkout/CheckoutItem';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary';
import CheckoutDetails from '../../components/Checkout/CheckoutDetails';
export default function CheckoutPage() {
    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
    const dispatch = useDispatch();

    dispatch(close());

    return (
        <section className="checkout">
            <h1 className="checkout__title">Din beställning</h1>
            <ul className="checkout__list" role="list">
                {shoppingCart.length > 0 ? (
                    shoppingCart.map((item) => <CheckoutItem key={item.id} item={item} />)
                ) : (
                    <li className="checkout__empty-message">Din kundvagn är tom</li>
                )}
            </ul>
            <hr className="checkout__devider" />
            <div className="checkout__details-section">
                <CheckoutDetails />
                <CheckoutSummary />
            </div>
        </section>
    );
}
