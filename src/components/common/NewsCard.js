import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const NewsCard = () => {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

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

    const handleNewsClick = async (id) => {
        try {
            const response = await api.get(`/news/get-news/${id}`);
            navigate('/news-archive', { state: { newsItem: response.data } });
        } catch (error) {
            console.error('Error fetching single news item:', error);
        }
    };

    return (
        <div className="news-cards">
            <h2>NEWSROOM</h2>
            <ul>
                {news.map(newsItem => (
                    <li key={newsItem._id} onClick={() => handleNewsClick(newsItem._id)}>
                        <span className="news-title"><strong>{newsItem.title}</strong></span>
                        <span className="news-date">{new Date(newsItem.date).toLocaleDateString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsCard;
