import fishIMG from '/landing_fish.webp';
import arrowIcon from '../../assets/arrow.svg';
import './HomePage.css';
import Categories from '../../components/Categories/Categories';
import { useRef } from 'react';
export default function HomePage() {
    const categoriesRef = useRef<HTMLDivElement | null>(null);

    const scrollToCategories = () => {
        categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className="landing-page">
            <div className="landing-page__content">
                <img className="landing-page__image" src={fishIMG} alt="Colerfull exotic fish" />
                <h1 className="landing-page__title">ShopQuarium</h1>
                <button className="landing-page__button" onClick={scrollToCategories} title="scroll-down" type="button">
                    <img src={arrowIcon} alt="" />
                </button>
            </div>
            <div className="landing-page__container" ref={categoriesRef}>
                <Categories />
            </div>
        </div>
    );
}
