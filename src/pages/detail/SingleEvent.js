import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages.css";

const SingleEvent = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [eventItem, setEventItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/events/get-event/${id}`
				);
				
				if (!response.data || Object.keys(response.data).length === 0) {
					navigate('/404', { replace: true });
					return;
				}
				
				setEventItem(response.data);
				setLoading(false);
			} catch (err) {
				if (err.response) {
					switch (err.response.status) {
						case 404:
							navigate('/404', { replace: true });
							return;
						case 500:
							navigate('/server-error', { replace: true });
							return;
						default:
							setError(err.message);
					}
				} else {
					setError(err.message);
				}
				setLoading(false);
			}
		};

		fetchEvent();
	}, [id, navigate]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!eventItem) return null;

	return (
		<div className="main">
			<div className="single-news-events-container">
				<h2 className="single-news-events-title">
					<p className="single-news-events-date">
						Posted on: {new Date(eventItem.posted_date).toLocaleDateString()}
					</p>
					{eventItem.title}
				</h2>

				<div className="single-news-events-flex-container">
					<div className="single-news-events-content-section">
						<div className="single-news-events-content">
							{eventItem.content.split("\n").map((line, index) => (
								<React.Fragment key={index}>
									{line}
									<br />
								</React.Fragment>
							))}
						</div>
					</div>

					<div className="single-news-events-images-section">
						{eventItem.images && eventItem.images.length > 0 ? (
							eventItem.images.map((image, index) => (
								<div key={index} className="single-news-events-image-container">
									<img
										src={`http://localhost:5000${image}`}
										alt={`Events Image ${index + 1}`}
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

export default SingleEvent;
