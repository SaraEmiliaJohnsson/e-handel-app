import { useState } from 'react';
import { UseFirestoreData } from './UseFirestoreData';
import { Item } from '../../types';
import './SearchComponent.css';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/search.svg';

export const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState('');
    const { data, loading } = UseFirestoreData('category');
    const navigate = useNavigate();

    const filteredItems = query
        ? data.filter(
              (item) =>
                  item.name.toLowerCase().includes(query.toLowerCase()) ||
                  item.description.toLowerCase().includes(query.toLowerCase())
          )
        : [];

    if (loading) return <div className="search-container">Loading...</div>;

    const handleSearch = () => {
        setQuery(query);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleResultClick = (category: string, itemId: string) => {
        navigate(`/kategorier/${category}/produkt/${itemId}`);
        setQuery('');
    };

    return (
        <>
            <section className="search-container">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Sök..."
                    className="search-input"
                />

                <button type="button" title="Sök på en produkt" onClick={handleSearch} className="search-button">
                    <img src={searchIcon} alt="sök ikon" />
                </button>
                {query && (
                    <ul className="search-results">
                        {filteredItems.map((item: Item) => (
                            <li key={item.id} onClick={() => handleResultClick(item.category, item.id)}>
                                <h2>{item.name}</h2>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </>
    );
};
