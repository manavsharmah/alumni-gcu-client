import React from "react";
import "./articles.css";

const VCMessage = () => {
    return (
        <div className="main">
            <div className="art-container">
                <div className="vc-message-container">
                    <div className="letter">
                        <div className="letter-header">
                            <div className="letter-header-text">
                                <h3>Message from the Alumni Association President:</h3>
                            </div>
                            <div className="letter-header-image">
                                <img src="./assets/registrar-gcu.jpg" alt="Registrar, GCU" />
                            </div>
                        </div>
                        <p>Dear Fellow Alumni,</p>
                        <p>As we celebrate another year of growth, connection, and achievement, I am honored to address you as the President of our esteemed Alumni Association.</p>
                        <p>Our university has always been a beacon of excellence, fostering a community of scholars, innovators, and leaders. As alumni, you carry the torch of this legacy, inspiring future generations to strive for greatness.</p>
                        <p>The strength of our alumni network lies in the relationships we build and nurture. I encourage all of you to stay connected, support one another, and remain involved in the vibrant life of the university. Our collective experiences and resources can be powerful catalysts for growth, both for current students and for one another.</p>
                        <p>In the coming year, we aim to strengthen our bonds and expand our networks. We will continue to create opportunities for mentorship, professional development, and social connections.</p>
                        <p>As we move forward, let us continue to be a source of inspiration, encouragement, and collaboration. I look forward to the exciting opportunities we will explore together and to witnessing the continued success of the Girijananda Chowdhury University alumni community.</p>
                        <p>Thank you for your loyalty, enthusiasm, and commitment to our Alumni Association.</p>
                        <p><strong>Prof. Dipankar Saha <br />
                            President, Alumni Association <br />
                            Girijananda Chowdhury University, Assam
                        </strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VCMessage;
