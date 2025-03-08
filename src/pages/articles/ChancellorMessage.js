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
                                <h3>Message from the Chancellor:</h3>
                            </div>
                            <div className="letter-header-image">
                                <img src="./assets/jayanta-sir.jpg" alt="Chancellor, GCU" />
                            </div>
                        </div>
                        <p>Dear Esteemed Alumni,</p>
                        <p>It is with great pride and appreciation that I extend my heartfelt greetings to all members of the Girijananda Chowdhury University Alumni Association (GCUAA). As we reflect on the remarkable journey of our university, I am reminded of the invaluable contributions each of you has made in shaping our institution’s legacy.</p>
                        <p>Girijananda Chowdhury University stands as a testament to the vision and dedication of the Shrimanta Shankar Academy Society. Since its inception, GCU has been committed to academic excellence, research, and innovation, fostering an environment where knowledge is not only gained but also applied to create meaningful impact. Our journey from esteemed institutions like GIMT and GIPS to a full-fledged university has been one of growth and transformation, made possible by the collective efforts of our students, faculty, and alumni.</p>
                        <p>Our alumni are the true ambassadors of GCU, carrying the spirit of excellence and service into diverse fields across the world. Your achievements bring immense pride to your alma mater and serve as an inspiration to current and future students. The establishment of GCUAA marks an important step in strengthening the bond between the university and its graduates, creating a platform for collaboration, mentorship, and lifelong learning.</p>
                        <p>As we move forward, I encourage you to stay engaged with your university, share your experiences, and contribute to the growth of this vibrant academic community. Your insights and expertise are invaluable in shaping the future of GCU and guiding the next generation of learners. Together, let us uphold our commitment to knowledge, innovation, and societal progress.</p>
                        <p>Thank you for being an integral part of the GCU family. I look forward to witnessing the continued success and impact of our alumni in the years to come.</p>
                        <p><strong>Prof. Jayanta Deka <br />
                            Chancellor <br />
                            Girijananda Chowdhury University
                        </strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VCMessage;
