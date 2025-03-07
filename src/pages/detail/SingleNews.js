import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "../pages.css";
import Spinner from "../../components/common/LoadingSpinner";
import api from "../../services/api";


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const SingleNews = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [newsItem, setNewsItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [photoIndex, setPhotoIndex] = useState(0);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const response = await api.get(
					`/news/get-news/${id}`
				);

				// Check if response data is null or empty
				if (!response.data || Object.keys(response.data).length === 0) {
					navigate("/404", { replace: true });
					return;
				}

				setNewsItem(response.data);
				setLoading(false);
			} catch (err) {
				// Handle specific error status codes
				if (err.response) {
					switch (err.response.status) {
						case 404:
							navigate("/404", { replace: true });
							return;
						case 500:
							navigate("/server-error", { replace: true });
							return;
						default:
							setError(err.message);
					}
				} else {
					// Network errors or other issues
					setError(err.message);
				}
				setLoading(false);
			}
		};

		fetchNews();
	}, [id, navigate]);

	if (loading)
		return (
			<div>
				<Spinner />
			</div>
		);
	if (error) return <p>{error}</p>;
	if (!newsItem) return null;

	const hasImages = newsItem.images && newsItem.images.length > 0;
	const slides = hasImages
		? newsItem.images.map((image) => ({
				src: `${BASE_URL}${image}`,
		  }))
		: [];

	return (
		<div className="main">
			<div className="single-news-events-container">
				<h2 className="single-news-events-title">
					<p className="single-news-events-date">
						{new Date(newsItem.date).toLocaleDateString()}
					</p>
					{newsItem.title}
				</h2>

				<div
					className={`single-news-events-flex-container ${
						!hasImages ? "no-images" : ""
					}`}
				>
					<div
						className={`single-news-events-content-section ${
							!hasImages ? "full-width" : ""
						}`}
					>
						<div className="single-news-events-content">
							{newsItem.content.split("\n").map((line, index) => (
								<React.Fragment key={index}>
									{line}
									<br />
								</React.Fragment>
							))}
						</div>
					</div>
					{hasImages && (
						<div className="single-news-events-images-section">
							{newsItem.images.map((image, index) => (
								<div 
									key={index} 
									className="single-news-events-image-container"
									onClick={() => {
										setPhotoIndex(index);
										setIsOpen(true);
									}}
									style={{ cursor: 'pointer' }}
								>
									<img
										src={`${BASE_URL}${image}`}
										alt={`News Image ${index + 1}`}
										className="single-news-events-image"
									/>
									<div className="image-overlay">
										<span>Click to enlarge</span>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
				{hasImages && (
					<Lightbox
						open={isOpen}
						close={() => setIsOpen(false)}
						slides={slides}
						index={photoIndex}
						plugins={[Thumbnails, Fullscreen, Zoom, Download]}
						thumbnails={{
							position: "bottom",
							width: 120,
							height: 80,
							gap: 16,
							imageFit: "contain",
						}}
						zoom={{
							maxZoomPixelRatio: 3,
							scrollToZoom: true,
						}}
						on={{
							view: ({ index }) => setPhotoIndex(index),
						}}
						styles={{
							container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default SingleNews;
