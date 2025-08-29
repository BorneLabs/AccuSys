import React, { useState } from 'react'
import DueInstallements from './Tabs/DueInstallements'
import SalesReport from './Tabs/SalesReport'
import IncomeReport from './Tabs/IncomeReport'
import PenaltyCharges from './Tabs/PenaltyCharges'
import LocalPurchaseReport from './Tabs/LocalPurchaseReport'
import OtherCharges from './Tabs/OtherCharges'
import SaleAuthority from './Tabs/SaleAuthority'
import Summary from './Tabs/Summary'

const Reports = () => {
  const [activeTab, setActiveTab] = useState('1')

  const tabs = [
    { id: '1', label: 'Due Installements' },
    { id: '2', label: 'Sales' },
    { id: '3', label: 'Income' },
    { id: '4', label: 'Penalty Charges' },
    { id: '5', label: 'Local Purchase' },
    { id: '6', label: 'Other Charges' },
    { id: '7', label: 'Sale Authority' },
    { id: '8', label: 'Summary' }
  ]

  return (
    <div className='bg-white min-h-screen p-6'>
      <section className='mt-8'>
        {/* Tabs Header */}
        <div className='relative border-b border-blue-300 flex space-x-6 bg-white'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors
                    ${activeTab === tab.id
                  ? 'text-blue-600 bg-white border-x border-t border-blue-500 rounded-t-md -mb-px'
                  : 'text-gray-500 hover:text-blue-600'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className='border border-blue-500 border-t-0 rounded-b-md p-6 bg-white'>
          {activeTab === '1' && (
            <DueInstallements />
          )}
          {activeTab === '2' && (
            <SalesReport />
          )}
          {activeTab === '3' && (
            <IncomeReport />
          )}
          {activeTab === '4' && (
            <PenaltyCharges />
          )}
          {activeTab === '5' && (
            <LocalPurchaseReport />
          )}
          {activeTab === '6' && (
            <OtherCharges />
          )}
          {activeTab === '7' && (
            <SaleAuthority />
          )}
          {activeTab === '8' && (
            <Summary />
          )}
        </div>
      </section>
    </div>
  )
}

export default Reports