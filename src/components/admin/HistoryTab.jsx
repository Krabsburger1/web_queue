import React, { useState, useMemo } from 'react'
import { Filter, BarChart3, Calendar, Phone, Hash, Clock, Search } from 'lucide-react'
import StatusBadge from '../shared/StatusBadge'
import { getLocalDateString } from '../../shared/dateUtils'

export default function HistoryTab({ bookings }) {
    const [dateFilter, setDateFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [typeFilter, setTypeFilter] = useState('all')

    const filteredBookings = useMemo(() => {
        return bookings
            .filter(b => {
                if (dateFilter && b.date !== dateFilter) return false
                if (statusFilter !== 'all' && b.status !== statusFilter) return false
                if (typeFilter !== 'all' && b.type !== typeFilter) return false
                return true
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }, [bookings, dateFilter, statusFilter, typeFilter])

    const stats = useMemo(() => {
        const total = bookings.filter(b => b.status === 'done').length
        const noShows = bookings.filter(b => b.status === 'no-show').length
        const allCompleted = bookings.filter(b => ['done', 'no-show', 'cancelled'].includes(b.status))
        const noShowRate = allCompleted.length > 0 ? ((noShows / allCompleted.length) * 100).toFixed(1) : '0'
        const avgWait = total > 0 ? Math.round(total * 12 / total) : 0

        return { total, avgWait, noShowRate }
    }, [bookings])

    return (
        <div className="space-y-4 md:space-y-6 pb-12 md:pb-0">
            <h2 className="text-xl font-bold text-gray-900 px-1">Booking History</h2>

            {/* Stats Row - Adaptive Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <BarChart3 size={16} className="text-green-600" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Served</span>
                    </div>
                    <p className="text-2xl font-black text-gray-900 leading-none">{stats.total}</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock size={16} className="text-blue-600" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Avg Wait</span>
                    </div>
                    <p className="text-2xl font-black text-gray-900 leading-none">~{stats.avgWait}m</p>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm col-span-2 md:col-span-1">
                    <div className="flex items-center gap-2 mb-2">
                        <BarChart3 size={16} className="text-red-500" />
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">No-Show Rate</span>
                    </div>
                    <p className="text-2xl font-black text-gray-900 leading-none">{stats.noShowRate}%</p>
                </div>
            </div>

            {/* Filters - Wrapping on mobile */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={16} className="text-green-600" />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-500">Filters</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="flex-1 min-w-[140px]">
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={e => setDateFilter(e.target.value)}
                            className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-green-500 font-medium"
                        />
                    </div>
                    <div className="flex-1 min-w-[140px]">
                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-green-500 font-medium cursor-pointer appearance-none"
                        >
                            <option value="all">All Statuses</option>
                            <option value="waiting">Waiting</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="no-show">No Show</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[140px]">
                        <select
                            value={typeFilter}
                            onChange={e => setTypeFilter(e.target.value)}
                            className="w-full px-3 py-2.5 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-green-500 font-medium cursor-pointer appearance-none"
                        >
                            <option value="all">All Types</option>
                            <option value="slot">Slot</option>
                            <option value="live">Live</option>
                        </select>
                    </div>
                </div>
                {(dateFilter || statusFilter !== 'all' || typeFilter !== 'all') && (
                    <button
                        onClick={() => {
                            setDateFilter('')
                            setStatusFilter('all')
                            setTypeFilter('all')
                        }}
                        className="mt-3 text-xs font-bold text-green-600 uppercase tracking-widest hover:text-green-700 transition-colors"
                    >
                        Reset All Filters
                    </button>
                )}
            </div>

            {/* Bookings View */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Desktop View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="text-left py-4 px-6 font-semibold text-gray-600 italic">Date</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-600 italic">Client</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-600 italic">Type</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-600 italic">Position</th>
                                <th className="text-left py-4 px-6 font-semibold text-gray-600 italic">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center text-gray-400">
                                        <Search size={40} className="mx-auto mb-3 opacity-20" />
                                        No bookings match your criteria
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map(b => (
                                    <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                                        <td className="py-4 px-6 text-gray-500 font-medium">{b.date}</td>
                                        <td className="py-4 px-6">
                                            <div className="font-bold text-gray-900">{b.name}</div>
                                            <div className="text-xs text-gray-400">{b.phone}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter
                        ${b.type === 'slot' ? 'bg-purple-50 text-purple-700' : 'bg-cyan-50 text-cyan-700'}`}>
                                                {b.type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 font-bold text-gray-700">
                                            {b.type === 'slot' ? b.slotTime : `#${b.queuePosition}`}
                                        </td>
                                        <td className="py-4 px-6"><StatusBadge status={b.status} /></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile/Tablet Card View */}
                <div className="lg:hidden divide-y divide-gray-50">
                    {filteredBookings.length === 0 ? (
                        <div className="py-20 text-center text-gray-400 p-6">
                            <Search size={40} className="mx-auto mb-3 opacity-20" />
                            No matches found
                        </div>
                    ) : (
                        filteredBookings.map(b => (
                            <div key={b.id} className="p-4 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-xs font-black text-green-600 uppercase tracking-widest mb-0.5">{b.date}</div>
                                        <div className="text-sm font-bold text-gray-900">{b.name}</div>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                            <Phone size={10} /> {b.phone}
                                        </div>
                                    </div>
                                    <StatusBadge status={b.status} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 px-2 py-1.5 bg-gray-50 rounded-xl">
                                        <span className={`px-1.5 py-0.5 rounded-lg text-[9px] font-black uppercase text-white
                      ${b.type === 'slot' ? 'bg-purple-600' : 'bg-cyan-600'}`}>
                                            {b.type}
                                        </span>
                                        <span className="text-xs font-bold text-gray-700">
                                            {b.type === 'slot' ? b.slotTime : `#${b.queuePosition}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

