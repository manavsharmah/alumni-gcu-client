import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../pages.css';
import Pagination from '../../components/common/Pagination';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news/get-news');
        const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNews(sortedNews);
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
    <div className='main'>
      <div className="news-container">
        <div className="about-header">
          <h1>News</h1>
        </div>
        <div className="news-list">
          {currentNews.map((newsItem) => (
            <div key={newsItem._id} className="news-item" onClick={() => handleNewsClick(newsItem)}>
              <div className="news-thumbnail">
                {newsItem.firstImage && newsItem.firstImage.length > 0 ? (
                  <img
                    src={`http://localhost:5000${newsItem.firstImage}`}
                    alt="News Thumbnail"
                  />
                ) : (
                  <img src="./assets/gcu-building.jpg" alt="Default Thumbnail" />
                )}
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
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={paginate}
            stylePrefix="news"
          />
        </div>
      </div>
  );
};

export default NewsList;