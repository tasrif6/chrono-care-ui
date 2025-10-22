import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { User, DollarSign, ShoppingCart, Activity, Menu, Stethoscope,
  Pill,
  Users, } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2 } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie
} from 'recharts';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const stats = [
    { title: 'Total Customers', value: 24032, icon: User },
    { title: 'Total Medicines', value: 123930, icon: DollarSign },
    { title: 'Total Ward', value: 23, icon: ShoppingCart },
  ];

  const initialDoctors = [
    { id: 1, name: 'Sam', mobile: '0785553321', address: 'Kalkara', charge: 2500, education: 'MBBS', dob: '1954-04-13', status: 'Online' },
    { id: 2, name: 'John', mobile: '0724725839', address: 'Kandy', charge: 2500, education: 'Phd', dob: '1978-05-13', status: 'Offline' },
    { id: 3, name: 'David', mobile: '0764924839', address: 'Galle', charge: 2500, education: 'MBBS', dob: '1987-04-18', status: 'Offline' },
    { id: 4, name: 'Christiano', mobile: '0764767839', address: 'Matara', charge: 2500, education: 'MBBS', dob: '1969-06-13', status: 'Offline' },
  ];

  const [doctors, setDoctors] = useState(initialDoctors);

  const handleStatusChange = (id, newStatus) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: newStatus } : doc))
    );
  };
    const chartData = [
    { Customers: 200, Medicines: 153 },
    { Customers: 235, Medicines: 255 },
    { Customers: 128, Medicines: 170 },
    { Customers: 310, Medicines: 21 },
    { Customers: 244, Medicines: 109 },
    { Customers: 278, Medicines: 500 },
    ];
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const navigate = useNavigate();
    
  return (
    <div className="min-h-screen flex">
        {/* Mobile Top Bar */}
    <div className="lg:hidden flex items-center justify-between bg-purple-700 text-white p-4">
    <h1 className="font-bold text-lg">MediLab Hospital</h1>
    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
        <Menu className="w-10 h-10" />
    </button>
    </div>
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
        <aside
        className={`bg-purple-700 text-white flex flex-col lg:w-64 lg:relative fixed top-0 left-0 h-screen transform transition-transform duration-300 z-40
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        >
        {/* Header */}
        <div className="p-6 font-bold text-lg border-b border-purple-600 flex items-center justify-between">
            {/* Close button for mobile */}
            { <span>MediLab Hospital</span>}
          <button
            className="lg:hidden text-white hover:text-gray-200"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
            </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
            {[
            { name: 'Dashboard', icon: <Activity className="w-5 h-5" />, path: '/admindashboard' },
            { name: 'Blood Bank', icon: <User className="w-5 h-5" />, path: '/bloodbank' },
            { name: 'Staff', icon: <User className="w-5 h-5" />, path: '/staff' },
            { name: 'Lab', icon: <ShoppingCart className="w-5 h-5" />, path: '/lab' },
            { name: 'Ward', icon: <DollarSign className="w-5 h-5" />, path: '/ward' },
            { name: 'Treatment', icon: <Activity className="w-5 h-5" />, path: '/treatment' },
            { name: 'Pharmacy', icon: <ShoppingCart className="w-5 h-5" />, path: '/pharmacy' },
            { name: 'Patient', icon: <User className="w-5 h-5" />, path: '/patient' },
            ].map((item, index) => (
            <button
                key={index}
                className={`flex items-center w-full text-left py-2 px-4 rounded transition-colors duration-200
                hover:bg-purple-600 focus:bg-purple-600 ${
                    activeTab === item.name ? 'bg-purple-800' : ''
                }`}
                onClick={() => { setActiveTab(item.name);
                    if (item.name === 'Dashboard') navigate('/admindashboard'); 
                    if (item.name === 'Pharmacy') navigate('/pharmacy'); }}

            >
                <span className="mr-3">{item.icon}</span>
              { <span>{item.name}</span>}
            </button>
            ))}
        </nav>
        </aside>


      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 bg-gray-50 p-6">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Pharmacy Management</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, idx) => (
              <Card key={idx} className="bg-white shadow-md hover:shadow-lg transition-all">
                <CardContent className="flex items-center space-x-4 p-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Recent Doctors</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                
                      
                    
              </tbody>
            </table>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  </div>
  );
};

export default Dashboard;
