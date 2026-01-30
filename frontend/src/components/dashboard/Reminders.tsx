"use client";

import { Video } from "lucide-react";

export default function Reminders() {
    return (
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-slate-900 text-lg mb-6">Reminders</h3>

                <div className="mb-6">
                    <h4 className="font-bold text-slate-900 text-xl mb-1">Meeting with Arc Company</h4>
                    <p className="text-sm text-slate-500">Time: 02.00 pm - 04.00 pm</p>
                </div>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
                <Video size={18} />
                Start Meeting
            </button>
        </div>
    );
}
