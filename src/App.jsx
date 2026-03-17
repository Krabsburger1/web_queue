import React, { useState } from 'react'
import useAuth from './hooks/useAuth'
import useBookings from './hooks/useBookings'
import useSchedule from './hooks/useSchedule'
import BookingPage from './components/public/BookingPage'
import ConfirmationScreen from './components/public/ConfirmationScreen'
import LoginPage from './components/shared/LoginPage'
import AdminLayout from './components/admin/AdminLayout'
import QueueTab from './components/admin/QueueTab'
import ScheduleTab from './components/admin/ScheduleTab'
import HistoryTab from './components/admin/HistoryTab'

export default function App() {
  const { isAuthenticated, login, logout } = useAuth()
  const {
    bookings,
    addBooking,
    updateStatus,
    cancelByPhone,
    callNextLive,
    getBookedSlots,
    getLiveQueueCount,
    getNextQueuePosition,
  } = useBookings()
  const { settings, updateSettings, toggleBlockedDate, toggleBlockedSlot, generateTimeSlots } = useSchedule()

  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const [adminTab, setAdminTab] = useState('queue')

  const path = window.location.pathname

  // Admin route
  if (path === '/admin') {
    if (!isAuthenticated) {
      return <LoginPage onLogin={login} />
    }

    return (
      <AdminLayout activeTab={adminTab} onTabChange={setAdminTab} onLogout={logout}>
        {adminTab === 'queue' && (
          <QueueTab
            bookings={bookings}
            onUpdateStatus={updateStatus}
            onCallNext={callNextLive}
          />
        )}
        {adminTab === 'schedule' && (
          <ScheduleTab
            settings={settings}
            onUpdate={updateSettings}
            onToggleBlockedDate={toggleBlockedDate}
            onToggleBlockedSlot={toggleBlockedSlot}
            generateTimeSlots={generateTimeSlots}
          />
        )}
        {adminTab === 'history' && (
          <HistoryTab bookings={bookings} />
        )}
      </AdminLayout>
    )
  }

  // Confirmation screen
  if (confirmedBooking) {
    return (
      <ConfirmationScreen
        booking={confirmedBooking}
        onCancel={cancelByPhone}
        onBack={() => setConfirmedBooking(null)}
      />
    )
  }

  // Public booking page (default)
  return (
    <BookingPage
      settings={settings}
      generateTimeSlots={generateTimeSlots}
      getBookedSlots={getBookedSlots}
      getLiveQueueCount={getLiveQueueCount}
      getNextQueuePosition={getNextQueuePosition}
      addBooking={addBooking}
      onBookingComplete={setConfirmedBooking}
    />
  )
}
