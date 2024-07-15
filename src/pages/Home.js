import React, { useEffect, useState } from 'react';
import './pages.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/api';

const Home = () => {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:5000/api/news/get-news');
                const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setNews(sortedNews.slice(0, 6)); // Keep only the latest 6 news items
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    const handleNewsClick = (newsItem) => {
        navigate('/news-archive', { state: newsItem });
    };

    return (
        <div className='main'>
            <section className="hero">
                <div className="left-box">
                    <h2>Welcome to the GCU Alumni Association</h2>
                    <p>A registered body of the Alumni members of the Girijananda Chowdhury University where you can connect with fellow members and alumnus</p>
                    <br/>
                    <a href="/register">
                        <button className="button">REGISTER</button>
                    </a>
                </div>
                <div className="right-box">
                    <img src="./assets/gcu-building.jpg" alt="GCU Campus" />
                </div>
            </section>

            <section className='hero2'>
                <div className='vc-text'>
                    <h2 className='vc-heading'>Message from the Vice Chancellor</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sint animi placeat dolorum dolores iure molestiae? Asperiores, ea.</p>
                </div>
                <div className='vc-image'>
                    <img src="./assets/vc-gcu.jpg" alt="GCU Vice Chancellor" className='vc-img'/>
                </div>
            </section>

            <section className='hero3'>
                <div className="newsroom">
                    <div className="news-cards">
                        <h2>NEWSROOM</h2>
                        <ul>
                            {news.map(newsItem => (
                                <li key={newsItem._id} onClick={() => navigate('/news-archive', { state: newsItem })}>
                                <span className="news-title">{newsItem.title}</span>
                                <span className="news-date">{new Date(newsItem.date).toLocaleDateString()}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className="events">
                        <div className='events-cards'>
                            <h2>EVENTS</h2>
                            <p>No Upcoming Events</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;





              /* <div className="news-cards">
                  {news.map(newsItem => (
                      <div key={newsItem._id} className="news-card" onClick={() => handleNewsClick(newsItem)}>
                          <h3>{newsItem.title}</h3>
                          <p className="news-date">{newsItem.date}</p>
                          <p className="news-details">{newsItem.details.substring(0, 100)}...</p>
                      </div>
                  ))}
              </div> */
