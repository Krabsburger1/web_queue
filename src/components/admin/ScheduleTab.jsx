import React, { useState } from 'react'
import { Clock, CalendarOff, Coffee, ToggleLeft, ToggleRight, Plus, X, ListTodo, ShieldCheck } from 'lucide-react'
import Button from '../shared/Button'

export default function ScheduleTab({ settings, onUpdate, onToggleBlockedDate, onToggleBlockedSlot, generateTimeSlots }) {
    const [newBlockedDate, setNewBlockedDate] = useState('')
    const allSlots = generateTimeSlots()

    return (
        <div className="space-y-6 max-w-2xl px-1 pb-16 md:pb-0">
            <h2 className="text-xl font-bold text-gray-900">Schedule Settings</h2>

            {/* Working Hours & Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Hours Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock size={18} className="text-green-600" />
                        <h3 className="font-bold text-gray-900 tracking-tight">Business Hours</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Open</label>
                            <input
                                type="time"
                                value={settings.workStart}
                                onChange={e => onUpdate({ workStart: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Close</label>
                            <input
                                type="time"
                                value={settings.workEnd}
                                onChange={e => onUpdate({ workEnd: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="col-span-2 space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Slot Size</label>
                            <select
                                value={settings.slotDuration}
                                onChange={e => onUpdate({ slotDuration: Number(e.target.value) })}
                                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-green-500 cursor-pointer appearance-none"
                            >
                                <option value={15}>15 Minutes</option>
                                <option value={20}>20 Minutes</option>
                                <option value={30}>30 Minutes</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Channels Card */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck size={18} className="text-blue-600" />
                        <h3 className="font-bold text-gray-900 tracking-tight">Booking Flow</h3>
                    </div>

                    <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl cursor-pointer group hover:bg-green-50/50 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-700">Online Slots</span>
                                <span className="text-[10px] text-gray-400">Allow time bookings</span>
                            </div>
                            <button
                                onClick={() => onUpdate({ acceptSlots: !settings.acceptSlots })}
                                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none"
                            >
                                {settings.acceptSlots ? (
                                    <ToggleRight size={38} className="text-green-600" />
                                ) : (
                                    <ToggleLeft size={38} className="text-gray-300" />
                                )}
                            </button>
                        </label>

                        <label className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl cursor-pointer group hover:bg-green-50/50 transition-colors">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-gray-700">Live Queue</span>
                                <span className="text-[10px] text-gray-400">Allow instant joins</span>
                            </div>
                            <button
                                onClick={() => onUpdate({ acceptLive: !settings.acceptLive })}
                                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none"
                            >
                                {settings.acceptLive ? (
                                    <ToggleRight size={38} className="text-green-600" />
                                ) : (
                                    <ToggleLeft size={38} className="text-gray-300" />
                                )}
                            </button>
                        </label>
                    </div>
                </div>
            </div>

            {/* Blocked Dates */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <CalendarOff size={18} className="text-red-500" />
                    <h3 className="font-bold text-gray-900 tracking-tight">Restricted Dates</h3>
                </div>

                <div className="flex gap-2">
                    <input
                        type="date"
                        value={newBlockedDate}
                        onChange={e => setNewBlockedDate(e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-2xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-green-500"
                    />
                    <Button
                        onClick={() => {
                            if (newBlockedDate) {
                                onToggleBlockedDate(newBlockedDate)
                                setNewBlockedDate('')
                            }
                        }}
                        className="rounded-2xl shadow-md"
                    >
                        <Plus size={18} />
                    </Button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {settings.blockedDates.length > 0 ? (
                        settings.blockedDates.map(d => (
                            <div key={d} className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-700 rounded-xl text-xs font-black border border-red-100">
                                {d}
                                <button onClick={() => onToggleBlockedDate(d)} className="hover:text-red-900">
                                    <X size={14} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-gray-400 italic">No holidays or blocked dates added.</p>
                    )}
                </div>
            </div>

            {/* Blocked Time Slots - Dense Grid for Mobile */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Coffee size={18} className="text-amber-500" />
                    <h3 className="font-bold text-gray-900 tracking-tight">Fixed Breaks</h3>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">Select slots to block (e.g. Lunch)</p>

                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {allSlots.map(slot => {
                        const isBlocked = settings.blockedSlots.includes(slot)
                        return (
                            <button
                                key={slot}
                                onClick={() => onToggleBlockedSlot(slot)}
                                className={`py-2 px-1 rounded-xl text-[10px] font-black transition-all border-2
                  ${isBlocked
                                        ? 'bg-red-500 text-white border-red-500 shadow-sm'
                                        : 'bg-white text-gray-400 border-gray-100 hover:border-green-300'
                                    }`}
                            >
                                {slot}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

