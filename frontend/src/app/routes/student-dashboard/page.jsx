import ProtectedRoute from '@/components/ProtectedRoute'
import StudentDashboard from '@/components/StudentDashboard'
import React from 'react'

const StudentDashoardPage = () => {
    return (
        <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentDashboard />
        </ProtectedRoute>
    )
}

export default StudentDashoardPage