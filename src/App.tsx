import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import FishPage from './pages/FishPage/FishPage';
import AquariumPage from './pages/AquariumPage/AquariumPage';


function App() {
    return (
        <Router>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/produkter" element={<CategoryPage />} />
                    <Route path="/login" element={<LoginPage />} />
					          <Route path="/fish" element={<FishPage/>} />
					          <Route path="/aquarium" element={<AquariumPage/>} />

                </Routes>
            </main>
        </Router>
    );
}

export default App;
