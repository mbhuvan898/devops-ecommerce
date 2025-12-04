import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // ✅ Correct backend endpoint (matches your orderController)
        const { data } = await axios.get(
          "/api/v1/orders/me",
          { withCredentials: true } // important for JWT cookie
        );

        setOrders(data.orders || []);
      } catch (error) {
        console.error("❌ Error fetching orders:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order._id
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;

    let matchesDate = true;
    if (dateFilter !== "all" && order.createdAt) {
      const orderDate = new Date(order.createdAt);
      const now = new Date();
      const daysAgo = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

      if (dateFilter === "30days") matchesDate = daysAgo <= 30;
      else if (dateFilter === "3months") matchesDate = daysAgo <= 90;
      else if (dateFilter === "6months") matchesDate = daysAgo <= 180;
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Order History
      </Typography>

      {/* 🔍 Filters */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Search by Order ID"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Status"
            variant="outlined"
            fullWidth
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Processing">Processing</MenuItem>
            <MenuItem value="Shipped">Shipped</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Date Range"
            variant="outlined"
            fullWidth
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="30days">Last 30 Days</MenuItem>
            <MenuItem value="3months">Last 3 Months</MenuItem>
            <MenuItem value="6months">Last 6 Months</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* 🧾 Orders Display */}
      {loading ? (
        <Typography textAlign="center" mt={4}>
          Loading your orders...
        </Typography>
      ) : filteredOrders.length > 0 ? (
        <Grid container spacing={3}>
          {filteredOrders.map((order) => (
            <Grid item xs={12} key={order._id}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      Order ID: {order._id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      Total: ₹{order.totalPrice}
                    </Typography>
                    <Chip
                      label={order.orderStatus}
                      color={
                        order.orderStatus === "Delivered"
                          ? "success"
                          : order.orderStatus === "Shipped"
                          ? "info"
                          : order.orderStatus === "Cancelled"
                          ? "error"
                          : "warning"
                      }
                      sx={{ mt: 2 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="text.secondary" textAlign="center" mt={4}>
          No orders found.
        </Typography>
      )}
    </Box>
  );
};

export default UserOrderHistory;
