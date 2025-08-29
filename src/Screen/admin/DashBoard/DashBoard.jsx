import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { format } from "date-fns";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sales Data for Chart
  const salesComparison = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      { label: "Branch A", data: [12000, 19000, 30000, 50000, 20000, 35000], backgroundColor: "#3b82f6" },
      { label: "Branch B", data: [15000, 23000, 25000, 40000, 18000, 37000], backgroundColor: "#f59e0b" },
    ],
  };

  // Summary Data
  const totalSales = 320000000;
  const totalCustomers = 452;
  const profits = { branchA: 120000, branchB: 140000 };

  // Pending Orders
  const pendingOrders = [
    { id: "#00123", customer: "Olivia Martin", amount: "$1,500" },
    { id: "#00124", customer: "Daniel Lee", amount: "$2,200" },
    { id: "#00125", customer: "Emily Clark", amount: "$1,050" },
    { id: "#00126", customer: "James Carter", amount: "$3,400" },
  ];

  // Top Salespeople
  const topSalespeople = [
    { name: "Alice Johnson", sales: 98 },
    { name: "Michael Brown", sales: 86 },
    { name: "Sophia Lee", sales: 75 },
    { name: "James Wilson", sales: 68 },
    { name: "Emma Davis", sales: 55 },
  ];

  return (
    <div className="p-6 space-y-6">
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-blue-500">KSH {totalSales.toLocaleString()}</CardContent>
        </Card>

        <Card className="shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle>Total Customers</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-500">{totalCustomers}</CardContent>
        </Card>

        <Card className="shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle>Today's Date</CardTitle>
          </CardHeader>
          <CardContent className="text-xl">{format(selectedDate, "PPP")}</CardContent>
        </Card>
      </div>

      {/* Sales Comparison Chart */}
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle>Sales Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={salesComparison} />
        </CardContent>
      </Card>

      {/* Profit & Calendar Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profit Overview */}
        <Card className="shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle>Profit Overview</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-lg font-semibold">
            <div>Branch A: <span className="text-green-500">${profits.branchA}</span></div>
            <div>Branch B: <span className="text-green-500">${profits.branchB}</span></div>
          </CardContent>
        </Card>

        {/* Calendar with Improved Styling */}
        <Card className="shadow-lg border border-gray-200">
          <CardHeader>
            <CardTitle>Select a Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Calendar 
                mode="single" 
                selected={selectedDate} 
                onSelect={setSelectedDate} 
                className="rounded-md border p-4 max-w-md" 
              />
            </div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Selected Date: <strong>{format(selectedDate, "PPP")}</strong>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top 5 Salespeople */}
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle>Top 5 Salespeople</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Sales</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSalespeople.map((person, index) => (
                <TableRow key={index}>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.sales}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pending Orders */}
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle>Pending Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingOrders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Refresh Data Button */}
      <div className="flex justify-center">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg" onClick={() => alert("Refreshing Data...")}>
          Refresh Data
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
