import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../../config/firebase";
import './LoginPage.css'



export const LoginPage = () => {
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

    const signInUser = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Inloggad', userCredential);
            })
            .catch((error) => {
                console.log(error.message);

            });
    }

    return (
        <>
            <main className="main-login_container">
                <section className="login-container">
                    <h1 className="login-heading">Logga In</h1>
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

                    <button className="login-btn" onClick={signInUser}>Logga in</button>
                    <button className="signup-btn" onClick={createUser}>Registrera</button>

                </section>
            </main>
        </>
    )
}