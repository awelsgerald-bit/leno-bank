import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VirtualCard from '../components/VirtualCard';

export default function Dashboard() {
  const [hideBalance, setHideBalance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animatedBalance, setAnimatedBalance] = useState(0);

  const targetBalance = 519.99;
  const accountNumber = "5959504955";
  const email = "charlie@test.com";

  // Simulate smooth loading + number count-up on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // 0.6s skeleton loader delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !hideBalance) {
      let start = 0;
      const duration = 1000; // 1 second count-up
      const steps = 30;
      const increment = targetBalance / steps;
      const stepTime = duration / steps;

      const counter = setInterval(() => {
        start += increment;
        if (start >= targetBalance) {
          setAnimatedBalance(targetBalance);
          clearInterval(counter);
        } else {
          setAnimatedBalance(start);
        }
      }, stepTime);

      return () => clearInterval(counter);
    }
  }, [loading, hideBalance]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-500">Account Overview</p>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          Active Status
        </div>
      </div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          
          {/* BALANCE CARD (SKELETON OR ACTUAL) */}
          {loading ? (
            <div className="bg-slate-200 animate-pulse h-36 rounded-xl w-full" />
          ) : (
            <div className="bg-slate-900 text-white p-6 rounded-xl shadow-sm border border-slate-800 relative">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Available Balance</span>
                <button 
                  onClick={() => setHideBalance(!hideBalance)}
                  className="text-slate-300 hover:text-white text-xs bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md transition flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {hideBalance ? 'Show' : 'Hide'}
                </button>
              </div>

              <h2 className="text-3xl md:text-4xl font-mono font-bold tracking-tight text-emerald-400">
                {hideBalance ? '••••••••' : `$${animatedBalance.toFixed(2)}`}
              </h2>
            </div>
          )}

          {/* QUICK ACTIONS */}
          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-200 animate-pulse h-24 rounded-xl" />
              <div className="bg-slate-200 animate-pulse h-24 rounded-xl" />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {/* Send Money (Clean SVG Icon) */}
              <Link 
                to="/transfer" 
                className="p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl shadow-xs transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mb-3 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-600 transition">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">Send Money</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Transfer funds instantly</p>
              </Link>

              {/* View History (Preserved 📊 Emoji) */}
              <Link 
                to="/history" 
                className="p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl shadow-xs transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center mb-3 group-hover:bg-slate-200 text-base transition">
                  📊
                </div>
                <h3 className="font-semibold text-slate-900 text-sm">View History</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Recent account activity</p>
              </Link>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Digital Debit Card</h3>
          {loading ? (
            <div className="bg-slate-200 animate-pulse h-52 rounded-xl w-full" />
          ) : (
            <VirtualCard accountNumber={accountNumber} email={email} />
          )}
        </div>

      </div>

    </div>
  );
}
