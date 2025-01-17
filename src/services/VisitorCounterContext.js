import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const VisitorCounterContext = createContext();

export const useVisitorCounter = () => useContext(VisitorCounterContext);

export const VisitorCounterProvider = ({ children }) => {
  const [visitorCount, setVisitorCount] = useState(null);
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    // Check if the increment has already happened in the session
    const incrementFlag = localStorage.getItem("hasIncremented");

    if (!incrementFlag) {
      const updateVisitorCount = async () => {
        try {
          // Increment the visitor count only if not already done
          const response = await axios.post("http://localhost:5000/api/visitors");
          setVisitorCount(response.data.totalVisitors);
          // Store the flag in localStorage to avoid repeated increment on page reloads
          localStorage.setItem("hasIncremented", "true");
        } catch (error) {
          console.error("Error fetching visitor count:", error);
        }
      };

      updateVisitorCount();
      setHasIncremented(true);
    } else {
      const fetchVisitorCount = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/visitors");
          setVisitorCount(response.data.totalVisitors);
        } catch (error) {
          console.error("Error fetching visitor count:", error);
        }
      };

      fetchVisitorCount();
    }
  }, []); // Empty dependency array ensures this runs only on component mount

  return (
    <VisitorCounterContext.Provider value={{ visitorCount, setVisitorCount }}>
      {children}
    </VisitorCounterContext.Provider>
  );
};
