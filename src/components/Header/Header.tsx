import './Header.css';
import '../ShoppingCart/ShoppingCart.css'
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleCart } from '../../features/cartVisibilitySlice';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

const Header = () => {
	const dispatch = useDispatch();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsLoggedIn(!!user);
		});

		return () => unsubscribe();
	}, []);

	const handleLogout = async () => {
		try {
			await signOut(auth);
			console.log('Utloggad');
			navigate('/');

		} catch (error) {
			console.error('Error logging out', error);
		}
	};


	return (
		<header className='header-background'>
			<header className='header-container'>
				<div className='logo-container'>
					<Link to="/">
						<img src={logo} alt="Logo" className="logo" />
					</Link>
				</div>
				<Link to="/" className='home-button'>Hem</Link>
				<Link to="/kategori/fish" className='product-button'>Produkter</Link>
				{isLoggedIn ? (
					<button className='login-button' onClick={handleLogout}>Logga ut</button>
				) : (
					<Link to="/login" className='login-button'>Logga in</Link>
				)}

				<button type="button" className='cart-button' onClick={() => dispatch(toggleCart())}>Kundkorg</button>
			</header>
		</header>
	)
}

export default Header;