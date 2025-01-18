import React, { useState, useEffect } from "react";
import api from "../../services/api";
import PostCard from "../../components/common/PostCard";
import { jwtDecode } from "jwt-decode";

const SimplifiedPostCard = ({ post, currentUser, onDelete }) => {
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await api.delete(`/posts/${post._id}`);
                // Refresh the page or update the posts list
                window.location.reload();
            } catch (err) {
                console.error("Error deleting post:", err);
            }
        }
    };

    return (
        <PostCard
            post={post}
            currentUser={currentUser}
            onDelete={handleDelete}
            dropdownOptions={['delete']}
        />
    );
};

const FlaggedPosts = () => {
    const [flaggedPosts, setFlaggedPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchFlaggedPosts = async () => {
            try {
                const response = await api.get('/admin/flagged-posts');
                setFlaggedPosts(response.data);
            } catch (err) {
                console.error("Error fetching flagged posts:", err);
            }
        };

        const token = localStorage.getItem("accessToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            setCurrentUser(decodedToken);
        }

        fetchFlaggedPosts();
    }, []);

    return (
        <div className="admin-flagposts-container">
            <div className="admin-flagposts-content">
                <h1 className="admin-flagposts-title">
                    Flagged Posts
                </h1>
                {flaggedPosts.length > 0 ? (
                    <div className="admin-flagposts-list">
                        {flaggedPosts.map((post) => (
                            <SimplifiedPostCard
                                key={post._id}
                                post={post}
                                currentUser={currentUser}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="admin-flagposts-empty text-center text-gray-500 mt-4">
                        No flagged posts found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FlaggedPosts;