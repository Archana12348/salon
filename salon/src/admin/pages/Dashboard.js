"use client";
import { useEffect, useState } from "react";
import { Users, CalendarCheck } from "lucide-react";
import StatsCard from "../components/common/StatsCard";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://jumeirah.premierwebtechservices.com/backend/api/admin/dashboard"
    )
      .then((res) => res.json())
      .then((json) => {
        setStats(json.data); // IMPORTANT
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  if (!stats) {
    return (
      <div className="p-4 text-red-500">Failed to load dashboard data.</div>
    );
  }

  const dashboardStats = [
    {
      title: "Total Users",
      value: stats.total_users.toString(),
      icon: Users,
    },
    {
      title: "Total Bookings",
      value: stats.total_bookings.toString(),
      icon: CalendarCheck,
    },
  ];

  return (
    <div className="space-y-6 px-4 py-4">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here’s what’s happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {dashboardStats.map((item, index) => (
          <StatsCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
