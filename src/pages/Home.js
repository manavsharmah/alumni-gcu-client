import React, { useState } from 'react';
import './pages.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsCard from '../components/common/NewsCard';
import EventCard from '../components/common/EventsCard';
import GalleryPreview from "../components/common/GalleryPreview";
import { useUser } from '../services/UserContext';

const Home = () => {
    const { user } = useUser();
    // const [currentSlide, setCurrentSlide] = useState(0);

    // const officeBearers = [
    //     {
    //         name: "Office Bearer 1",
    //         position: "President",
    //         image: "./assets/gcuregistrar.jpg"
    //     },
    //     {
    //         name: "Office Bearer 2",
    //         position: "Secretary",
    //         image: "./assets/gcuregistrar.jpg"
    //     },
    //     {
    //         name: "Office Bearer 3",
    //         position: "Treasurer",
    //         image: "./assets/gcuregistrar.jpg"
    //     }
    // ];

    // const nextSlide = () => {
    //     setCurrentSlide((prevSlide) =>
    //         prevSlide === officeBearers.length - 1 ? 0 : prevSlide + 1
    //     );
    // };

    // const prevSlide = () => {
    //     setCurrentSlide((prevSlide) =>
    //         prevSlide === 0 ? officeBearers.length - 1 : prevSlide - 1
    //     );
    // };


    return (
        <div className='main'>
            <section className="hero">
                <div className="left-box">
                    <h2>Welcome to the GCU Alumni Association</h2>
                    <p>A registered body of the Alumni members of the Girijananda Chowdhury University where you can connect with fellow members and alumnus</p>
                    <br/>
                    {!user && ( // Conditionally render the register button
                        <a href="/register">
                            <button className="button">REGISTER</button>
                        </a>
                    )}
                </div>
                <div className="right-box">
                    <img src="./assets/gcu-building.jpg" alt="GCU Campus" />
                </div>
            </section>

            <section className='hero8'>
                <div className='ch-image'>
                    <img src="./assets/Pres-img-ssa.jpg" alt="SSA President" className='vc-img'/>
                </div>
                <div className='pres-text'>
                    <h2 className='ch-heading'>Message from the President</h2>
                    <br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sint animi placeat dolorum dolores iure molestiae? Asperiores, ea.</p>
                    <p className='pres-name'>Shri. Jasoda Ranjan Das
                        <br />
                        President of SSA Society
                    </p>
                </div>
                
            </section>


            <section className='hero5'>
                <div className='ch-text'>
                    <h2 className='ch-heading'>Message from the Chancellor</h2>
                    <br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sint animi placeat dolorum dolores iure molestiae? Asperiores, ea.</p>
                    <p className='ch-name'>Prof. Jayanta Deka
                        <br />
                        Chancellor of Girijananda Chowdhury University
                    </p>
                </div>
                <div className='ch-image'>
                    <img src="./assets/jayanta-sir.jpg" alt="GCU Chancellor" className='vc-img'/>
                </div>
            </section>


            <section className='hero2'>
                <div className='vc-image'>
                    <img src="./assets/vc-gcu.jpg" alt="GCU Vice Chancellor" className='vc-img'/>
                </div>
                <div className='vc-text'>
                    <h2 className='vc-heading'>Message from the Vice Chancellor</h2>
                    <br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sint animi placeat dolorum dolores iure molestiae? Asperiores, ea.</p>
                    <p className='vc-name'>Prof. Kandarpa Das
                        <br />
                        Vice Chancellor of Girijananda Chowdhury University
                    </p>
                </div>
            </section>


            <section className='hero6'>
                <div className='reg-text'>
                    <h2 className='vc-heading'>Message from the Registrar</h2>
                    <br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sint animi placeat dolorum dolores iure molestiae? Asperiores, ea.</p>
                    <p className='vc-name'>Dr. Dipankar Saha
                        <br />
                        Registrar of Girijananda Chowdhury University
                    </p>
                </div>
                <div className='vc-image'>
                    <img src="./assets/gcuregistrar.jpg" alt="GCU Registrar" className='vc-img'/>
                </div>
            </section>

            <section className='hero3'>
                <div className="news-events-container">
                    <NewsCard />
                    <EventCard />
                </div>
            </section>

            {/* <section className="office-bearers-carousel">
                <h2 className="text-center mb-4">Meet the Office Bearers</h2>

                <div className="carousel-container">
                    <button className="carousel-control prev" onClick={prevSlide}>
                        &#10094;
                    </button>

                    <div className="carousel-slide">
                        {officeBearers.map((bearer, index) => (
                            <div
                                className={`carousel-item hero6 ${
                                    index === currentSlide ? "active" : ""
                                }`}
                                key={index}
                                style={{ display: index === currentSlide ? "flex" : "none" }}
                            >
                                <div className="office-bearer-image">
                                    <img src={bearer.image} alt={bearer.name} className="vc-img" />
                                </div>
                                <div className="office-bearer-text">
                                    <h3>{bearer.name}</h3>
                                    <p>{bearer.position}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-control next" onClick={nextSlide}>
                        &#10095;
                    </button>
                </div>
            </section> */}
            
            <section className='hero4'> {/* New section for gallery preview */}
                <GalleryPreview />
            </section>
        </div>
    );
};

export default Home;

