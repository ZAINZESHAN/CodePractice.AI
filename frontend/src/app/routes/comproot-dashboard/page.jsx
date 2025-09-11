import CompRootDashboard from '@/components/CompRootDashboard'
import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const CompRootDashboardPage = () => {
  return (
    <ProtectedRoute allowedRoles={['COMPANY_ROOT']}>
      <CompRootDashboard/>
    </ProtectedRoute>
  )
}

export default CompRootDashboardPage