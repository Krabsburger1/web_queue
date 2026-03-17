import React, { useState } from 'react'
import { Users, UserCheck, CheckCircle, Play, Check, XCircle, Ban, UserX, Calendar } from 'lucide-react'
import { getLocalDateString } from '../../shared/dateUtils'
import StatusBadge from '../shared/StatusBadge'
import Button from '../shared/Button'

export default function QueueTab({ bookings, onUpdateStatus, onCallNext }) {
    const [selectedDate, setSelectedDate] = useState(() => getLocalDateString())

    const todayBookings = bookings
        .filter(b => b.date === selectedDate)
        .sort((a, b) => {
            if (a.type === 'slot' && b.type === 'slot') return (a.slotTime || '').localeCompare(b.slotTime || '')
            if (a.type === 'live' && b.type === 'live') return (a.queuePosition || 0) - (b.queuePosition || 0)
            if (a.type === 'slot') return -1
            return 1
        })


    const waitingCount = todayBookings.filter(b => b.status === 'waiting').length
    const inProgressCount = todayBookings.filter(b => b.status === 'in-progress').length
    const doneCount = todayBookings.filter(b => b.status === 'done').length

    const summaryCards = [
        { label: 'Waiting', value: waitingCount, icon: Users, color: 'bg-amber-50 text-amber-700 border-amber-200' },
        { label: 'In Progress', value: inProgressCount, icon: UserCheck, color: 'bg-blue-50 text-blue-700 border-blue-200' },
        { label: 'Done Today', value: doneCount, icon: CheckCircle, color: 'bg-green-50 text-green-700 border-green-200' },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-gray-900">Queue & Appointments</h2>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
                        <Calendar size={16} className="text-green-600" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
                        />
                    </div>
                </div>
                <Button onClick={onCallNext} size="sm">
                    <Play size={14} />
                    Call Next Client
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
                {summaryCards.map(card => {
                    const Icon = card.icon
                    return (
                        <div key={card.label} className={`rounded-xl border p-4 ${card.color}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <Icon size={18} />
                                <span className="text-sm font-medium">{card.label}</span>
                            </div>
                            <p className="text-2xl font-bold">{card.value}</p>
                        </div>
                    )
                })}
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Client Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Phone</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Type</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Time / Position</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                                <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-gray-400">
                                        No bookings for {selectedDate === getLocalDateString() ? 'today' : selectedDate}
                                    </td>
                                </tr>
                            ) : (
                                todayBookings.map((b, i) => (
                                    <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 font-medium text-gray-500">{i + 1}</td>
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
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-1">
                                                {b.status === 'waiting' && (
                                                    <button
                                                        onClick={() => onUpdateStatus(b.id, 'in-progress')}
                                                        title="Start"
                                                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors cursor-pointer"
                                                    >
                                                        <Play size={14} />
                                                    </button>
                                                )}
                                                {(b.status === 'waiting' || b.status === 'in-progress') && (
                                                    <>
                                                        <button
                                                            onClick={() => onUpdateStatus(b.id, 'done')}
                                                            title="Done"
                                                            className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors cursor-pointer"
                                                        >
                                                            <Check size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => onUpdateStatus(b.id, 'no-show')}
                                                            title="No Show"
                                                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                                                        >
                                                            <UserX size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => onUpdateStatus(b.id, 'cancelled')}
                                                            title="Cancel"
                                                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors cursor-pointer"
                                                        >
                                                            <Ban size={14} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
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
