import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { RootState } from '../../main';
import { useDispatch, useSelector } from 'react-redux';
import type { OrderItem, Order } from '../../types';
import { clearCart, selectTotalPrice } from '../../features/shoppingCartSlice';

export default function CheckoutDetails() {
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;
    const dispatch = useDispatch();
    const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
    const totalPrice = useSelector(selectTotalPrice) as number;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        const estimatedDelivery = new Date();

        const items: OrderItem[] = shoppingCart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            name: item.name,
            price: item.price,
        }));
        const order: Order = {
            name: formJson['checkout-fName'] + ' ' + formJson['checkout-lName'],
            email: formJson['checkout-email'] as string,
            address: formJson['checkout-adress'] as string,
            zipCode: formJson['checkout-zipCode'] as string,
            status: 'paketeras',
            created_at: serverTimestamp(),
            updated_at: serverTimestamp(),
            estimated_delivery: estimatedDelivery.setDate(estimatedDelivery.getDate() + 3),
            item: items,
            totalPrice: totalPrice,
        };

        const docRef = await addDoc(collection(db, `roles/${user?.uid as string}/orders`), order);
        dispatch(clearCart());
        navigate(`/order/${docRef.id}`);
    };
    return (
        <>
            {shoppingCart.length === 0 ? (
                ''
            ) : user ? (
                <form onSubmit={handleSubmit} className="checkout-form">
                    <label htmlFor="checkout-fName" className="checkout-form__label">
                        Förnamn
                        <input
                            type="text"
                            id="checkout-fName"
                            name="checkout-fName"
                            className="checkout-form__input"
                            title="Fyll i ditt förnamn"
                            required
                        />
                    </label>
                    <label htmlFor="checkout-lName" className="checkout-form__label">
                        Efternamn
                        <input
                            type="text"
                            id="checkout-lName"
                            name="checkout-lName"
                            className="checkout-form__input"
                            title="Fyll i ditt efternamn"
                            required
                        />
                    </label>
                    <label htmlFor="checkout-email" className="checkout-form__label">
                        Email
                        <input
                            type="email"
                            id="checkout-email"
                            name="checkout-email"
                            value={user?.email as string}
                            readOnly={user?.email ? true : false}
                            className="checkout-form__input"
                            title="Fyll i din email"
                            required
                        />
                    </label>
                    <div>
                        <label htmlFor="checkout-adress" className="checkout-form__label">
                            Address
                            <input
                                type="text"
                                id="checkout-adress"
                                name="checkout-adress"
                                className="checkout-form__input"
                                title="Fyll i ditt Address"
                                required
                            />
                        </label>
                        <label htmlFor="checkout-zipCode" className="checkout-form__label">
                            Postnummer
                            <input
                                type="number"
                                id="checkout-zipCode"
                                name="checkout-zipCode"
                                className="checkout-form__input"
                                title="Fyll i ditt postnummer"
                                required
                            />
                        </label>
                    </div>
                    <button className="checkout__button" type="submit">
                        Bekräfta köp
                    </button>
                </form>
            ) : (
                <p>
                    <Link className="login-link" to={'/login'}>
                        Logga in
                    </Link>{' '}
                    för att fortsätta
                </p>
            )}
        </>
    );
}
