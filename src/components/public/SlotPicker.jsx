import React, { useState, useMemo } from 'react'
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { getLocalDateString } from '../../shared/dateUtils'

export default function SlotPicker({ settings, getBookedSlots, generateTimeSlots, onSelectSlot }) {
    const [selectedDate, setSelectedDate] = useState(() => getLocalDateString())

    const dates = useMemo(() => {
        const result = []
        for (let i = 0; i < 8; i++) {
            const d = new Date()
            d.setDate(d.getDate() + i)
            result.push({
                date: getLocalDateString(d),

                day: d.toLocaleDateString('en-US', { weekday: 'short' }),
                dayNum: d.getDate(),
                month: d.toLocaleDateString('en-US', { month: 'short' }),
                isToday: i === 0,
            })
        }
        return result
    }, [])

    const [dateOffset, setDateOffset] = useState(0)
    const visibleDates = dates.slice(dateOffset, dateOffset + (window.innerWidth < 640 ? 3 : 4))

    const allSlots = generateTimeSlots()
    const bookedSlots = getBookedSlots(selectedDate)
    const isBlocked = settings.blockedDates.includes(selectedDate)

    const [selectedSlot, setSelectedSlot] = useState(null)

    const handleSlotClick = (time) => {
        if (bookedSlots.includes(time) || settings.blockedSlots.includes(time)) return
        setSelectedSlot(time)
        onSelectSlot(selectedDate, time)
    }

    return (
        <div className="space-y-6">
            {/* Date Selector */}
            <div className="px-1">
                <div className="flex items-center gap-2 mb-4">
                    <Calendar size={18} className="text-green-600" />
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">1. Select Date</h3>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <button
                        onClick={() => setDateOffset(Math.max(0, dateOffset - 1))}
                        disabled={dateOffset === 0}
                        className="p-2 rounded-xl hover:bg-green-50 disabled:opacity-20 transition-all cursor-pointer disabled:cursor-not-allowed group"
                    >
                        <ChevronLeft size={20} className="group-active:scale-90 transition-transform" />
                    </button>
                    <div className="flex gap-2 flex-1">
                        {visibleDates.map(d => (
                            <button
                                key={d.date}
                                onClick={() => { setSelectedDate(d.date); setSelectedSlot(null) }}
                                className={`flex-1 py-4 px-1 rounded-2xl text-center transition-all duration-300 border-2 cursor-pointer active:scale-95
                  ${selectedDate === d.date
                                        ? 'bg-green-600 text-white border-green-600 shadow-xl shadow-green-200 -translate-y-1'
                                        : 'bg-white border-gray-100 hover:border-green-200 text-gray-700'
                                    }`}
                            >
                                <div className={`text-[10px] font-black uppercase tracking-tighter mb-1 ${selectedDate === d.date ? 'text-green-200' : 'text-gray-400'}`}>
                                    {d.day}
                                </div>
                                <div className="text-xl font-black">{d.dayNum}</div>
                                <div className={`text-[9px] font-bold mt-1 ${selectedDate === d.date ? 'text-green-200' : 'text-gray-400'}`}>
                                    {d.month}
                                </div>
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setDateOffset(Math.min(dates.length - (window.innerWidth < 640 ? 3 : 4), dateOffset + 1))}
                        disabled={dateOffset >= dates.length - (window.innerWidth < 640 ? 3 : 4)}
                        className="p-2 rounded-xl hover:bg-green-50 disabled:opacity-20 transition-all cursor-pointer disabled:cursor-not-allowed group"
                    >
                        <ChevronRight size={20} className="group-active:scale-90 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Time Slots */}
            <div className="px-1">
                <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-green-600" />
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">2. Select Time</h3>
                </div>

                {isBlocked ? (
                    <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <Calendar size={32} className="mx-auto text-gray-300 mb-2" />
                        <p className="text-gray-500 font-bold">Closed Today</p>
                        <p className="text-gray-400 text-xs mt-1 px-4 text-balance">Please choose another date for your visit.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                        {allSlots.map(time => {
                            const isBooked = bookedSlots.includes(time)
                            const isBlockedSlot = settings.blockedSlots.includes(time)
                            const isSelected = selectedSlot === time
                            const isDisabled = isBooked || isBlockedSlot

                            return (
                                <button
                                    key={time}
                                    onClick={() => handleSlotClick(time)}
                                    disabled={isDisabled}
                                    className={`py-3.5 px-2 rounded-2xl text-sm font-black transition-all duration-300 border-2 cursor-pointer active:scale-95
                    ${isDisabled
                                            ? 'bg-gray-50 text-gray-300 border-gray-50 cursor-not-allowed opacity-40 line-through scale-95'
                                            : isSelected
                                                ? 'bg-green-600 text-white border-green-600 shadow-xl shadow-green-200 -translate-y-1'
                                                : 'bg-white text-gray-700 border-gray-100 hover:border-green-500 hover:shadow-lg'
                                        }`}
                                >
                                    {time}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

