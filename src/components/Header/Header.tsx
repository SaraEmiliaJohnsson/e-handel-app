import './Header.css'
import logo from '../../assets/logo.svg';

const Header = () => {
	return (
		<header className='header-container'>
			<div className='logo-container'><img src={logo} alt="Logo" className="logo" /><button className='home-button'>Home</button></div>
			<button className='product-button'>Produkter</button>
			<button className='login-button'>Logga in</button>
			<button className='cart-button'>Kundkorg</button>
			</header>
	)
}

export default Header;