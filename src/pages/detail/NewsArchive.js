import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../services/api';
import '../pages.css';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const newsPerPage = 7;
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page')) || 1;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/news/get-news');
        setNews(response.data);
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
    navigate(`?page=${pageNumber}`);
  };

  return (
    <div className="news-container">
      <div className='row justify-content-center'>
        <div className='col-md-6 col-10'>
          <h2 className='title'>News</h2>
          <div className="card">
            <div className='card-body'>
              <ul>
                {currentNews.map((newsItem) => (
                  <li key={newsItem._id}>
                    <h3>{newsItem.title}</h3>
                    <p>{newsItem.content}</p>
                    <small>{new Date(newsItem.date).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
              <Pagination
                newsPerPage={newsPerPage}
                totalNews={news.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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

export default NewsList;
