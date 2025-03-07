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
                            <h3>President’s Message:</h3>
                            </div>
                            <div className="letter-header-image">
                                <img src="./assets/Pres-img-ssa.jpg" alt="President, SSA" />
                            </div>
                        </div>

                        <p>Welcome to the Girijananda Chowdhury University Alumni Association (GCUAA)!</p>
                        <p>Girijananda Chowdhury University (GCU) is a proud embodiment of the vision and commitment of the Shrimanta Shankar Academy Society. Since its establishment in October 2022, GCU has marked a transformative milestone in Assam’s academic journey as a private university under the Assam Private University Act. This achievement reflects our unwavering dedication to fostering education that empowers individuals and transforms society.</p>
                        <p>The Shrimanta Shankar Academy Society has a legacy of excellence rooted in its two flagship institutions—Girijananda Chowdhury Institute of Management and Technology (GIMT) and Girijananda Chowdhury Institute of Pharmaceutical Science (GIPS). These institutions, with their strong academic credentials, have consistently delivered high-quality education in engineering, management, and pharmaceutical sciences, earning accolades such as AICTE approval and NBA accreditation.</p>
                        <p>The establishment of GCUAA serves as a vital bridge between the university and its alumni, strengthening bonds that transcend time and geography. As alumni, you are integral to the GCU story, reflecting its past, enriching its present, and shaping its future. Through GCUAA, we aim to foster a thriving global community where experiences are shared, knowledge is exchanged, and contributions are made to advance education, research, and innovation.</p>
                        <p>I encourage you to remain actively engaged with GCUAA—whether by mentoring students, contributing to initiatives, or simply sharing your journey. Together, we can inspire future generations, uphold the university’s legacy, and continue to make a meaningful impact on the world.</p>
                        <p>Thank you for being an invaluable part of the GCU family. Let us move forward together with a shared vision of excellence and a commitment to building a brighter future.</p>
                        <p><strong>Shri. Jasoda Ranjan Das <br />
                            President, SSA
                        </strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VCMessage;
