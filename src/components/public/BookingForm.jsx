import React, { useState } from 'react'
import { User, Phone } from 'lucide-react'
import Modal from '../shared/Modal'
import Button from '../shared/Button'

export default function BookingForm({ isOpen, onClose, onSubmit, bookingType, slotTime, slotDate }) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [errors, setErrors] = useState({})

    const validate = () => {
        const errs = {}
        if (!name.trim()) errs.name = 'Full name is required'
        if (!phone.trim()) {
            errs.phone = 'Phone number is required'
        } else if (!/^[\d\s+\-()]{7,}$/.test(phone.trim())) {
            errs.phone = 'Please enter a valid phone number'
        }
        setErrors(errs)
        return Object.keys(errs).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validate()) return
        onSubmit({ name: name.trim(), phone: phone.trim() })
        setName('')
        setPhone('')
        setErrors({})
    }

    const handleClose = () => {
        setName('')
        setPhone('')
        setErrors({})
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Book an Appointment">
            <form onSubmit={handleSubmit} className="space-y-4">
                {bookingType === 'slot' && slotTime && (
                    <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">⏰</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-green-800">Time Slot Selected</p>
                            <p className="text-xs text-green-600">{slotDate} at {slotTime}</p>
                        </div>
                    </div>
                )}

                {bookingType === 'live' && (
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">#</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-blue-800">Live Queue</p>
                            <p className="text-xs text-blue-600">You'll get the next available position</p>
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm
                ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        />
                    </div>
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                    <div className="relative">
                        <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm
                ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        />
                    </div>
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div className="pt-2">
                    <Button type="submit" className="w-full" size="lg">
                        Confirm Booking
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
