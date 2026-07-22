import React, { useState } from 'react';

export default function AdminDashboard() {
  // Mock administrative state
  const [users, setUsers] = useState([
    { id: '1', name: 'Charlie', email: 'charlie@test.com', accountNo: '5959504955', balance: 519.99, status: 'Active' },
    { id: '2', name: 'Sarah Jenkins', email: 'sarah@test.com', accountNo: '8821034912', balance: 1420.50, status: 'Active' },
    { id: '3', name: 'David Miller', email: 'david@test.com', accountNo: '3049182736', balance: 12.00, status: 'Frozen' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const toggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Frozen' : 'Active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.accountNo.includes(searchTerm)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* --- ADMIN HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-200 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Admin Console</h1>
            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded border border-red-200 uppercase tracking-wide">
              Restricted Access
            </span>
          </div>
          <p className="text-xs text-slate-500">System management & audit controls</p>
        </div>

        <button className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-slate-800 transition">
          Export System Logs
        </button>
      </div>

      {/* --- STATS OVERVIEW CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Liquidity</p>
          <h2 className="text-2xl font-mono font-bold text-slate-900 mt-1">$1,952.49</h2>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5"> Across 3 active accounts</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Accounts</p>
          <h2 className="text-2xl font-mono font-bold text-slate-900 mt-1">{users.length}</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">{users.filter(u => u.status === 'Frozen').length} currently frozen</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">System Status</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-slate-800 text-sm">All Services Operational</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">API Latency: 24ms</p>
        </div>
      </div>

      {/* --- USER MANAGEMENT TABLE --- */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-sm font-bold text-slate-900">Registered Accounts</h3>
          
          <input 
            type="text" 
            placeholder="Search name, email or account #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-100 font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3.5">User</th>
                <th className="p-3.5">Account No.</th>
                <th className="p-3.5">Balance</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition">
                  <td className="p-3.5 font-sans">
                    <p className="font-semibold text-slate-900">{u.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{u.email}</p>
                  </td>
                  <td className="p-3.5 text-slate-700 font-bold">{u.accountNo}</td>
                  <td className="p-3.5 text-slate-900 font-bold">${u.balance.toFixed(2)}</td>
                  <td className="p-3.5 font-sans">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      u.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-sans">
                    <button 
                      onClick={() => toggleUserStatus(u.id)}
                      className={`px-2.5 py-1 rounded font-medium text-[11px] transition ${
                        u.status === 'Active'
                          ? 'bg-red-50 text-red-600 hover:bg-red-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {u.status === 'Active' ? 'Freeze' : 'Unfreeze'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}