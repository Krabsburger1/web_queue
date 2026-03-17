import { useState, useCallback, useEffect } from 'react'
import { getLocalDateString } from '../shared/dateUtils'

const BOOKINGS_KEY = 'finbank_bookings'

function generateId() {
    return Math.random().toString(36).substring(2, 9)
}

// No module-level 'today' constant to avoid stale dates in long sessions



const seedBookings = [
    {
        id: generateId(),
        name: 'Alexander Petrov',
        phone: '+1 (555) 101-2001',
        type: 'slot',
        slotTime: '09:30',
        queuePosition: null,
        status: 'waiting',
        date: getLocalDateString(),
        createdAt: new Date().toISOString(),
    },
    {
        id: generateId(),
        name: 'Maria Johnson',
        phone: '+1 (555) 202-3002',
        type: 'slot',
        slotTime: '11:00',
        queuePosition: null,
        status: 'in-progress',
        date: getLocalDateString(),
        createdAt: new Date().toISOString(),
    },
    {
        id: generateId(),
        name: 'David Chen',
        phone: '+1 (555) 303-4003',
        type: 'live',
        slotTime: null,
        queuePosition: 1,
        status: 'waiting',
        date: getLocalDateString(),
        createdAt: new Date().toISOString(),
    },
    {
        id: generateId(),
        name: 'Sarah Williams',
        phone: '+1 (555) 404-5004',
        type: 'live',
        slotTime: null,
        queuePosition: 2,
        status: 'waiting',
        date: getLocalDateString(),
        createdAt: new Date().toISOString(),
    },
    {
        id: generateId(),
        name: 'James Rodriguez',
        phone: '+1 (555) 505-6005',
        type: 'slot',
        slotTime: '14:00',
        queuePosition: null,
        status: 'done',
        date: getLocalDateString(),
        createdAt: new Date().toISOString(),
    },
]

export default function useBookings() {
    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem(BOOKINGS_KEY)
        return saved ? JSON.parse(saved) : seedBookings
    })

    useEffect(() => {
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
    }, [bookings])

    const addBooking = useCallback((booking) => {
        const today = getLocalDateString()
        const newBooking = {
            ...booking,
            id: generateId(),
            status: 'waiting',
            date: booking.date || today,
            createdAt: new Date().toISOString(),
        }
        setBookings(prev => [...prev, newBooking])
        return newBooking
    }, [])

    const updateStatus = useCallback((id, status) => {
        setBookings(prev =>
            prev.map(b => (b.id === id ? { ...b, status } : b))
        )
    }, [])

    const cancelByPhone = useCallback((phone) => {
        setBookings(prev =>
            prev.map(b =>
                b.phone === phone && (b.status === 'waiting' || b.status === 'in-progress')
                    ? { ...b, status: 'cancelled' }
                    : b
            )
        )
    }, [])

    const callNextLive = useCallback(() => {
        const today = getLocalDateString()
        setBookings(prev => {
            const liveWaiting = prev
                .filter(b => b.type === 'live' && b.status === 'waiting' && b.date === today)
                .sort((a, b) => a.queuePosition - b.queuePosition)

            if (liveWaiting.length === 0) return prev

            const nextId = liveWaiting[0].id
            return prev.map(b => (b.id === nextId ? { ...b, status: 'in-progress' } : b))
        })
    }, [])

    const getTodayBookings = useCallback(() => {
        const today = getLocalDateString()
        return bookings.filter(b => b.date === today)
    }, [bookings])

    const getBookedSlots = useCallback((date) => {
        return bookings
            .filter(b => b.date === date && b.type === 'slot' && b.status !== 'cancelled')
            .map(b => b.slotTime)
    }, [bookings])

    const getLiveQueueCount = useCallback(() => {
        const today = getLocalDateString()
        return bookings.filter(
            b => b.type === 'live' && b.status === 'waiting' && b.date === today
        ).length
    }, [bookings])

    const getNextQueuePosition = useCallback(() => {
        const today = getLocalDateString()
        const liveBookings = bookings.filter(b => b.type === 'live' && b.date === today)
        if (liveBookings.length === 0) return 1
        return Math.max(...liveBookings.map(b => b.queuePosition || 0)) + 1
    }, [bookings])

    return {
        bookings,
        addBooking,
        updateStatus,
        cancelByPhone,
        callNextLive,
        getTodayBookings,
        getBookedSlots,
        getLiveQueueCount,
        getNextQueuePosition,
    }
}


