import { useState, useCallback } from 'react'

const ADMIN_EMAIL = 'ibrahimgrrr5@gmail.com'
const ADMIN_PASSWORD = 'davud2010'
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
        // Redirect to the base path (one level above /admin or just / if at root)
        const currentPath = window.location.pathname
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/admin')) || '/'
        window.location.href = basePath
    }, [])

    return { isAuthenticated, login, logout }
}
