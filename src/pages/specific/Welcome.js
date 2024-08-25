import axios from "axios";
import VerifiedUsersList from "../../components/common/VerifiedUsersList";
import { useState } from "react";
axios.defaults.withCredentials = true;

const Welcome = () => {   
    const [postContent, setPostContent] = useState("");

    const handlePostChange = (e) => {
        setPostContent(e.target.value);
    };

    const handlePostSubmit = () => {
        console.log("Posting:", postContent);
        setPostContent("");
    };

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <div className="post-section">
                    <div className="post-form">
                        <div className="profile-picture-small"></div>
                        <input 
                            type="text" 
                            className="post-input" 
                            placeholder="What's on your mind?"
                            value={postContent}
                            onChange={handlePostChange}
                        />
                        <button className="post-button" onClick={handlePostSubmit}>Post</button>
                    </div>
                </div>
                <div className="users-container">
                    <VerifiedUsersList />
                </div>
            </div>
        </div>
    )
}

export default Welcome;
