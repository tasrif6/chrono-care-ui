import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { User, Stethoscope, Droplet, Activity, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const UsersDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  // ✅ Dummy Data for Consultations
  const consultations = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      date: '2025-09-10',
      notes: 'Follow-up for migraine, prescribed medication.',
      fee: 2000,
    },
    {
      id: 2,
      doctor: 'Dr. Ahmed Ali',
      date: '2025-08-03',
      notes: 'General health checkup and blood test.',
      fee: 1500,
    },
    {
      id: 3,
      doctor: 'Dr. Emily Brown',
      date: '2025-07-15',
      notes: 'Consultation for allergy issues.',
      fee: 1800,
    },
  ];

  // ✅ Available Doctors
  const availableDoctors = [
    { id: 1, name: 'Dr. John Smith', specialization: 'Cardiologist', status: 'Online' },
    { id: 2, name: 'Dr. Maria Gomez', specialization: 'Dermatologist', status: 'Offline' },
    { id: 3, name: 'Dr. Raj Patel', specialization: 'Neurologist', status: 'Online' },
  ];

  // ✅ Blood Bank Info
  const bloodBank = [
    { type: 'A+', units: 15 },
    { type: 'B+', units: 10 },
    { type: 'O+', units: 25 },
    { type: 'AB+', units: 5 },
    { type: 'O-', units: 8 },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between bg-purple-700 text-white p-4">
        <h1 className="font-bold text-lg">MediLab Hospital</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-8 h-8" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-purple-700 text-white flex flex-col lg:w-64 lg:relative fixed top-0 left-0 h-screen transform transition-transform duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="p-6 font-bold text-lg border-b border-purple-600 flex items-center justify-between">
          <span>MediLab Portal</span>
          <button className="lg:hidden text-white hover:text-gray-200" onClick={() => setSidebarOpen(false)}>
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { name: 'Dashboard', icon: <Activity className="w-5 h-5" />, path: '/user/usersdashboard' },
            { name: 'Blood Bank', icon: <Droplet className="w-5 h-5" />, path: '/patient/bloodbank' },
            { name: 'Doctors', icon: <Stethoscope className="w-5 h-5" />, path: '/patient/doctors' },
            { name: 'Profile', icon: <User className="w-5 h-5" />, path: '/patient/profile' },
          ].map((item, index) => (
            <button
              key={index}
              className={`flex items-center w-full text-left py-2 px-4 rounded transition-colors duration-200
                hover:bg-purple-600 focus:bg-purple-600 ${
                  activeTab === item.name ? 'bg-purple-800' : ''
                }`}
              onClick={() => {
                setActiveTab(item.name);
                navigate(item.path);
              }}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 bg-gray-50 p-6">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Welcome Back, Patient!</h1>

          {/* Previous Consultations */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Previous Consultations</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Notes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {consultations.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.doctor}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.notes}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-green-700">
                      ৳ {item.fee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Available Doctors */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-10">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Available Doctors</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {availableDoctors.map((doc) => (
                <Card key={doc.id} className="shadow-sm border border-gray-200">
                  <CardContent className="p-4 flex flex-col items-start space-y-2">
                    <h3 className="font-bold text-lg">{doc.name}</h3>
                    <p className="text-gray-600">{doc.specialization}</p>
                    <p
                      className={`text-sm font-semibold ${
                        doc.status === 'Online' ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {doc.status}
                    </p>
                    <Button className="mt-2" size="sm">
                      Book Appointment
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Blood Bank Info */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Blood Bank Availability</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Units Available</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bloodBank.map((b, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">{b.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{b.units} Units</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default UsersDashboard;
