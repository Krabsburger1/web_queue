import React from 'react'
import { LayoutDashboard, CalendarCog, History, LogOut } from 'lucide-react'

export default function AdminLayout({ activeTab, onTabChange, onLogout, children }) {
    const navItems = [
        { id: 'queue', label: 'Queue & Appointments', icon: LayoutDashboard },
        { id: 'schedule', label: 'Schedule Settings', icon: CalendarCog },
        { id: 'history', label: 'History', icon: History },
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-green-950 text-white flex flex-col shrink-0">
                <div className="p-5 border-b border-green-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">F</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-base">FinBank</h1>
                            <p className="text-green-400 text-xs">Admin Panel</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-3 space-y-1">
                    {navItems.map(item => {
                        const Icon = item.icon
                        const isActive = activeTab === item.id
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer
                  ${isActive
                                        ? 'bg-green-700/50 text-white'
                                        : 'text-green-300 hover:bg-green-800/50 hover:text-white'
                                    }`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </button>
                        )
                    })}
                </nav>

                <div className="p-3 border-t border-green-800">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-green-300 hover:bg-red-500/20 hover:text-red-300 transition-all cursor-pointer"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    )
}
