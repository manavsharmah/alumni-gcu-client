import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/api';

const NewsList = () => {
  const [news, setNews] = useState([]);

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

  return (
    <div className="container" >
        <div className='row justify-content-center'>
        <div className='col-md-6 col-10'>
            <h2 className='title'>News </h2>
            <div class="card">
                <div className='card-body'>
                {/* <h2 className='card-title text-center'>Top Alumni in the Lime Light</h2> */}
                <div>
                  <ul>
                    {news.map((newsItem) => (
                      <li key={newsItem._id}>
                        <h3>{newsItem.title}</h3>
                        <p>{newsItem.content}</p>
                        <small>{new Date(newsItem.date).toLocaleString()}</small>
                      </li>
                    ))}
                  </ul>                
                </div>         
            </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default NewsList;