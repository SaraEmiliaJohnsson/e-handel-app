import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../config/firebase";
import './SignUpPage.css'
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";



export const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const createUser = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, 'roles', user.uid), { role });

            console.log('User registered and role assigned');

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }

        } catch (error) {
            console.error('Error registering user', error);

        };
    }

    return (
        <>
            <main className="main-signup_container">
                <section className="signup-container">
                    <div className="heading-container">
                        <h1 className="signup-heading">Registrera konto</h1>
                        <p className="subheading">Registrera ett nytt konte genom att skriva in <br /> e-postadress och lösenord.</p> <img src={logo} alt="Logo" className="logo-login" />
                    </div>
                    <div className="input-group">
                        <label>E-post:</label>
                        <input type="text" name="email" id="email" placeholder="E-post.." value={email} onChange={(e) => setEmail(e.target.value)} />

                        <br />

                        <label>Lösenord:</label>
                        <input type="password" name="password" id="password" placeholder="Lösenord.." value={password} onChange={(e) => setPassword(e.target.value)} />

                        <div className="btn-container">
                            <button className="signup-btn" onClick={createUser}>Registrera</button>

                        </div>
                        <Link className="link" to='/login'>Tillbaka till logga in sidan</Link>
                    </div>
                    <br />


                </section>
            </main>
        </>
    )
}