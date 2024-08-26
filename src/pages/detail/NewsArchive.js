import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../pages.css';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news/get-news');
        setNews(response.data);
        // console.log('Fetched news:', response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => {
    console.log('Paginating to:', pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleNewsClick = (newsItem) => {
    navigate(`/news/${newsItem._id}`);
  };

  const totalPages = Math.ceil(news.length / newsPerPage);
  
  return (
    <div className="news-container">
      <h2 className="news-title">News Category</h2>
      <div className="news-list">
        {currentNews.map((newsItem) => (
          <div key={newsItem._id} className="news-item" onClick={() => handleNewsClick(newsItem)}>
            <div className="news-thumbnail">
              <img src={newsItem.imageUrl || "./assets/gcu-building.jpg"} alt="News Thumbnail" />
            </div>
            <div className="news-content">
              <h3 className="news-headline">{newsItem.title}</h3>
              <p className="news-date">{new Date(newsItem.date).toLocaleDateString()}</p>
              <p className="news-summary">{newsItem.content.substring(0, 100)}...</p>
              <button className="read-more-btn">Read More</button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-number ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NewsList;