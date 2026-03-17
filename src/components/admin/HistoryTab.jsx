import React, { useState, useMemo } from 'react'
import { Filter, BarChart3 } from 'lucide-react'
import StatusBadge from '../shared/StatusBadge'

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
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Booking History</h2>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <BarChart3 size={16} className="text-green-600" />
                        <span className="text-sm text-gray-500">Total Served</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <BarChart3 size={16} className="text-blue-600" />
                        <span className="text-sm text-gray-500">Avg Wait Time</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">~{stats.avgWait} min</p>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <BarChart3 size={16} className="text-red-500" />
                        <span className="text-sm text-gray-500">No-Show Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{stats.noShowRate}%</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Filter size={16} className="text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">Filters</span>
                </div>
                <div className="flex gap-3">
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={e => setDateFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                    >
                        <option value="all">All Statuses</option>
                        <option value="waiting">Waiting</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="no-show">No Show</option>
                    </select>
                    <select
                        value={typeFilter}
                        onChange={e => setTypeFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                    >
                        <option value="all">All Types</option>
                        <option value="slot">Slot</option>
                        <option value="live">Live</option>
                    </select>
                    {(dateFilter || statusFilter !== 'all' || typeFilter !== 'all') && (
                        <button
                            onClick={() => {
                                setDateFilter('')
                                setStatusFilter('all')
                                setTypeFilter('all')
                            }}
                            className="text-sm text-green-600 hover:text-green-700 font-medium cursor-pointer"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Client Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Phone</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Type</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Time / Position</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-gray-400">
                                        No bookings match the selected filters
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map(b => (
                                    <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 text-gray-700">{b.date}</td>
                                        <td className="py-3 px-4 font-medium text-gray-900">{b.name}</td>
                                        <td className="py-3 px-4 text-gray-600">{b.phone}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                        ${b.type === 'slot' ? 'bg-purple-50 text-purple-700' : 'bg-cyan-50 text-cyan-700'}`}>
                                                {b.type === 'slot' ? 'Slot' : 'Live'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-700 font-medium">
                                            {b.type === 'slot' ? b.slotTime : `#${b.queuePosition}`}
                                        </td>
                                        <td className="py-3 px-4">
                                            <StatusBadge status={b.status} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
