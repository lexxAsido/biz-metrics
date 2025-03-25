"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
} from "@mui/material";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [filter, setFilter] = useState("");

  const metrics = [
    { title: "Total Users", value: 1200 },
    { title: "Active Sessions", value: 300 },
    { title: "Sales Revenue", value: "$45,000" },
  ];

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [100, 200, 150, 250, 300],
        backgroundColor: "rgba(255,99,132,0.5)",
        borderColor: "rgba(255,99,132,1)",
        fill: true,
      },
    ],
  };

  const userGrowthData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Users",
        data: [50, 100, 150, 200],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const categoryData = {
    labels: ["Electronics", "Fashion", "Grocery"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
      },
    ],
  };

  const users = [
    { id: 1, name: "Alex Him", email: "alex@example.com", sales: "$500" },
    { id: 2, name: "Micheal Lenon", email: "lenon@example.com", sales: "$750" },
    { id: 3, name: "Cherish moe", email: "moe@example.com", sales: "$950" },
    { id: 4, name: "Daniel Morgan", email: "daniel@example.com", sales: "$800" },
    { id: 5, name: "Emma Akpan", email: "Akpan@example.com", sales: "$1050" },
    { id: 6, name: "Jonah Mba", email: "mba@example.com", sales: "$250" },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "1200px", mx: "auto" }}>

      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
        Dashboard
      </Typography>

    
      <Grid container spacing={2} justifyContent="center">
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6">{metric.title}</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {metric.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ background: "white", p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Sales Data
            </Typography>
            <Line data={salesData} />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ background: "white", p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              User Growth
            </Typography>
            <Bar data={userGrowthData} />
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ background: "white", p: 2, borderRadius: 2, width: { xs: "100%", sm: "60%" } }}>
            <Typography variant="subtitle1" sx={{ mb: 1, textAlign: "center" }}>
              Category Breakdown
            </Typography>
            <Pie data={categoryData} />
          </Box>
        </Grid>
      </Grid>

      
      <Box sx={{ mt: 4 }}>
        <TextField
          label="Filter by name"
          variant="outlined"
          fullWidth
          onChange={(e) => setFilter(e.target.value)}
        />
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Sales</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) =>
                  user.name.toLowerCase().includes(filter.toLowerCase())
                )
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.sales}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;
