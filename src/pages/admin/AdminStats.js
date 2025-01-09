import React, { useState, useEffect } from 'react';
import "./admin.css";
import api from "../../services/api";
import { Bar }  from 'react-chartjs-2';

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  const chartData = stats
    ? {
        labels: ['Total Users', 'Pending Users', 'Approved Users'],
        datasets: [
          {
            label: 'User Statistics',
            data: [stats.totalUsers, stats.pendingUsers, stats.approvedUsers],
            backgroundColor: ['#3b82f6', '#fbbf24', '#10b981'],
          },
        ],
      }
    : null;

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h1 className="admin-dashboard-title">Admin Dashboard - Stats</h1>
      </div>
      <div className="admin-dashboard-content">
        {chartData ? (
          <div className="admin-stats-chart">
            <h2 className="admin-dashboard-section-header">Website Statistics</h2>
            <Bar data={chartData} />
          </div>
        ) : (
          <p className="admin-dashboard-no-data">Loading stats...</p>
        )}
      </div>
    </div>
  );
};

export default AdminStats;
