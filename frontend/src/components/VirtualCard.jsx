import React, { useState } from 'react';

export default function VirtualCard({ accountNumber, email }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [cardColor, setCardColor] = useState('emerald');
  const [copied, setCopied] = useState(false);

  const formattedCardNumber = `4532 •••• •••• ${accountNumber.slice(-4)}`;
  const fullCardNumber = `4532 8901 2345 ${accountNumber.slice(-4)}`;

  const themes = {
    emerald: 'bg-gradient-to-tr from-slate-900 via-emerald-950 to-emerald-900 border border-emerald-800/40',
    obsidian: 'bg-gradient-to-tr from-zinc-950 via-neutral-900 to-zinc-900 border border-zinc-800',
    royal: 'bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 border border-indigo-900/40',
  };

  const copyToClipboard = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(fullCardNumber.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-sm mx-auto space-y-4">
      {/* --- CARD CONTAINER WITH 3D FLIP --- */}
      <div 
        className="w-full h-52 relative cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`w-full h-full duration-500 transform-style-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* === FRONT OF CARD === */}
          <div className={`absolute inset-0 w-full h-full rounded-xl p-6 text-white shadow-lg flex flex-col justify-between backface-hidden ${themes[cardColor]}`}>
            
            {/* Frozen Overlay */}
            {isFrozen && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md rounded-xl flex flex-col items-center justify-center z-20 gap-2">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="font-semibold uppercase tracking-widest text-cyan-300 text-xs">Card Temporarily Frozen</p>
              </div>
            )}

            {/* Top Row */}
            <div className="flex justify-between items-center">
              <span className="font-semibold tracking-widest text-sm text-slate-200">LENO BANK</span>
              <div className="w-9 h-6 bg-amber-200/80 rounded border border-amber-300/40 flex items-center justify-center">
                <div className="w-5 h-3 border-t border-b border-amber-700/30" />
              </div>
            </div>

            {/* Middle Row */}
            <div className="my-1">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Card Number</p>
              <div className="flex items-center justify-between">
                <p className="font-mono text-base tracking-widest text-slate-100">{isFlipped ? fullCardNumber : formattedCardNumber}</p>
                <button 
                  onClick={copyToClipboard}
                  className="text-[11px] font-medium bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded transition text-slate-200"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-slate-400">Cardholder</p>
                <p className="font-medium text-xs text-slate-200 truncate max-w-[180px]">{email || 'Valued Customer'}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-wider text-slate-400">Expires</p>
                <p className="font-mono text-xs text-slate-200">08/29</p>
              </div>
            </div>

          </div>

          {/* === BACK OF CARD === */}
          <div className={`absolute inset-0 w-full h-full rounded-xl py-6 text-white shadow-lg flex flex-col justify-between backface-hidden rotate-y-180 ${themes[cardColor]}`}>
            <div className="w-full h-9 bg-zinc-950 mt-1" />
            <div className="px-6 flex items-center justify-end">
              <div className="bg-white/10 px-3 py-1 rounded text-right border border-white/10">
                <p className="text-[9px] text-slate-400 uppercase">CVV</p>
                <p className="font-mono font-bold text-xs text-slate-100">842</p>
              </div>
            </div>
            <div className="px-6 text-center">
              <p className="text-[10px] text-slate-400">Tap to flip card back</p>
            </div>
          </div>

        </div>
      </div>

      {/* --- CARD CONTROLS --- */}
      <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200/80 text-xs">
        <button 
          onClick={() => setIsFrozen(!isFrozen)}
          className={`px-3 py-1.5 rounded-md font-medium transition ${isFrozen ? 'bg-cyan-900 text-cyan-200' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
        >
          {isFrozen ? 'Unfreeze Card' : 'Freeze Card'}
        </button>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-500 mr-1">Finish:</span>
          <button onClick={() => setCardColor('emerald')} className="w-4 h-4 rounded-full bg-emerald-900 ring-1 ring-offset-1 ring-emerald-700" />
          <button onClick={() => setCardColor('obsidian')} className="w-4 h-4 rounded-full bg-zinc-900 ring-1 ring-offset-1 ring-zinc-700" />
          <button onClick={() => setCardColor('royal')} className="w-4 h-4 rounded-full bg-indigo-950 ring-1 ring-offset-1 ring-indigo-700" />
        </div>
      </div>
    </div>
  );
}