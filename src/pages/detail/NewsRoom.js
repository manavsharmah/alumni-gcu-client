import React from "react";
import { useLocation } from "react-router-dom";
import Article from "../../components/common/Article-container";
import NewsCard from "../../components/common/NewsCard";

const NewsRoom = () => {
    const { state } = useLocation();
    const newsItem = state?.newsItem;

    if (!newsItem) {
        return <div>No news item found</div>;
    }

    return (
        <div className="page-container">
            <Article title={newsItem.title}>
                <p>{newsItem.content}</p>
                <span>{new Date(newsItem.date).toLocaleDateString()}</span>
            </Article>
            <NewsCard/>
        </div>
    );
};

export default NewsRoom;
