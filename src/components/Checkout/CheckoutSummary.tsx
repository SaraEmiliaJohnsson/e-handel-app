import { useSelector } from 'react-redux';
import { selectTotalPrice } from '../../features/shoppingCartSlice';
export default function CheckoutSummary() {
    const totalPrice = useSelector(selectTotalPrice) as number;

    return (
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
    );
}
