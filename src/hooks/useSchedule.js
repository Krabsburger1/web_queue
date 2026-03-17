import { useState, useCallback, useEffect } from 'react'

const SETTINGS_KEY = 'finbank_settings'

const defaultSettings = {
    workStart: '09:00',
    workEnd: '17:00',
    slotDuration: 30,
    acceptLive: true,
    acceptSlots: true,
    blockedDates: [],
    blockedSlots: [],
}

export default function useSchedule() {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem(SETTINGS_KEY)
        return saved ? JSON.parse(saved) : defaultSettings
    })

    useEffect(() => {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    }, [settings])

    const updateSettings = useCallback((updates) => {
        setSettings(prev => ({ ...prev, ...updates }))
    }, [])

    const toggleBlockedDate = useCallback((date) => {
        setSettings(prev => {
            const exists = prev.blockedDates.includes(date)
            return {
                ...prev,
                blockedDates: exists
                    ? prev.blockedDates.filter(d => d !== date)
                    : [...prev.blockedDates, date],
            }
        })
    }, [])

    const toggleBlockedSlot = useCallback((slot) => {
        setSettings(prev => {
            const exists = prev.blockedSlots.includes(slot)
            return {
                ...prev,
                blockedSlots: exists
                    ? prev.blockedSlots.filter(s => s !== slot)
                    : [...prev.blockedSlots, slot],
            }
        })
    }, [])

    const generateTimeSlots = useCallback(() => {
        const slots = []
        const [startH, startM] = settings.workStart.split(':').map(Number)
        const [endH, endM] = settings.workEnd.split(':').map(Number)
        const startMinutes = startH * 60 + startM
        const endMinutes = endH * 60 + endM

        for (let m = startMinutes; m < endMinutes; m += settings.slotDuration) {
            const h = Math.floor(m / 60)
            const min = m % 60
            const time = `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`
            slots.push(time)
        }
        return slots
    }, [settings.workStart, settings.workEnd, settings.slotDuration])

    return { settings, updateSettings, toggleBlockedDate, toggleBlockedSlot, generateTimeSlots }
}

