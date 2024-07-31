import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components.css";

const NewsCard = () => {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();
    const newsPerPage = 7; // Make sure this matches the value in NewsList

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/news/get-news');
                const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setNews(sortedNews);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    const handleNewsClick = (newsItem) => {
        // Calculate the page number where the newsItem is located
        const index = news.findIndex(item => item._id === newsItem._id);
        const pageNumber = Math.floor(index / newsPerPage) + 1;
        navigate('/news-archive', { state: { selectedNews: newsItem._id, page: pageNumber } });
    };

    const truncateTitle = (title, wordLimit) => {
        const words = title.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return title;
    };

    return (
        <div className="news-cards">
            <h2>NEWSROOM</h2>
            <ul>
                {news.map(newsItem => (
                    <li key={newsItem._id} onClick={() => handleNewsClick(newsItem)}>
                        <span className="news-title"><strong>{truncateTitle(newsItem.title, 20)}</strong></span>
                        <span className="news-date">{new Date(newsItem.date).toLocaleDateString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsCard;
