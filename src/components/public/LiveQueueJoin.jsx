import React from 'react'
import { Users, Clock, ArrowRight } from 'lucide-react'
import Button from '../shared/Button'

export default function LiveQueueJoin({ queueCount, onJoin, acceptLive }) {
    const estimatedWait = queueCount * 15 // ~15 minutes per client

    if (!acceptLive) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={28} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700">Live Queue Unavailable</h3>
                <p className="text-gray-400 mt-2">Live queue is currently closed. Please book by time slot.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Queue Status Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-sm text-green-600 font-medium uppercase tracking-wide">Live Queue Status</p>
                        <p className="text-gray-500 text-sm mt-1">Real-time queue information</p>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Users size={18} className="text-green-600" />
                            <span className="text-sm text-gray-500">Waiting</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{queueCount}</p>
                        <p className="text-xs text-gray-400 mt-1">clients in queue</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <Clock size={18} className="text-green-600" />
                            <span className="text-sm text-gray-500">Est. Wait</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                            {estimatedWait > 0 ? `~${estimatedWait}` : '0'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">minutes</p>
                    </div>
                </div>
            </div>

            {/* Join Button */}
            <Button onClick={onJoin} size="lg" className="w-full text-base">
                <ArrowRight size={20} />
                Join Queue Now
            </Button>

            <p className="text-center text-xs text-gray-400">
                You'll receive a queue number after joining
            </p>
        </div>
    )
}
