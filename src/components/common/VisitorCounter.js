import React, { useEffect } from "react";
import { useVisitorCounter } from "../../services/VisitorCounterContext";
import "../components.css";

const VisitorCounterBanner = () => {
    const { visitorCount } = useVisitorCounter();

    return (
      <div className="visitor-counter-container">
        <div className="visitor-counter-title">Total Visitors</div>
        <div className="visitor-count-container">
          {visitorCount !== null
            ? visitorCount
                .toString()
                .split("")
                .map((digit, index) => (
                  <span key={index} className="digit">
                    {digit}
                  </span>
                ))
            : "Loading..."}
        </div>
      </div>
    );
};

export default VisitorCounterBanner;
