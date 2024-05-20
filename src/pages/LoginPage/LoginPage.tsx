import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from "../../config/firebase";
import './LoginPage.css'
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.svg';




export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const signInUser = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const roleDocRef = doc(db, 'roles', user.uid);
            const roleDoc = await getDoc(roleDocRef);
            const roleData = roleDoc.data();

            if (roleData && roleData.role) {
                if (roleData.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/')
                }
            } else {
                console.error('User role data is not found or invalid');
            }


        } catch (error) {
            console.error('Error signing in', error);

        }


    };

    return (
        <>
            <main className="main-login_container">
                <section className="login-container">
                    <div className="heading-container">
                        <h1 className="login-heading">Logga In</h1>
                        <p className="subheading">Vänligen logga in med din e-postadress och lösenord.</p> <img src={logo} alt="Logo" className="logo-login" />
                    </div>

                    <div className="input-group">
                        <label>E-post:</label>
                        <input type="text" name="email" id="email" placeholder="E-post.." value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <label>Lösenord:</label>
                        <input type="password" name="password" id="password" placeholder="Lösenord.." value={password} onChange={(e) => setPassword(e.target.value)} />

                        <div className="btn-container">
                            <button className="login-btn" onClick={signInUser}>Logga in</button>
                        </div>


                        <Link className="link" to='/signup'>Registrera nytt konto</Link>

                    </div>






                </section>
            </main>
        </>
    )
}