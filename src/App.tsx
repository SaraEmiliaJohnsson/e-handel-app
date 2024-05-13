import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ItemsListPage from './components/itemlist/ItemListPage';


function App() {
    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/produkter" element={<CategoryPage />} />
                    <Route path="/login" element={<LoginPage />} />
					<Route path="/kategori/:slug" element={<ItemsListPage/>} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
