import React, { useState, useEffect } from 'react';
import "./admin.css";
import api from "../../services/api";
import { Bar, Pie, Line } from 'react-chartjs-2';
import VisitorCounterBanner from '../../components/common/VisitorCounter';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';

// Register elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

  const DashboardCharts = () => {
    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        totalUnverifiedUsers: 0,
        totalPosts: 0,
        totalComments: 0,
        totalFeedback: 0
    });
    const [registrations, setRegistrations] = useState([]);
    const [categories, setCategories] = useState({});
    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const metricsRes = await api.get('/admin/metrics');
                setMetrics(metricsRes.data);

                const registrationsRes = await api.get('/admin/users/registrations');
                setRegistrations(registrationsRes.data.data);

                const categoriesRes = await api.get('/admin/posts/categories');
                setCategories(categoriesRes.data.categories);

                const activeUsersRes = await api.get('/admin/users/active');
                setActiveUsers(activeUsersRes.data.users);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchMetrics();
    }, []);

    const registrationChartData = {
        labels: registrations.map(reg => reg.month),
        datasets: [{
            label: 'User Registrations',
            data: registrations.map(reg => reg.count),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const categoryChartData = {
        labels: Object.keys(categories),
        datasets: [{
            label: 'Posts by Category',
            data: Object.values(categories),
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
        }]
    };


    return (
        <div className="dashboard-charts">
            <div className="metrics-overview">
                <div className="metric-card">Total Users: {metrics.totalUsers}</div>
                <div className="metric-card">Unverified Users: {metrics.totalUnverifiedUsers}</div>
                <div className="metric-card">Total Posts: {metrics.totalPosts}</div>
                <div className="metric-card">Total Comments: {metrics.totalComments}</div>
                <div className="metric-card">Total Feedback: {metrics.totalFeedback}</div>
            </div>
            <VisitorCounterBanner />
            <div className="chart-container">
                <h3>User Registrations Over Time</h3>
                <div className="chart">
                  <Line data={registrationChartData} />
                </div>
            </div>
            <div className="chart-container">
                <h3>Posts by Category</h3>
                <div className="chart">
                  <Pie data={categoryChartData} />
                </div>
            </div>
            <div className="chart-container">
                <h3>Top Active Users</h3>
                <ul>
                    {activeUsers.map(user => (
                        <li key={user.email}>
                            {user.name} ({user.email}) - {user.postCount} posts
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardCharts;
