import AdminDashboard from '@/components/AdminDashboard'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const AdminDashboardPage = () => {
    return (
        <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
        </ProtectedRoute>
    )
}

export default AdminDashboardPage