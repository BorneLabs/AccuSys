import React, { useEffect, useState } from 'react';
import UniversalTable from '@/components/table/UniversalTable';
import PopupCard from '@/components/cards/Loading';

const IncomeReport = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(() =>
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [toDate, setToDate] = useState(() =>
    new Date().toISOString().split('T')[0]
  );
  const [typeFilter, setTypeFilter] = useState('ALL');

  const fakeIncomeData = [
    {
      date: '2025-02-14',
      transactionNo: 'RIFTLTD/44954/2025/02/03',
      regNo: 'KDS 546Q',
      type: 'Deposit',
      amount: 500000,
      paymentMode: 'CHEQUE',
      payer: 'GEORGE KARANJA NJENGA',
      agent: 'ARNOLD KOMEN',
    },
    {
      date: '2025-02-14',
      transactionNo: 'TBCQ4LYEOO',
      regNo: 'KDL 784C',
      type: 'Installment',
      amount: 100000,
      paymentMode: 'M-PESA',
      payer: 'CHEPKIRUI FLORENCE',
      agent: 'IVY TARUS',
    },
    {
      date: '2025-02-14',
      transactionNo: 'TBC2QL04DE',
      regNo: 'KCV 816M',
      type: 'Installment',
      amount: 100000,
      paymentMode: 'M-PESA',
      payer: 'MASEK PAYATON SUSAN',
      agent: 'IVY TARUS',
    },
    // Add more data as needed
  ];

  useEffect(() => {
    setTimeout(() => {
      setData(fakeIncomeData);
    }, 1000);
  }, []);
  const [filtered, setFiltered] = useState([]);


  // Table column definitions
  const columns = [
    { key: 'date', label: 'Transaction Date' },
    { key: 'transactionNo', label: 'Transaction Number' },
    { key: 'regNo', label: 'Registration Number' },
    { key: 'type', label: 'Transaction Type' },
    {
      key: 'amount',
      label: 'Amount',
      render: (item) => item.amount.toLocaleString(),
    },
    { key: 'paymentMode', label: 'Payment Mode' },
    { key: 'payer', label: "Payer's Name" },
    { key: 'agent', label: 'Agent' },
  ];

  return (
    <div className="p-6">
      {data.length === 0 ? <PopupCard status="loading" /> : null}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded p-4 text-center">
          <div className="text-gray-500 text-sm">Total Income</div>
          <div className="text-xl font-semibold text-green-600">
            {filtered.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <div className="text-gray-500 text-sm">Transactions</div>
          <div className="text-xl font-semibold text-blue-600">
            {filtered.length}
          </div>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <div className="text-gray-500 text-sm">Actions</div>
          <div className="flex justify-center gap-2 mt-2">
            <button className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm">Print</button>
            <button className="bg-gray-500 text-white px-3 py-1.5 rounded text-sm">Export</button>
          </div>
        </div>
      </div>


      {/* Table */}
      <UniversalTable
        columns={columns}
        data={data}
        searchPlaceholder="Search income..."
        sortableColumns={['date', 'amount']}
        filters={[
          { key: 'paymentMode', label: 'Payment Mode', type: 'select', options: ['M-PESA', 'CHEQUE', 'CASH'] },
          { key: 'date', label: 'Transaction Date', type: 'date-range' },
          { key: 'agent', label: 'Agent', type: 'text' }
        ]}

        onFiltered={(filteredResults) => setFiltered(filteredResults)}
      />

    </div>
  );
};

export default IncomeReport;
