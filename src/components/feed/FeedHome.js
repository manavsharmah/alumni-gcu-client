import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../services/api";
import PostForm from "../../components/forms/PostForm";
import PostList from "../../components/common/PostList";
import Pagination from "../../components/common/Pagination";
import RecommendedUsersList from "../../components/common/RecommendedUsersList";
import JobOpportunities from "./JobOpportunities"; // New component
import FurtherEducation from "./FurtherEducation"; // New component
import FeedLayout from "./FeedLayout";

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
            await api.put(`/posts/${postId}`, { content: newContent });
            fetchPosts(currentPage);
        } catch (err) {
            setError("Failed to edit post. Please try again.");
        }
    };

    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Left sidebar with Job Opportunities and Further Education
    const leftSidebar = (
        <>
            <JobOpportunities />
            <FurtherEducation />
        </>
    );

    // Main content (Post Form and Post List)
    const mainContent = (
        <>
            <PostForm onSubmitPost={handleSubmitPost} isLoading={isLoading} error={error} />
            <PostList posts={posts} onDeletePost={handleDeletePost} onEditPost={handleEditPost} currentUser={currentUser} isLoading={isLoading} />
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handleClickPage} />
        </>
    );

    // Right sidebar with Recommended Users List
    const rightSidebar = <RecommendedUsersList />;

    return <FeedLayout leftSidebar={leftSidebar} mainContent={mainContent} rightSidebar={rightSidebar} />;
};

export default Welcome;
