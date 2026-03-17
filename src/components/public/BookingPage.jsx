import React, { useState } from 'react'
import { CalendarDays, Users } from 'lucide-react'
import SlotPicker from './SlotPicker'
import LiveQueueJoin from './LiveQueueJoin'
import BookingForm from './BookingForm'

export default function BookingPage({
    settings,
    generateTimeSlots,
    getBookedSlots,
    getLiveQueueCount,
    getNextQueuePosition,
    addBooking,
    onBookingComplete,
}) {
    const [activeTab, setActiveTab] = useState('slot')
    const [showForm, setShowForm] = useState(false)
    const [selectedSlot, setSelectedSlot] = useState({ date: null, time: null })

    const handleSlotSelect = (date, time) => {
        setSelectedSlot({ date, time })
        setShowForm(true)
    }

    const handleJoinQueue = () => {
        setShowForm(true)
    }

    const handleSubmit = ({ name, phone }) => {
        let booking
        if (activeTab === 'slot') {
            booking = addBooking({
                name,
                phone,
                type: 'slot',
                slotTime: selectedSlot.time,
                queuePosition: null,
                date: selectedSlot.date,
            })
        } else {
            booking = addBooking({
                name,
                phone,
                type: 'live',
                slotTime: null,
                queuePosition: getNextQueuePosition(),
            })
        }
        setShowForm(false)
        onBookingComplete(booking)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/30">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                            <span className="text-white font-bold text-lg">Q</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Online Queue</h1>
                            <p className="text-xs text-gray-400">Quick and convenient appointment booking</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6">
                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex border-b border-gray-100">
                        <button
                            onClick={() => setActiveTab('slot')}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 font-medium text-sm transition-all cursor-pointer
                ${activeTab === 'slot'
                                    ? 'text-green-700 bg-green-50 border-b-2 border-green-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <CalendarDays size={18} />
                            Book by Time
                        </button>
                        <button
                            onClick={() => setActiveTab('live')}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 font-medium text-sm transition-all cursor-pointer
                ${activeTab === 'live'
                                    ? 'text-green-700 bg-green-50 border-b-2 border-green-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Users size={18} />
                            Live Queue
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'slot' ? (
                            settings.acceptSlots ? (
                                <SlotPicker
                                    settings={settings}
                                    getBookedSlots={getBookedSlots}
                                    generateTimeSlots={generateTimeSlots}
                                    onSelectSlot={handleSlotSelect}
                                />
                            ) : (
                                <div className="text-center py-12">
                                    <CalendarDays size={40} className="text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500 font-medium">Slot booking is currently unavailable</p>
                                    <p className="text-gray-400 text-sm mt-1">Please try the live queue</p>
                                </div>
                            )
                        ) : (
                            <LiveQueueJoin
                                queueCount={getLiveQueueCount()}
                                onJoin={handleJoinQueue}
                                acceptLive={settings.acceptLive}
                            />
                        )}
                    </div>
                </div>
            </main>

            <BookingForm
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleSubmit}
                bookingType={activeTab}
                slotTime={selectedSlot.time}
                slotDate={selectedSlot.date}
            />
        </div>
    )
}
