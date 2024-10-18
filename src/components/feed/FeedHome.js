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

    // Left sidebar 
    const leftSidebar = (
        <>
            {activeTab === "home" && (
                <>
                    <JobOpportunities />
                    <FurtherEducation />
                </>
            )}
            {activeTab === "jobs" && <FurtherEducation />}
            {activeTab === "education" && <JobOpportunities />}
            {activeTab === "friends" && null}
        </>
    );
    

    // Main content 
    const mainContent = (
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
                    />
                </>
            )}
            {activeTab === "friends" && <VerifiedUsersList />}
            {activeTab === "jobs" && <JobOpportunities />}  {/* Show Job Opportunities when tab is clicked */}
            {activeTab === "education" && <FurtherEducation />}  {/* Show Education Opportunities when tab is clicked */}
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handleClickPage} />
        </>
    );
    

    // Right sidebar
    const rightSidebar = (
        <>
            {activeTab === "home" && <RecommendedUsersList />}
            {activeTab === "jobs" && <RecommendedUsersList />}
            {activeTab === "education" && <VerifiedUsersList />}
            {activeTab === "friends" && null}
        </>
    );
    

    return <FeedLayout leftSidebar={leftSidebar} mainContent={mainContent} rightSidebar={rightSidebar} />;
};

export default Welcome;
