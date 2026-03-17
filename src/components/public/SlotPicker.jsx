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
    const visibleDates = dates.slice(dateOffset, dateOffset + 4)

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
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Calendar size={18} className="text-green-600" />
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Select Date</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setDateOffset(Math.max(0, dateOffset - 1))}
                        disabled={dateOffset === 0}
                        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <div className="flex gap-2 flex-1">
                        {visibleDates.map(d => (
                            <button
                                key={d.date}
                                onClick={() => { setSelectedDate(d.date); setSelectedSlot(null) }}
                                className={`flex-1 py-3 px-2 rounded-xl text-center transition-all duration-200 border cursor-pointer
                  ${selectedDate === d.date
                                        ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-200'
                                        : 'bg-white border-gray-200 hover:border-green-300 hover:bg-green-50'
                                    }`}
                            >
                                <div className={`text-xs font-medium ${selectedDate === d.date ? 'text-green-100' : 'text-gray-400'}`}>
                                    {d.day}
                                </div>
                                <div className="text-lg font-bold">{d.dayNum}</div>
                                <div className={`text-xs ${selectedDate === d.date ? 'text-green-100' : 'text-gray-400'}`}>
                                    {d.month}
                                </div>
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setDateOffset(Math.min(dates.length - 4, dateOffset + 1))}
                        disabled={dateOffset >= dates.length - 4}
                        className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Time Slots */}
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Clock size={18} className="text-green-600" />
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Select Time</h3>
                </div>

                {isBlocked ? (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-gray-500 font-medium">This date is unavailable</p>
                        <p className="text-gray-400 text-sm mt-1">Please select another date</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-2">
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
                                    className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 border cursor-pointer
                    ${isDisabled
                                            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                                            : isSelected
                                                ? 'bg-green-600 text-white border-green-600 shadow-lg shadow-green-200 scale-105'
                                                : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:bg-green-50'
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
