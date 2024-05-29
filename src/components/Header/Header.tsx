import './Header.css';
import '../ShoppingCart/ShoppingCart.css';
import logo from '../../assets/logo.svg';
import shoppingCartIcon from '../../assets/shopping-cart.svg';
import hambugerIcon from '../../assets/hamburger.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../features/cartVisibilitySlice';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { RootState } from '../../main';
import { selectTotalItems } from '../../features/shoppingCartSlice';
import { SearchComponent } from '../SearchBar/SearchComponent';
import { HeaderProps } from '../../types';

const Header: React.FC<HeaderProps> = ({ userRole }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => state.shoppingCart);
    const location = useLocation();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 150);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('Utloggad');
            navigate('/');
        } catch (error) {
            console.error('Error logging out', error);
        }
    };
    const totalItems = useSelector(selectTotalItems);
    const isCartEmpty = cartItems.length === 0;
    const isAdminPath = location.pathname.startsWith('/admin');
    return (
        <header className="header-background">
            <nav className="header-container">
                <div className="logo-container">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link>
                </div>
                <SearchComponent />
                <ul className="header__list" role="list">
                    <li className="header__list--item">
                        <Link to="/" className="home-button">
                            Hem
                        </Link>
                    </li>
                    <li className="header__list--item">
                        <Link to="/kategorier" className="product-button">
                            Produkter
                        </Link>
                    </li>
                    {userRole === 'admin' && (
                        <li className="header__list--item">
                            <Link to="/admin" className="admin-button">
                                Admin
                            </Link>
                        </li>
                    )}   
                    <li className="header__list--item">
                        {isLoggedIn ? (
                            <button className="login-button" onClick={handleLogout}>
                                Logga ut
                            </button>
                        ) : (
                            <Link to="/login" className="login-button">
                                Logga in
                            </Link>
                        )}
                    </li>
                </ul>
                <div className="hamburger-menu">
                    <button
                        type="button"
                        title="öppna menyn"
                        onClick={() => setIsOpen(!isOpen)}
                        className="hamburger--btn"
                    >
                        <img src={hambugerIcon} alt="Hamburger menu" />
                    </button>
                    <div className={`menu ${isOpen ? 'open' : ''}`}>
                        <ul role="list">
                            <li>
                                <SearchComponent />
                            </li>
                            <li className="hambuger__nav--item">
                                <Link to="/" className="">
                                    Hem
                                </Link>
                            </li>
                            <li className="hambuger__nav--item">
                                <Link to="/kategorier">Produkter</Link>
                            </li>
                            {userRole === 'admin' && (
                                <li className="hambuger__nav--item">
                                    <Link to="/admin" className="admin-button">
                                        Admin
                                    </Link>
                                </li>
                            )} 
                            <li className="hambuger__nav--item">
                                {isLoggedIn ? (
                                    <button className="login-button" onClick={handleLogout}>
                                        Logga ut
                                    </button>
                                ) : (
                                    <Link to="/login">Logga in</Link>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="search-cart-container">
                    <button
                        type="button"
                        className={`cart-button ${isScrolled && !isAdminPath ? 'fixed' : ''}`}
                        onClick={() => dispatch(toggleCart())}
                    >
                        <span>
                            <img src={shoppingCartIcon} alt="kundkorg ikon" />
                        </span>
                        {!isCartEmpty && <span className="plus-icon">{totalItems}</span>}
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
