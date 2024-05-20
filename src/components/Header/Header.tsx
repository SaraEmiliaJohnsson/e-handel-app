import './Header.css';
import '../ShoppingCart/ShoppingCart.css'
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleCart } from '../../features/cartVisibilitySlice';

const Header = () => {
    const dispatch = useDispatch();
	


	return (
		<header className='header-background'>
		<header className='header-container'>
			<div className='logo-container'>
				<Link to="/">
					<img src={logo} alt="Logo" className="logo" />
					</Link>
					</div>
					<Link to="/" className='home-button'>Hem</Link>
			<Link to="/kategorier" className='product-button'>Produkter</Link>
			<Link to="/login" className='login-button'>Logga in</Link>
			<button type="button" className='cart-button' onClick={() => dispatch(toggleCart())}>Kundkorg</button>
			</header>
			</header>
	)
}

export default Header;