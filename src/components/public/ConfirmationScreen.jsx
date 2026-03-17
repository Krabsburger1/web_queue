import React, { useState } from 'react'
import { CheckCircle, Clock, User, Phone as PhoneIcon, X } from 'lucide-react'
import Button from '../shared/Button'

export default function ConfirmationScreen({ booking, onCancel, onBack }) {
    const [showCancel, setShowCancel] = useState(false)
    const [cancelPhone, setCancelPhone] = useState('')
    const [cancelError, setCancelError] = useState('')

    const handleCancel = () => {
        if (cancelPhone.trim() === booking.phone) {
            onCancel(cancelPhone.trim())
            onBack()
        } else {
            setCancelError('Phone number does not match')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Success Header */}
                <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Booking Confirmed</h1>
                    <p className="text-gray-500 mt-1">Your appointment has been successfully booked</p>
                </div>

                {/* Booking Card */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="bg-green-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-xs uppercase tracking-wide">
                                    {booking.type === 'slot' ? 'Appointment Time' : 'Queue Position'}
                                </p>
                                <p className="text-white text-2xl font-bold mt-1">
                                    {booking.type === 'slot' ? booking.slotTime : `#${booking.queuePosition}`}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-green-100 text-xs uppercase tracking-wide">Date</p>
                                <p className="text-white font-semibold mt-1">{booking.date}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <User size={16} className="text-gray-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Client Name</p>
                                <p className="text-sm font-medium text-gray-900">{booking.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <PhoneIcon size={16} className="text-gray-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Phone</p>
                                <p className="text-sm font-medium text-gray-900">{booking.phone}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Clock size={16} className="text-gray-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">Specialist</p>
                                <p className="text-sm font-medium text-gray-900">Financial Manager</p>
                            </div>
                        </div>

                        {booking.type === 'live' && (
                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                                <p className="text-sm text-amber-700 font-medium">
                                    Estimated wait: ~{(booking.queuePosition || 1) * 15} minutes
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="px-6 pb-6 space-y-3">
                        <Button onClick={onBack} className="w-full" variant="secondary">
                            Back to Booking Page
                        </Button>

                        {!showCancel ? (
                            <button
                                onClick={() => setShowCancel(true)}
                                className="w-full text-center text-sm text-red-500 hover:text-red-600 cursor-pointer py-1"
                            >
                                Cancel Booking
                            </button>
                        ) : (
                            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                                <p className="text-sm text-red-700 font-medium mb-2">Confirm cancellation</p>
                                <p className="text-xs text-red-500 mb-3">Enter your phone number to cancel</p>
                                <input
                                    type="tel"
                                    value={cancelPhone}
                                    onChange={e => setCancelPhone(e.target.value)}
                                    placeholder="Your phone number"
                                    className="w-full px-3 py-2 border border-red-200 rounded-lg text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                                />
                                {cancelError && <p className="text-xs text-red-500 mb-2">{cancelError}</p>}
                                <div className="flex gap-2">
                                    <Button onClick={handleCancel} variant="danger" size="sm" className="flex-1">
                                        <X size={14} />
                                        Cancel Booking
                                    </Button>
                                    <Button onClick={() => setShowCancel(false)} variant="ghost" size="sm">
                                        Keep
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
