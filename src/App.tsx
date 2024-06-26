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
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import OrderPage from './pages/OrderPage/OrderPage';
import ProductDetailPage from './components/SearchBar/ProductDetailsPage';

function App() {
    return (
        <Router>
            <ProtectedAdminRoute auth={auth} db={db}>
                {(role) => (
                    <>
                        <Header userRole={role} />
                        <ShoppingCart />
                        <main>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/kategorier" element={<CategoryPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/signup" element={<SignUpPage />} />
                                <Route path="/kategorier/:slug" element={<ItemsListPage />} />
                                <Route path="/kategorier/:slug/produkt/:itemId" element={<ProductDetailPage />} />
                                {role === 'admin' && <Route path="/admin" element={<AdminViewPage />} />}
                                <Route path="/kassa" element={<CheckoutPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                                <Route path="/order/:orderId" element={<OrderPage />} />
                            </Routes>
                        </main>
                        <FooterComponent />
                    </>
                )}
            </ProtectedAdminRoute>
        </Router>
    );
}

export default App;
