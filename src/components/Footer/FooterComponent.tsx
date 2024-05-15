import { useState } from 'react'
import './FooterComponent.css'


export const FooterComponent = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleContent = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    }

    return (
        <>
            <section className='footer-container'>
                <div className='inside-footer_container'>
                    <article className={`hitta-hit ${activeIndex === 0 ? 'active' : ''}`}>
                        <h5 onClick={() => toggleContent(0)}>Hitta hit:</h5>
                        <p>Hörjavägen 2 <br />
                            28234 Tyringe</p>
                    </article>
                    <article className={`opening-hours ${activeIndex === 1 ? 'active' : ''}`}><h5 onClick={() => toggleContent(1)}>Öppettider</h5>
                        <p>Onsdag: 11:00 - 18:00
                            <br />
                            Torsdag: 11:00 - 18:00
                            <br />
                            Fredag: 11:00 - 18:00
                            <br />
                            Lördag: 11:00 - 14:00</p>
                    </article>
                    <article className={`kund ${activeIndex === 2 ? 'active' : ''}`}>
                        <h5 onClick={() => toggleContent(2)}>Kundtjänst:</h5>
                        <p> <a href="mailto:kontakt@shopquarium.se">kontakt@shopquarium.se</a>
                            <br />
                            Tel: <a href="tel:0451 12 114">0451 12 114</a>
                        </p>
                    </article>
                </div>
            </section >
        </>
    )
}