import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Blood Bank');

  const [patients, setPatients] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [reportType, setReportType] = useState('');
  const [remarks, setRemarks] = useState('');

  const navigate = useNavigate();

  // Fetch patients & medicines from API
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error(err));


    fetch('/api/medicines')
      .then(res => res.json())
      .then(data => setMedicines(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddMedicine = () => {
    setInvoiceItems(prev => [...prev, { medicineId: '', quantity: 1 }]);
  };

  const handleInvoiceChange = (index, field, value) => {
    const items = [...invoiceItems];
    items[index][field] = value;
    setInvoiceItems(items);
  };

  const handleInvoiceSubmit = async () => {
    if (!selectedPatient) return alert('Select a patient!');
    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId: selectedPatient, items: invoiceItems }),
    });
    if (res.ok) {
      alert('Invoice submitted!');
      setInvoiceItems([]);
      setSelectedPatient('');
    }
  };

  const handleReportSubmit = async () => {
    if (!selectedPatient || !reportType) return alert('Fill all fields!');
    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId: selectedPatient, type: reportType, remarks }),
    });
    if (res.ok) {
      alert('Report submitted!');
      setReportType('');
      setRemarks('');
      setSelectedPatient('');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar & Navbar */}
      <div className="lg:hidden flex items-center justify-between bg-purple-700 text-white p-4">
        <h1 className="font-bold text-lg">Doctor Dashboard</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu className="w-10 h-10" />
        </button>
      </div>

      <div className="min-h-screen flex bg-gray-50 overflow-hidden">
        <aside
          className={`bg-purple-700 text-white flex flex-col lg:w-64 lg:relative fixed top-0 left-0 h-screen transform transition-transform duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        >
          <div className="p-6 font-bold text-lg border-b border-purple-600 flex items-center justify-between">
            <span>Doctor Dashboard</span>
            <button className="lg:hidden text-white hover:text-gray-200" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {['Blood Bank', 'Wards', 'Patients Queue', 'Invoices', 'Reports'].map(tab => (
              <button
                key={tab}
                className={`flex items-center w-full text-left py-2 px-4 rounded transition-colors duration-200
                  hover:bg-purple-600 focus:bg-purple-600 ${activeTab === tab ? 'bg-purple-800' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-foreground">Doctor Dashboard</h1>

            {/* Tabs Content */}
            {activeTab === 'Invoices' && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Generate Invoice</h2>

                <div className="mb-4">
                  <label className="block font-medium">Select Patient</label>
                  <select
                    className="border p-2 rounded w-full"
                    value={selectedPatient}
                    onChange={e => setSelectedPatient(e.target.value)}
                  >
                    <option value="">Select</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                {invoiceItems.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <select
                      className="border p-2 rounded flex-1"
                      value={item.medicineId}
                      onChange={e => handleInvoiceChange(index, 'medicineId', e.target.value)}
                    >
                      <option value="">Select Medicine</option>
                      {medicines.map(m => (
                        <option key={m.id} value={m.id}>{m.name} (${m.price})</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      className="border p-2 rounded w-24"
                      min="1"
                      value={item.quantity}
                      onChange={e => handleInvoiceChange(index, 'quantity', e.target.value)}
                    />
                  </div>
                ))}

                <Button onClick={handleAddMedicine} className="mb-4">Add Medicine</Button>
                <Button onClick={handleInvoiceSubmit}>Submit Invoice</Button>
              </div>
            )}

            {activeTab === 'Reports' && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Generate Report</h2>

                <div className="mb-4">
                  <label className="block font-medium">Select Patient</label>
                  <select
                    className="border p-2 rounded w-full"
                    value={selectedPatient}
                    onChange={e => setSelectedPatient(e.target.value)}
                  >
                    <option value="">Select</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block font-medium">Report Type</label>
                  <select
                    className="border p-2 rounded w-full"
                    value={reportType}
                    onChange={e => setReportType(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Lab">Lab</option>
                    <option value="X-ray">X-ray</option>
                    <option value="General">General Checkup</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block font-medium">Remarks</label>
                  <textarea
                    className="border p-2 rounded w-full"
                    value={remarks}
                    onChange={e => setRemarks(e.target.value)}
                  ></textarea>
                </div>

                <Button onClick={handleReportSubmit}>Submit Report</Button>
              </div>
            )}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
