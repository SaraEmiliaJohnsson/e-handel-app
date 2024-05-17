import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase";
import './SignUpPage.css'
import logo from '../../assets/logo.svg';
import { Link } from "react-router-dom";



export const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const createUser = async () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Inloggad', userCredential);

            })
            .catch((error) => {
                console.log(error.message);

            });
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