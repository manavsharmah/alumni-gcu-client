import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components.css";
import api from "../../services/api";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const NewsCard = () => {
    const [news, setNews] = useState([]);
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const navigate = useNavigate();
    const rotationInterval = 25000; // Rotation interval in milliseconds (5 seconds)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await api.get('/news/get-news');
                const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setNews(sortedNews);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
        }, rotationInterval);

        return () => clearInterval(interval);
    }, [news]);

    const handleNewsClick = (newsItem) => {
        navigate(`/news/${newsItem._id}`);
    };
    

    if (news.length === 0) return null;

    const currentNews = news[currentNewsIndex];

    return (
        <div className="news-card-container">
            <h2 className='news-event-title'>NEWS</h2>
            <div className="news-card" onClick={() => handleNewsClick(currentNews)}>
                {currentNews.images && currentNews.images.length > 0 ? (
					<img
					    src={`${BASE_URL}${currentNews.images[0]}`}
					    alt="News Thumbnail"
                        className="news-card-thumbnail"
					/>
					) : (
						<img src="./assets/gcu-building.jpg" alt="Default Thumbnail" className="news-card-thumbnail"/>
				)}
                <div className="news-card-content">
                    <span className="news-card-label">News</span>
                    <h3 className="news-card-title">{currentNews.title}</h3>
                    <p className="news-card-date">{new Date(currentNews.date).toLocaleDateString()}</p>
                </div>
            </div>
            <span className="read-more-span" onClick={() => navigate('/news')}>
                Read more news &#8594;
            </span>
        </div>
    );    
};

export default NewsCard;
