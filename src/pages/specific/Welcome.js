import React, { useState, useEffect } from "react";
import api from "../../services/api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PostForm from "../../components/forms/PostForm";
import PostList from "../../components/common/PostList";
import Pagination from "../../components/common/Pagination";
import RecommendedUsersList from "../../components/common/RecommendedUsersList";

axios.defaults.withCredentials = true;

const Welcome = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentUser, setCurrentUser] = useState(null);
    const postsPerPage = 6;

    useEffect(() => {
        fetchPosts(currentPage);
        getCurrentUser();
    }, [currentPage]);

    const getCurrentUser = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            setCurrentUser(decodedToken);
        }
    };

    const fetchPosts = async (page) => {
        try {
            setIsLoading(true);
            const response = await api.get(`/posts?page=${page}&limit=${postsPerPage}`);
            setPosts(response.data.posts);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError("Failed to load posts. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitPost = async (content) => {
        setIsLoading(true);
        setError(null);
        try {
            await api.post("/posts/create", { content });
            fetchPosts(currentPage);
        } catch (err) {
            setError("Failed to submit post. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await api.delete(`/posts/${postId}`);
            fetchPosts(currentPage);
        } catch (err) {
            setError("Failed to delete post. Please try again.");
        }
    };

    const handleEditPost = async (postId, newContent) => {
        try {
            await api.put(`/posts/${postId}`, { 
                content: newContent,
                lastEditedBy: currentUser.role === 'admin' ? currentUser.name : undefined
            });
            fetchPosts(currentPage);
        } catch (err) {
            setError("Failed to edit post. Please try again.");
        }
    };

    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <div className="post-section">
                    <div className="w-full max-w-2xl">
                        <PostForm
                            onSubmitPost={handleSubmitPost}
                            isLoading={isLoading}
                            error={error}
                        />
                        <PostList
                            posts={posts}
                            onDeletePost={handleDeletePost}
                            onEditPost={handleEditPost}
                            currentUser={currentUser}
                            isLoading={isLoading}
                        />
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handleClickPage}
                        />
                    </div>
                </div>
            </div>
            <div className="post-section">
                <RecommendedUsersList />
            </div>
        </div>
    );
};

export default Welcome;
