import React from 'react'
import PageLayout from '../components/layout/PageLayout'

export default function LogisticInsights() {
  return (
    <PageLayout
      title="Logistic Insights"
      subtitle="Delivery operations insights and route-level performance metrics."
    >
      <div className="bg-white border border-outline-variant/30 rounded-xl p-10 text-center">
        <h3 className="text-2xl font-black text-on-surface mb-2">Logistic Insights</h3>
        <p className="text-on-surface-variant">
          This module is now available in sidebar navigation and ready for screenshot-based styling.
        </p>
      </div>
    </PageLayout>
  )
}