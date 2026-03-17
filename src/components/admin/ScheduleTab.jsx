import React, { useState } from 'react'
import { Clock, CalendarOff, Coffee, ToggleLeft, ToggleRight, Plus, X, Trash2 } from 'lucide-react'
import Button from '../shared/Button'

export default function ScheduleTab({ settings, onUpdate, onToggleBlockedDate, onToggleBlockedSlot, generateTimeSlots }) {
    const [newBlockedDate, setNewBlockedDate] = useState('')

    const allSlots = generateTimeSlots()

    return (
        <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900">Schedule Settings</h2>

            {/* Working Hours */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-green-600" />
                    <h3 className="font-semibold text-gray-900">Working Hours</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Start Time</label>
                        <input
                            type="time"
                            value={settings.workStart}
                            onChange={e => onUpdate({ workStart: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">End Time</label>
                        <input
                            type="time"
                            value={settings.workEnd}
                            onChange={e => onUpdate({ workEnd: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Slot Duration</label>
                        <select
                            value={settings.slotDuration}
                            onChange={e => onUpdate({ slotDuration: Number(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                        >
                            <option value={15}>15 minutes</option>
                            <option value={20}>20 minutes</option>
                            <option value={30}>30 minutes</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Toggles */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
                <h3 className="font-semibold text-gray-900">Booking Channels</h3>

                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="text-sm font-medium text-gray-700">Accept Slot Bookings</p>
                        <p className="text-xs text-gray-400">Allow clients to book specific time slots</p>
                    </div>
                    <button
                        onClick={() => onUpdate({ acceptSlots: !settings.acceptSlots })}
                        className="cursor-pointer"
                    >
                        {settings.acceptSlots ? (
                            <ToggleRight size={36} className="text-green-600" />
                        ) : (
                            <ToggleLeft size={36} className="text-gray-300" />
                        )}
                    </button>
                </div>

                <div className="border-t border-gray-100" />

                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="text-sm font-medium text-gray-700">Accept Live Queue</p>
                        <p className="text-xs text-gray-400">Allow clients to join the live queue</p>
                    </div>
                    <button
                        onClick={() => onUpdate({ acceptLive: !settings.acceptLive })}
                        className="cursor-pointer"
                    >
                        {settings.acceptLive ? (
                            <ToggleRight size={36} className="text-green-600" />
                        ) : (
                            <ToggleLeft size={36} className="text-gray-300" />
                        )}
                    </button>
                </div>
            </div>

            {/* Blocked Dates */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-4">
                    <CalendarOff size={18} className="text-green-600" />
                    <h3 className="font-semibold text-gray-900">Blocked Dates</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3">Days off, holidays, or other closures</p>

                <div className="flex gap-2 mb-3">
                    <input
                        type="date"
                        value={newBlockedDate}
                        onChange={e => setNewBlockedDate(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <Button
                        size="sm"
                        onClick={() => {
                            if (newBlockedDate) {
                                onToggleBlockedDate(newBlockedDate)
                                setNewBlockedDate('')
                            }
                        }}
                    >
                        <Plus size={14} />
                        Add
                    </Button>
                </div>

                {settings.blockedDates.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {settings.blockedDates.map(d => (
                            <span key={d} className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-sm border border-red-200">
                                {d}
                                <button onClick={() => onToggleBlockedDate(d)} className="hover:text-red-900 cursor-pointer">
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-400">No dates blocked</p>
                )}
            </div>

            {/* Blocked Time Slots */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-2 mb-4">
                    <Coffee size={18} className="text-green-600" />
                    <h3 className="font-semibold text-gray-900">Blocked Time Slots</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3">Lunch breaks, meetings, or other recurring blocks</p>

                <div className="grid grid-cols-6 gap-2">
                    {allSlots.map(slot => {
                        const isBlocked = settings.blockedSlots.includes(slot)
                        return (
                            <button
                                key={slot}
                                onClick={() => onToggleBlockedSlot(slot)}
                                className={`py-2 px-2 rounded-lg text-xs font-medium transition-all border cursor-pointer
                  ${isBlocked
                                        ? 'bg-red-50 text-red-700 border-red-200'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-green-300 hover:bg-green-50'
                                    }`}
                            >
                                {slot}
                            </button>
                        )
                    })}
                </div>
                {settings.blockedSlots.length > 0 && (
                    <p className="text-xs text-gray-400 mt-2">{settings.blockedSlots.length} time slot(s) blocked</p>
                )}
            </div>
        </div>
    )
}
