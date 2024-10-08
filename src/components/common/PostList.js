import React from "react";
import PostCard from "../common/PostCard";

const PostList = ({ posts, onDeletePost, currentUser, isLoading, onEditPost }) => {
    return (
        <div className="posts-container">
            {isLoading ? (
                <p className="text-center">Loading posts...</p>
            ) : posts && posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard 
                        key={post._id} 
                        post={post} 
                        onEdit={onEditPost}
                        onDelete={onDeletePost}
                        currentUser={currentUser}
                    />
                ))
            ) : (
                <p className="text-center text-gray-500 mt-4">
                    No posts yet. Be the first to post!
                </p>
            )}
        </div>
    );
};

export default PostList;
