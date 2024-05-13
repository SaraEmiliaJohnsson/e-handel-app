import { Link } from 'react-router-dom';
import './Categories.css';
export default function Categories() {
    const mockedCategories = [
        {
            name: 'Fiskar',
            slug: 'fisk',
            icon: 'fish.svg',
        },
        {
            name: 'Växter',
            slug: 'vaxt',
            icon: 'growth.svg',
        },
        {
            name: 'Mat',
            slug: 'mat',
            icon: 'food.svg',
        },
        {
            name: 'Akvarium',
            slug: 'akvarium',
            icon: 'aquarium.svg',
        },
        {
            name: 'Tillbehör',
            slug: 'tillbehor',
            icon: 'accessories.svg',
        },
        {
            name: 'Filter',
            slug: 'filter',
            icon: 'filter.svg',
        },
        {
            name: 'Belysning',
            slug: 'belysning',
            icon: 'light.svg',
        },
    ];
    return (
        <>
            <h2 className="categories__title">Kategorier</h2>
            <ul className="categories__list" role="list">
                {mockedCategories.map((category) => (
                    <li className="categories__item" key={category.name}>
                        <img src={`/landing-icons/${category.icon}`} alt="" />
                        <Link className="categories__link" to={`kategori/${category.slug}`}>
                            {category.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
