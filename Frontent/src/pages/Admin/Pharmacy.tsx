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
    { title: 'Total Manufacturers', value: 34, icon: ShoppingCart },
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
                    if (item.name === 'Ward') navigate('/ward'); }}
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

            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-10">
            <h2 className="text-xl, text-2xl, text-3xl font-bold mb-4">Monthly Stats</h2>
            
            <div className="flex flex-col lg:flex-row gap-6">
            {/* Line Chart */}
            <div className="flex-1 h-96"> {/* increased from h-64 to h-96 */}
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /> {/* lighter grid */}
                    <XAxis dataKey="name" stroke="#6b7280" /> {/* gray axis text */}
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                    contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '10px',
                    }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    
                    {/* Patients Line */}
                    <Line
                    type="monotone"
                    dataKey="Customers"
                    stroke="#4f46e5"           // rich indigo color
                    strokeWidth={3}
                    activeDot={{ r: 8, fill: '#4f46e5', stroke: '#ffffff', strokeWidth: 2 }}
                    />

                    {/* Doctors Line */}
                    <Line
                    type="monotone"
                    dataKey="Medicines"
                    stroke="#10b981"           // teal-green color
                    strokeWidth={3}
                    activeDot={{ r: 8, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
                    />
                </LineChart>
                </ResponsiveContainer>
            </div>
            </div>

            </div>



          {/* Recent Doctors Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Recent Doctors</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Charge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Education</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.map((doc) => (
                  <tr key={doc.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.mobile}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.charge}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.education}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.dob}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Select
                        value={doc.status}
                        onValueChange={(val) => handleStatusChange(doc.id, val)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="In Stock">In Stock</SelectItem>
                          <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap gap-2 flex">
                        {/* Edit Button */}
                        <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={() => alert(`Edit doctor ${doc.name}`)} // Replace with your edit logic/modal
                        >
                            Edit
                        </Button>
                      <Button variant="destructive" size="sm" onClick={() => setDoctors(prev => prev.filter(d => d.id !== doc.id))}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
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
