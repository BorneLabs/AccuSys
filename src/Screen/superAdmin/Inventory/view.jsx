import React, { useState } from 'react'
import M4 from '../../../assets/m4.jpg'
import ProformaInvoice from './Details/ProformaInvoice'
import LogBookDispatchForm from './Details/LogBookDispatchForm'
import LocalPurchaseAgreement from './Details/LocalPurchaseAgreement'
import SaleAuthorityForm from './Details/SaleAuthorityForm'

const ViewInventory = () => {
    const [activeTab, setActiveTab] = useState('1')

    const tabs = [
        { id: '1', label: 'Options and Accessories' },
        { id: '2', label: 'Proforma Invoice' },
        { id: '3', label: 'Sale Information' },
        { id: '4', label: 'Sale Authority' },
        { id: '5', label: 'Local Purchase Agreement' },
        { id: '6', label: 'Log Book Dispatch Form' }
    ]

    return (
        <div className='bg-white min-h-screen p-6'>
            {/* Section 1 - Hero + Car Details */}
            <section className='bg-gray-100 p-6 rounded-lg shadow-md mb-8'>
                <div className='flex flex-col md:flex-row gap-6'>
                    {/* Image */}
                    <div className='flex-shrink-0'>
                        <img src={M4} alt='inventory' className='w-60 h-60 object-cover rounded-md' />
                    </div>

                    {/* Details */}
                    <div className='flex-1'>
                        <h2 className='text-2xl font-bold text-gray-800 mb-4'>BMW M5 CS</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700'>
                            {/* Group 1 */}
                            <div>
                                <p><span className='font-semibold'>Engine No:</span> CAFIV-SDVXIN</p>
                                <p><span className='font-semibold'>Chassis No:</span> SADICN93D9A</p>
                                <p><span className='font-semibold'>Reg No:</span> KDG 124H</p>
                            </div>
                            {/* Group 2 */}
                            <div>
                                <p><span className='font-semibold'>Fuel:</span> Petrol</p>
                                <p><span className='font-semibold'>Color:</span> White</p>
                                <p><span className='font-semibold'>Transmission:</span> Auto</p>
                            </div>
                            {/* Group 3 */}
                            <div>
                                <p><span className='font-semibold'>Stock No:</span> 2025-345</p>
                                <p><span className='font-semibold'>Rating (CC):</span> 1190</p>
                                <p><span className='font-semibold'>Price:</span> KSH 1,400,000</p>
                            </div>
                            {/* Group 4 */}
                            <div>
                                <p><span className='font-semibold'>Location:</span> Nairobi</p>
                                <p><span className='font-semibold'>Duty:</span> PAID</p>
                                <p><span className='font-semibold'>LogBook:</span> Not Available</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 - Clean Google-style Tabs */}
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
                        <div>
                            <h4 className='text-lg font-semibold mb-2 text-gray-800'>Full Specifications</h4>
                            <p className='text-gray-600'>Here you can list more technical specifications of the car, such as horsepower, torque, features etc.</p>
                        </div>
                    )}
                    {activeTab === '2' && (
                       <ProformaInvoice/>
                    )}
                    {activeTab === '3' && (
                        <div>
                            <h4 className='text-lg font-semibold mb-2 text-gray-800'>Ownership History</h4>
                            <p className='text-gray-600'>Information about past owners, import history, usage, mileage logs, etc.</p>
                        </div>
                    )}
                    {activeTab === '4' && (
                       <SaleAuthorityForm/>
                    )}
                    {activeTab === '5' && (
                      <LocalPurchaseAgreement/>
                    )}
                    {activeTab === '6' && (
                       <LogBookDispatchForm/>
                    )}
                </div>
            </section>

        </div>
    )
}

export default ViewInventory
