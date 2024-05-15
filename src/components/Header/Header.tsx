import './Header.css'
import logo from '../../assets/logo.svg';

const Header = () => {
	return (
		<header className='header-container'>
			<div className='logo-container'><img src={logo} alt="Logo" className="logo" /><button>Home</button></div>
			<button>Produkter</button>
			<button>Logga in</button>
			<button>Kundkorg</button>
			</header>
	)
}

export default Header;