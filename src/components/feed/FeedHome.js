import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../services/api";
import PostForm from "../../components/forms/PostForm";
import PostList from "../../components/common/PostList";
import RecommendedUsersList from "../../components/common/RecommendedUsersList";
import JobOpportunities from "./JobOpportunities"; // New component
import FurtherEducation from "./FurtherEducation"; // New component
import FeedLayout from "./FeedLayout";
import FeedNavbar from "./FeedNavbar";
import VerifiedUsersList from "../common/VerifiedUsersList";
import Spinner from "../common/LoadingSpinner"; // Import Spinner

const Welcome = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState("home");
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef(null);
    const postsPerPage = 6;

    useEffect(() => {
        let category = "post"; // Default category is 'post'
        if (activeTab === "jobs") {
            category = "job"; // Fetch job opportunities
        } else if (activeTab === "education") {
            category = "education"; // Fetch education opportunities
        }
        fetchPosts(1, category, true); // Reset posts when the active tab changes
        getCurrentUser();
    }, [activeTab]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    fetchPosts(currentPage + 1);
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [currentPage, hasMore, isLoading]);

    const getCurrentUser = () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            setCurrentUser(decodedToken);
        }
    };

    const fetchPosts = async (page, category = "post", reset = false) => {
        try {
            setIsLoading(true);
            const response = await api.get(
                `/posts/get-post?page=${page}&limit=${postsPerPage}&category=${category}`
            );
            const newPosts = response.data.posts;
            setPosts((prevPosts) => (reset ? newPosts : [...prevPosts, ...newPosts]));
            setCurrentPage(page);
            setTotalPages(response.data.totalPages);
            setHasMore(page < response.data.totalPages);
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
            await api.post("/posts/create", { content, category }); // Pass content and category
            fetchPosts(1, category, true); // Reset posts after creating a new one
        } catch (err) {
            setError("Failed to submit post. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletePost = async (postId) => {
        try {
            await api.delete(`/posts/${postId}`);
            fetchPosts(1, activeTab === "jobs" ? "job" : activeTab === "education" ? "education" : "post", true);
        } catch (err) {
            setError("Failed to delete post. Please try again.");
        }
    };

    const handleEditPost = async (postId, newContent) => {
        try {
            await api.put(`/posts/${postId}`, { content: newContent });
            fetchPosts(1, activeTab === "jobs" ? "job" : activeTab === "education" ? "education" : "post", true);
        } catch (err) {
            setError("Failed to edit post. Please try again.");
        }
    };

    const handleLike = async (postId) => {
        try {
            const response = await api.put(`/posts/${postId}/like`);
            const updatedPost = response.data;

            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId ? { ...post, likes: updatedPost.likes } : post
                )
            );
        } catch (err) {
            setError("Failed to toggle like. Please try again.");
        }
    };

    const handleClickPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Left sidebar
    const leftSidebar = (
        <>
            <FeedNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
    );

    // Main content
    const mainContent = (
        <>
            

            {/* Home Tab (Regular Posts) */}
            {activeTab === "home" && (
                <>
                    <PostForm onSubmitPost={handleSubmitPost} isLoading={isLoading} error={error} />
                    {isLoading && posts.length === 0 ? (
                        <Spinner />
                    ) : (
                        <PostList
                            posts={posts}
                            onDeletePost={handleDeletePost}
                            onEditPost={handleEditPost}
                            currentUser={currentUser}
                            isLoading={isLoading}
                            onLike={handleLike}
                        />
                    )}
                </>
            )}
            {activeTab === "friends" && <VerifiedUsersList />}
            {/* Jobs Tab (Job Opportunities) */}
            {activeTab === "jobs" && (
                <>
                <PostForm onSubmitPost={handleSubmitPost} isLoading={isLoading} error={error} />
                <PostList
                    posts={posts}
                    onDeletePost={handleDeletePost}
                    onEditPost={handleEditPost}
                    currentUser={currentUser}
                    isLoading={isLoading}
                    onLike={handleLike}
                /></>
            )}

            {/* Education Tab (Education Opportunities) */}
            {activeTab === "education" && (
                <>
                <PostForm onSubmitPost={handleSubmitPost} isLoading={isLoading} error={error} />
                <PostList
                    posts={posts}
                    onDeletePost={handleDeletePost}
                    onEditPost={handleEditPost}
                    currentUser={currentUser}
                    isLoading={isLoading}
                /></>
            )}

            {isLoading && <Spinner />}
            <div ref={loaderRef} style={{ height: "1px" }}></div>
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
