import './Header.css';
import '../ShoppingCart/ShoppingCart.css'
import logo from '../../assets/logo.svg';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const toggleCart = () => {
		console.log('toggle cart', isCartOpen);
		setIsCartOpen(!isCartOpen);
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
			<Link to="/login" className='login-button'>Logga in</Link>
			<button onClick={toggleCart} className='cart-button'>Kundkorg</button>
			<ShoppingCart/>
			</header>
			</header>
	)
}

export default Header;