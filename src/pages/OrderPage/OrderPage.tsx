import './OrderPage.css';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Order } from '../../types';

export default function OrderPage() {
    const { orderId } = useParams<string>();
    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    const [order, setOrder] = useState<Order | null>(null);
    useEffect(() => {
        if (!user) navigate('/login');

        const getOrder = async () => {
            const docRef = doc(db, `roles/${user?.uid}/orders`, orderId as string);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                navigate('/');
                return;
            }
            setOrder(docSnap.data() as Order);
        };
        getOrder();
    }, [orderId, user, navigate]);
    return (
        <>
            {order && (
                <section className="order">
                    <h1 className="order__title">Tack för din beställning!</h1>
                    <hr className="order__devider devider " />
                    <div className="order__details">
                        <div className="order__details-container">
                            <h2 className="order__subtitle">Din order</h2>
                            <p className="order__id">Ordernummer: {orderId}</p>
                        </div>
                        <hr className="order__devider devider " />
                        <ul className="order__list" role="list">
                            {order.item.map((item) => (
                                <li className="order__item" key={item.id}>
                                    <span className="order__item-quantity">{item.quantity}x</span>
                                    <span className="order__item-name">{item.name}</span>
                                    <span className="order__item-price">{item.price} kr</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr className="order__devider devider " />
                    <div className="order__total">
                        <p className="order__total-text">Totalt:</p>
                        <p className="order__total-price">{order.totalPrice} kr</p>
                    </div>
                    <hr className="order__devider devider " />
                    <div className="order__delivery">
                        <p className="order__delivery-text">
                            Din beställning kommer att levereras till{' '}
                            <span className="order__delivery-address">
                                {order.address} {order.zipCode}
                            </span>{' '}
                            och den beräknas vara framme {new Date(order.estimated_delivery).toLocaleDateString()}.
                        </p>
                    </div>
                </section>
            )}
        </>
    );
}
