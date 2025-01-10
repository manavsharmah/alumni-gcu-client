import React from "react";
import { FaLightbulb, FaBullseye, FaAtom } from "react-icons/fa";
import "./articles.css";

const MissionAndVision = () => {
  return (
    <div className="main">
      <div className="article-container">
      <div className="mv-container">
        <div className="mv-sub-container">
          <div className="mv-left">
            <div className="mv-box mission">
              <FaLightbulb className="mv-icon" />
              <h3>OUR MISSION</h3>
              <p>
                To enhance constant connections among alumni, the university and its community by promoting professional growth, benevolence and common values in order to strengthen the values of the institution.
              </p>
            </div>
            <div className="mv-box vision">
              <FaAtom className="mv-icon" />
              <h3>OUR VISION</h3>
              <p>
                To build an active and inclusive alumni network that inspires collaboration, celebrates achievements and contributes significantly towards the development of the university and society.
              </p>
            </div>
          </div>
          <div className="mv-right">
            <div className="mv-box objective">
              <FaBullseye className="mv-icon" />
              <h3>OUR OBJECTIVE</h3>
              <ul>
                <li>
                  <strong>Strengthen Alumni Connections:</strong> Organize reunions, networking events, and mentorship programs to foster meaningful relationships among alumni and with current students.
                </li>
                <li>
                  <strong>Support Professional Development:</strong> Provide career resources, training opportunities, and industry connections to enhance the professional growth of alumni.
                </li>
                <li>
                  <strong>Promote Philanthropic Activities:</strong> Encourage alumni contributions to scholarships, research initiatives and campus development projects.
                </li>
                <li>
                  <strong>Enhance Institutional Reputation:</strong> Showcase alumni achievements to highlight the university's impact on the global stage.
                </li>
                <li>
                  <strong>Encourage Lifelong Learning:</strong> Offer access to lectures, workshops, and educational content to support alumni in their personal and professional endeavours.
                </li>
                <li>
                  <strong>Foster a Sense of Belonging:</strong> Cultivate an inclusive and welcoming environment where alumni from diverse backgrounds feel valued and connected.
                </li>
                <li>
                  <strong>Collaborate with the University:</strong> Partner with the university to support strategic goals, enhance student experiences and contribute to academic excellence.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MissionAndVision;
