"use client";

import Image from "next/image";

export default function TeamCollaboration() {
    const team = [
        { name: "Alexandra Deff", task: "Github Project Repository", status: "Completed", avatar: null, initials: "AD", color: "bg-gradient-to-br from-cyan-100 to-cyan-200 text-cyan-700" },
        { name: "Edwin Adenike", task: "Integrate User Authentication System", status: "In Progress", avatar: null, initials: "EA", color: "bg-gradient-to-br from-violet-100 to-violet-200 text-violet-700" },
        { name: "Isaac Oluwatemilrun", task: "Develop Search and Filter Functionality", status: "Pending", avatar: null, initials: "IO", color: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700" },
        { name: "David Oshodi", task: "Responsive Layout for Homepage", status: "In Progress", avatar: null, initials: "DO", color: "bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700" },
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Completed':
                return 'bg-cyan-50 text-cyan-600';
            case 'In Progress':
                return 'bg-violet-50 text-violet-600';
            case 'Pending':
                return 'bg-slate-100 text-slate-500';
            default:
                return 'bg-slate-100 text-slate-500';
        }
    };

    return (
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900 text-lg">Team Collaboration</h3>
                <button className="text-xs font-bold border border-slate-200 px-4 py-2 rounded-full text-slate-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-violet-50 hover:border-cyan-200 transition-all">
                    + Add Member
                </button>
            </div>

            <div className="space-y-4">
                {team.map((member, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gradient-to-r hover:from-cyan-50/50 hover:to-violet-50/50 -mx-3 px-3 py-2 rounded-xl transition-all">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${member.color} flex items-center justify-center font-bold text-sm`}>
                                {member.initials}
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 text-sm">{member.name}</h4>
                                <p className="text-xs text-slate-500">Working on <span className="font-medium">{member.task}</span></p>
                            </div>
                        </div>
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${getStatusStyle(member.status)}`}>
                            {member.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
