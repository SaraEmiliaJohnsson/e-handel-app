import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ItemsListPage from './components/itemlist/ItemListPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SignUpPage } from './pages/SignupPage/SignUpPage';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import AdminViewPage from './pages/AdminviewPage/AdminViewPage';


function App() {
    return (
        <Router>
            <ShoppingCart />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/produkter" element={<CategoryPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/kategori/:slug" element={<ItemsListPage />} />
                    <Route path="/admin" element={<AdminViewPage />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
