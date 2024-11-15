import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../services/api";
import PostForm from "../../components/forms/PostForm";
import PostList from "../../components/common/PostList";
import Pagination from "../../components/common/Pagination";
import RecommendedUsersList from "../../components/common/RecommendedUsersList";
import JobOpportunities from "./JobOpportunities";
import FurtherEducation from "./FurtherEducation";
import FeedLayout from "./FeedLayout";
import FeedNavbar from "./FeedNavbar";
import VerifiedUsersList from "../common/VerifiedUsersList";

const Welcome = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState("home");
    const postsPerPage = 6;

    useEffect(() => {
        let category = 'post';
        if (activeTab === 'jobs') category = 'job';
        else if (activeTab === 'education') category = 'education';
        fetchPosts(currentPage, category);
        getCurrentUser();
    }, [activeTab, currentPage]);

    const getCurrentUser = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            setCurrentUser(decodedToken);
        }
    };

    const fetchPosts = async (page, category = 'post') => {
        try {
            setIsLoading(true);
            const response = await api.get(`/posts/get-post?page=${page}&limit=${postsPerPage}&category=${category}`);
            setPosts(response.data.posts);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError("Failed to load posts. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitPost = async (content, category) => {
        setIsLoading(true);
        setError(null);
        try {
            await api.post("/posts/create", { content, category });
            fetchPosts(currentPage, category);
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

    const handleClickPage = (pageNumber) => setCurrentPage(pageNumber);

    const handleLike = async (postId) => {
        try {
            const response = await api.put(`/posts/${postId}/like`);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, likes: response.data.likes } : post
                )
            );
        } catch (err) {
            setError("Failed to toggle like. Please try again.");
        }
    };

    const handleAddComment = async (postId, content) => {
        try {
            const response = await api.post(`/posts/${postId}/comments`, { content });
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, comments: response.data.comments } : post
                )
            );
        } catch (err) {
            setError("Failed to add comment. Please try again.");
        }
    };
    const handleDeleteComment = async (postId, commentId) => {
        try {
            const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, comments: response.data.comments } : post
                )
            );
        } catch (err) {
            setError("Failed to delete comment. Please try again.");
        }
    };

    return (
        <FeedLayout
            leftSidebar={
                <>
                    {activeTab === "home" && (
                        <>
                            <JobOpportunities />
                            <FurtherEducation />
                        </>
                    )}
                    {activeTab === "jobs" && <FurtherEducation />}
                    {activeTab === "education" && <JobOpportunities />}
                </>
            }
            mainContent={
                <>
                    <FeedNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
                    {activeTab === "home" && (
                        <>
                            <PostForm onSubmitPost={handleSubmitPost} isLoading={isLoading} error={error} />
                            <PostList
                                posts={posts}
                                onDeletePost={handleDeletePost}
                                onEditPost={handleEditPost}
                                currentUser={currentUser}
                                isLoading={isLoading}
                                onLike={handleLike}
                                onComment={handleAddComment}
                                onDeleteComment={handleDeleteComment}
                            />
                        </>
                    )}
                    {activeTab === "jobs" && (
                        <PostList
                            posts={posts}
                            onDeletePost={handleDeletePost}
                            onEditPost={handleEditPost}
                            currentUser={currentUser}
                            isLoading={isLoading}
                            onLike={handleLike}
                            onComment={handleAddComment}
                            onDeleteComment={handleDeleteComment}
                        />
                    )}
                    {activeTab === "education" && (
                        <PostList
                            posts={posts}
                            onDeletePost={handleDeletePost}
                            onEditPost={handleEditPost}
                            currentUser={currentUser}
                            isLoading={isLoading}
                            onLike={handleLike}
                            onComment={handleAddComment}
                        />
                    )}
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handleClickPage} />
                </>
            }
            rightSidebar={
                <>
                    {activeTab === "home" && <RecommendedUsersList />}
                    {activeTab === "jobs" && <RecommendedUsersList />}
                    {activeTab === "education" && <VerifiedUsersList />}
                </>
            }
        />
    );
};

export default Welcome;
