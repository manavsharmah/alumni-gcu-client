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
				const response = await axios.get(
					`http://localhost:5000/api/news/get-news/${id}`
				);
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
		<div className="main">
			<div className="single-news-events-container">
				<h2 className="single-news-events-title">
					<p className="single-news-events-date">
						{new Date(newsItem.date).toLocaleDateString()}
					</p>
					{newsItem.title}
				</h2>

				<div className="single-news-events-flex-container">
					<div className="single-news-events-content-section">
						<div className="single-news-events-content">
							{newsItem.content.split("\n").map((line, index) => (
								<React.Fragment key={index}>
									{line}
									<br />
								</React.Fragment>
							))}
						</div>
					</div>

					<div className="single-news-events-images-section">
						{newsItem.images && newsItem.images.length > 0 ? (
							newsItem.images.map((image, index) => (
								<div key={index} className="single-news-events-image-container">
									<img
										src={`http://localhost:5000${image}`}
										alt={`News Image ${index + 1}`}
										className="single-news-events-image"
									/>
								</div>
							))
						) : (
							<div className="single-news-events-image-container">
								<img
									src="/assets/gcu-building.jpg"
									alt="Default Thumbnail"
									className="single-news-events-image"
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleNews;
