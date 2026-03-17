import React, { useState } from 'react'
import { Lock, Mail } from 'lucide-react'
import Button from './Button'

export default function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        const success = onLogin(email, password)
        if (!success) {
            setError('Invalid email or password')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-200">
                            <span className="text-white font-bold text-lg">F</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">FinBank</span>
                    </div>
                    <p className="text-gray-500">Admin Portal</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Sign in</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="ibrahimgrrr5@gmail.com"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
                        )}

                        <Button type="submit" className="w-full" size="lg">
                            Sign In
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
