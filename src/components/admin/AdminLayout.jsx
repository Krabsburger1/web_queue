import React from 'react'
import { LayoutDashboard, CalendarCog, History, LogOut, Menu } from 'lucide-react'

export default function AdminLayout({ activeTab, onTabChange, onLogout, children }) {
    const navItems = [
        { id: 'queue', label: 'Queue', icon: LayoutDashboard },
        { id: 'schedule', label: 'Schedule', icon: CalendarCog },
        { id: 'history', label: 'History', icon: History },
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Mobile Top Header */}
            <header className="md:hidden bg-green-950 text-white p-4 flex items-center justify-between sticky top-0 z-20 shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Q</span>
                    </div>
                    <h1 className="font-bold text-sm tracking-tight">Online Queue <span className="text-green-400 font-normal">Admin</span></h1>
                </div>
                <button
                    onClick={onLogout}
                    className="p-2 text-green-300 hover:bg-green-800 rounded-lg"
                >
                    <LogOut size={18} />
                </button>
            </header>

            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-green-950 text-white flex-col shrink-0">
                <div className="p-5 border-b border-green-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">Q</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-base">Online Queue</h1>
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
                                {item.label === 'Queue' ? 'Queue & Appointments' : item.label + (item.id === 'schedule' ? ' Settings' : '')}
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

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around py-2 px-1 z-20 pb-safe">
                {navItems.map(item => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-all
                ${isActive ? 'text-green-600' : 'text-gray-400'}`}
                        >
                            <Icon size={20} className={isActive ? 'scale-110' : ''} />
                            <span className="text-[10px] font-medium tracking-wide border-0">{item.label}</span>
                        </button>
                    )
                })}
            </nav>

            {/* Content */}
            <main className="flex-1 overflow-auto pb-20 md:pb-0">
                <div className="p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

