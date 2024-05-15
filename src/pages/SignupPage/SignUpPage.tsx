import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../config/firebase";
import './SignUpPage.css'



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
                    <h1 className="signup-heading">Registrera konto</h1>
                    <div>
                        <label>E-post:</label>
                        <input type="text" name="email" id="email" placeholder="E-post.." value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label>Lösenord:</label>
                        <input type="password" name="password" id="password" placeholder="Lösenord.." value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <br />

                    <div className="btn-container">
                        <button className="signup-btn" onClick={createUser}>Registrera</button>
                    </div>
                </section>
            </main>
        </>
    )
}