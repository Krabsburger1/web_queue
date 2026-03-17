import React, { useState } from 'react'
import { Users, UserCheck, CheckCircle, Play, Check, XCircle, Ban, UserX, Calendar, Clock, Phone, Hash } from 'lucide-react'
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
        { label: 'Waiting', value: waitingCount, icon: Users, color: 'text-amber-700 bg-amber-50 border-amber-200' },
        { label: 'Progress', value: inProgressCount, icon: UserCheck, color: 'text-blue-700 bg-blue-50 border-blue-200' },
        { label: 'Done', value: doneCount, icon: CheckCircle, color: 'text-green-700 bg-green-50 border-green-200' },
    ]

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Responsive Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-900">Queue & Appointments</h2>
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm w-fit">
                        <Calendar size={16} className="text-green-600" />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="text-sm font-medium text-gray-700 focus:outline-none cursor-pointer bg-transparent"
                        />
                    </div>
                </div>
                <Button onClick={onCallNext} className="w-full sm:w-auto shadow-md" size="sm">
                    <Play size={14} className="fill-current" />
                    Call Next Client
                </Button>
            </div>

            {/* Summary Cards - Horizontal scroll on mobile */}
            <div className="flex sm:grid sm:grid-cols-3 gap-3 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                {summaryCards.map(card => {
                    const Icon = card.icon
                    return (
                        <div key={card.label} className={`flex-shrink-0 w-32 sm:w-auto rounded-2xl border p-3 sm:p-4 ${card.color}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                                <span className="text-[10px] sm:text-sm font-medium uppercase tracking-wider">{card.label}</span>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold leading-none">{card.value}</p>
                        </div>
                    )
                })}
            </div>

            {/* Bookings View */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden md:block">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600">#</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Client Name</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Type</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Time / Pos</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Status</th>
                                    <th className="text-right py-4 px-6 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayBookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-gray-400">
                                            No bookings for {selectedDate === getLocalDateString() ? 'today' : selectedDate}
                                        </td>
                                    </tr>
                                ) : (
                                    todayBookings.map((b, i) => (
                                        <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6 text-gray-400 font-medium">{i + 1}</td>
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-gray-900">{b.name}</div>
                                                <div className="text-xs text-gray-400">{b.phone}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider
                          ${b.type === 'slot' ? 'bg-purple-100 text-purple-700' : 'bg-cyan-100 text-cyan-700'}`}>
                                                    {b.type === 'slot' ? 'Slot' : 'Live'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-1.5 font-bold text-gray-700">
                                                    {b.type === 'slot' ? (
                                                        <>
                                                            <Clock size={14} className="text-gray-400" />
                                                            {b.slotTime}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Hash size={14} className="text-gray-400" />
                                                            {b.queuePosition}
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <StatusBadge status={b.status} />
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-end gap-1">
                                                    <BookingActions booking={b} onUpdateStatus={onUpdateStatus} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card List View */}
                <div className="md:hidden divide-y divide-gray-100">
                    {todayBookings.length === 0 ? (
                        <div className="py-12 text-center text-gray-400">
                            No bookings for {selectedDate === getLocalDateString() ? 'today' : selectedDate}
                        </div>
                    ) : (
                        todayBookings.map((b, i) => (
                            <div key={b.id} className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="text-sm font-bold text-gray-900">{b.name}</div>
                                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                                            <Phone size={10} />
                                            {b.phone}
                                        </div>
                                    </div>
                                    <StatusBadge status={b.status} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-lg">
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter
                        ${b.type === 'slot' ? 'bg-purple-600 text-white' : 'bg-cyan-600 text-white'}`}>
                                            {b.type}
                                        </span>
                                        <span className="text-xs font-bold text-gray-700">
                                            {b.type === 'slot' ? b.slotTime : `#${b.queuePosition}`}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-1">
                                    <BookingActions booking={b} onUpdateStatus={onUpdateStatus} isMobile />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

function BookingActions({ booking, onUpdateStatus, isMobile }) {
    const btnClass = "flex-1 sm:flex-none p-2 rounded-xl transition-all flex items-center justify-center gap-2 text-xs font-bold"

    return (
        <div className="flex items-center gap-2 w-full sm:w-auto">
            {booking.status === 'waiting' && (
                <button
                    onClick={() => onUpdateStatus(booking.id, 'in-progress')}
                    className={`${btnClass} bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-95`}
                >
                    <Play size={14} className="fill-current" />
                    {isMobile && "Start"}
                </button>
            )}
            {(booking.status === 'waiting' || booking.status === 'in-progress') && (
                <>
                    <button
                        onClick={() => onUpdateStatus(booking.id, 'done')}
                        className={`${btnClass} bg-green-50 text-green-600 hover:bg-green-100 active:scale-95`}
                    >
                        <Check size={14} strokeWidth={3} />
                        {isMobile && "Done"}
                    </button>
                    <button
                        onClick={() => onUpdateStatus(booking.id, 'no-show')}
                        className={`${btnClass} bg-red-50 text-red-600 hover:bg-red-100 active:scale-95`}
                    >
                        <UserX size={14} />
                        {isMobile && "No-Show"}
                    </button>
                    <button
                        onClick={() => onUpdateStatus(booking.id, 'cancelled')}
                        className={`p-2 rounded-xl text-gray-400 hover:bg-gray-100 active:scale-95`}
                        title="Cancel"
                    >
                        <Ban size={14} />
                    </button>
                </>
            )}
        </div>
    )
}

