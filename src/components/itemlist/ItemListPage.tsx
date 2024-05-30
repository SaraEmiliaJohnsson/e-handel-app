import React from 'react';
import ItemList from '../../components/itemlist/ItemList';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './ItemsList.css';
import backarrow from '../../assets/backarrow.svg';

const ItemsListPage: React.FC = () => {
    const { slug } = useParams<string>();
    const navigate = useNavigate();
    const handleResultClick = (category: string, itemId: string) => {
        navigate(`/kategorier/${category}/produkt/${itemId}`);
    };
    return (
        <div className="centered-container">
            <Link to="/kategorier" className="back-button">
                <img src={backarrow} alt="back arrow" />
            </Link>
            <h1 className="shop-header">{slug}</h1>
            <ItemList collectionPath={`category/${slug}/items`} onItemClicked={handleResultClick} />
        </div>
    );
};

export default ItemsListPage;
