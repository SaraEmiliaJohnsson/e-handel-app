import './Header.css'
import logo from '../../assets/logo.svg';

const Header = () => {
	return (
		<header className='header-container'>
			<div className='logo-container'><img src={logo} alt="Logo" className="logo" /><button className='home-button'>Home</button></div>
			<button className='home-button'>Produkter</button>
			<button className='home-button'>Logga in</button>
			<button className='home-button'>Kundkorg</button>
			</header>
	)
}

export default Header;