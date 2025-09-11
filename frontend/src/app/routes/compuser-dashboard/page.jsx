import CompUserDashboard from '@/components/CompUserDashboard'
import CompUserNavbar from '@/components/CompUserNavbar'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const CompUserDashboardPage = () => {
    return (
        <ProtectedRoute allowedRoles={['COMPANY_ROOT']}>
            <CompUserNavbar/>
            <CompUserDashboard />
        </ProtectedRoute>
    )
}

export default CompUserDashboardPage