import { useState, useCallback } from 'react'

const ADMIN_EMAIL = 'admin@finbank.com'
const ADMIN_PASSWORD = 'admin123'
const AUTH_KEY = 'finbank_auth'

export default function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem(AUTH_KEY) === 'true'
    })

    const login = useCallback((email, password) => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            localStorage.setItem(AUTH_KEY, 'true')
            setIsAuthenticated(true)
            return true
        }
        return false
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem(AUTH_KEY)
        setIsAuthenticated(false)
        window.location.href = '/'
    }, [])

    return { isAuthenticated, login, logout }
}
