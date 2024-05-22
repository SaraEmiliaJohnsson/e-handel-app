import { getAuth } from 'firebase/auth';

export default function CheckoutDetails() {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    return (
        <form className="checkout-form">
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
                    disabled={user?.email ? true : false}
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
    );
}
