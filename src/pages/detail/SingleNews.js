import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../pages.css";

const SingleNews = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/news/get-news/${id}`);
        setNewsItem(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="single-news-container">
      <h2 className="single-news-title">{newsItem.title}</h2>
      <img 
        src={newsItem.imageUrl || "./assets/gcu-building.jpg"} 
        alt="News Thumbnail" 
        className="single-news-thumbnail"
      />
      <p className="single-news-date">{new Date(newsItem.date).toLocaleDateString()}</p>
      <p className="single-news-content">{newsItem.content}</p>
    </div>
  );
};

export default SingleNews;
