import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import api from "./api";

const VisitorCounterContext = createContext();

export const useVisitorCounter = () => useContext(VisitorCounterContext);

export const VisitorCounterProvider = ({ children }) => {
  const [visitorCount, setVisitorCount] = useState(null);
  const [hasIncremented, setHasIncremented] = useState(false);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; // Prevent multiple calls
    hasFetched.current = true;

    const incrementFlag = sessionStorage.getItem("hasIncremented");

    if (!incrementFlag) {
      const updateVisitorCount = async () => {
        try {
          const response = await api.post("/visitors");
          setVisitorCount(response.data.totalVisitors);
          sessionStorage.setItem("hasIncremented", "true");
        } catch (error) {
          console.error("Error updating visitor count:", error);
        }
      };

      updateVisitorCount();
    } else {
      const fetchVisitorCount = async () => {
        try {
          const response = await api.get("/visitors");
          setVisitorCount(response.data.totalVisitors);
        } catch (error) {
          console.error("Error fetching visitor count:", error);
        }
      };

      fetchVisitorCount();
    }
  }, []);
 // Empty dependency array ensures this runs only on component mount

  return (
    <VisitorCounterContext.Provider value={{ visitorCount, setVisitorCount }}>
      {children}
    </VisitorCounterContext.Provider>
  );
};
