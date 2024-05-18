import './CheckoutPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { close } from '../../features/cartVisibilitySlice';
import { RootState } from '../../main';
import CheckoutItem from '../../components/Checkout/CheckoutItem';
import { selectTotalPrice } from '../../features/shoppingCartSlice';
export default function CheckoutPage() {
    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
    const dispatch = useDispatch();
    const totalPrice = useSelector(selectTotalPrice) as number;

    dispatch(close());

    return (
        <section className="checkout">
            <h1 className="checkout__title">Din beställning</h1>
            <ul className="checkout__list" role="list">
                {shoppingCart.map((item) => (
                    <CheckoutItem key={item.id} item={item} />
                ))}
            </ul>
            <hr className="checkout__devider" />
            {/* Move this code to CheckoutSummary.tsx */}
            <div className="checkout__summary">
                <dl className="checkout__summary-list">
                    <div className="checkout__summary-item">
                        <dt className="checkout__summary-term">Delsumma</dt>
                        <dd className="checkout__summary-description">{Math.round(totalPrice * 0.75)} kr</dd>
                    </div>
                    <div className="checkout__summary-item">
                        <dt className="checkout__summary-term">Moms</dt>
                        <dd className="checkout__summary-description">{Math.round(totalPrice * 0.25)} kr</dd>
                    </div>
                    <div className="checkout__summary-item checkout__summary-item--total ">
                        <dt className="checkout__summary-term">Total</dt>
                        <dd className="checkout__summary-description">{totalPrice} kr</dd>
                    </div>
                </dl>
                <button className="checkout__button" type="button">
                    Slutför köp
                </button>
            </div>
        </section>
    );
}
