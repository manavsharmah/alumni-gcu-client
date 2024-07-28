import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';
import '../pages.css';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const newsPerPage = 7;
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPageFromQuery = parseInt(query.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(currentPageFromQuery);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/news/get-news');
        const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNews(sortedNews);

        // Check if there's selected news passed in the state
        if (location.state && location.state.selectedNews) {
          setSelectedNewsId(location.state.selectedNews);
          if (location.state.page) {
            setCurrentPage(location.state.page);
          }
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [location.state]);

  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  const handleTitleClick = (newsItem) => {
    setSelectedNewsId(selectedNewsId === newsItem._id ? null : newsItem._id);
  };

  const Pagination = ({ newsPerPage, totalNews, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalNews / newsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <a onClick={() => paginate(number)} href="#!" className='page-link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <div className="page-container">
      <div className="news-list">
        <div className="news-header">
          <h2>News Archive</h2>
        </div>
        {currentNews.map((newsItem) => (
          <div key={newsItem._id} className="news-item">
            <h3 onClick={() => handleTitleClick(newsItem)} className="news-title">
              {newsItem.title}
            </h3>
            {selectedNewsId === newsItem._id && (
              <div className="news-content">
                <p>{newsItem.content}</p>
                <small>{new Date(newsItem.date).toLocaleString()}</small>
              </div>
            )}
          </div>
        ))}
      <Pagination
        newsPerPage={newsPerPage}
        totalNews={news.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      </div>
    </div>
  );
};

export default NewsList;
