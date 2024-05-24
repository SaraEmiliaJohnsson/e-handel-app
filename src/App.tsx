import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ItemsListPage from './components/itemlist/ItemListPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SignUpPage } from './pages/SignupPage/SignUpPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import AdminViewPage from './pages/AdminviewPage/AdminViewPage';
import Header from './components/Header/Header';
import { FooterComponent } from './components/Footer/FooterComponent';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import { auth, db } from './config/firebase';
import ProtectedAdminRoute from './components/ProtectedAdminRoute/ProtectedAdminRoute';

function App() {
    return (
        <Router>
            <Header />
            <ShoppingCart />
            <main>
                <ProtectedAdminRoute auth={auth} db={db}>
                    {(role) => (
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/kategorier" element={<CategoryPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/kategori/:slug" element={<ItemsListPage />} />
                            {role === 'admin' ? <Route path="/admin" element={<AdminViewPage />} /> : null}
                            {/* error page? */}
                            <Route path="/kassa" element={<CheckoutPage />} />
                        </Routes>
                    )}
                </ProtectedAdminRoute>
            </main>
            <FooterComponent />
        </Router>
    );
}

export default App;
