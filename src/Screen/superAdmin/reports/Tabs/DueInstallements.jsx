import React, { useState, useEffect } from 'react';
import UniversalTable from '@/components/table/UniversalTable';
import PopupCard from '@/components/cards/Loading';

const DueInstallements = () => {
  const fakeData = [
    { name: "Grace Wanjiru", phone: "+254745870455", registration_no: "KDH 001A", installment: "9 installments", dueDate: "2025-04-03", DueAmount: "100,000", Balance: 1600000, type: "UNCLEARED" },
    { name: "John Doe", phone: "+254700000001", registration_no: "KDA 112B", installment: "5 installments", dueDate: "2025-02-14", DueAmount: "50,000", Balance: 500000, type: "CLEARED" },
    { name: "Mary Njoki", phone: "+254722222222", registration_no: "KBX 887C", installment: "3 installments", dueDate: "2025-02-14", DueAmount: "80,000", Balance: 800000, type: "UNCLEARED" },
    { name: "Ali Omar", phone: "+254733333333", registration_no: "KCU 223D", installment: "6 installments", dueDate: "2025-03-10", DueAmount: "60,000", Balance: 600000, type: "CLEARED" },
    { name: "Brian Otieno", phone: "+254744444444", registration_no: "KCX 445E", installment: "4 installments", dueDate: "2025-04-01", DueAmount: "70,000", Balance: 700000, type: "UNCLEARED" },
    { name: "Jane Wambui", phone: "+254755555555", registration_no: "KDD 556F", installment: "8 installments", dueDate: "2025-02-20", DueAmount: "90,000", Balance: 900000, type: "CLEARED" },
  ];
  // Calculate default dates
  const today = new Date().toISOString().split('T')[0];
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [data, setData] = useState([]);
  // State for filters
  const [dueFromDate, setDueFromDate] = useState(sevenDaysAgo);
  const [toDate, setToDate] = useState(today);

  const [typeFilter, setTypeFilter] = useState("UNCLEARED");

  useEffect(() => {
    setTimeout(() => {
      setData(fakeData);
    }, 1000); // Simulate delay
  }, []);

  // Filter logic
  const filteredData = data.filter((item) => {
    const dueDate = new Date(item.dueDate);
    const from = new Date(dueFromDate);
    const to = new Date(toDate);

    const dateMatch = dueDate >= from && dueDate <= to;
    const typeMatch = typeFilter === "ALL" || item.type === typeFilter;

    return dateMatch && typeMatch;
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone Number" },
    { key: "registration_no", label: "Registration Number" },
    { key: "installment", label: "Installments" },
    { key: "dueDate", label: "Due Date" },
    { key: "DueAmount", label: "Due Amount" },
    { key: "Balance", label: "Balance" },
  ];

  return (
    <div>
          {/* Loading state */}
      {data.length === 0 ? <PopupCard status="loading" /> : null}

      {/* Table */}
      {data.length > 0 && (
        <UniversalTable
          columns={columns}
          data={data}
          sortableColumns={["mileage"]}
          searchPlaceholder="Search Installment..."
          filters={[
            { key: 'name', label: 'Clients Name', type: 'text' },
            { key: 'type', label: 'Payment Status', type: 'select', options: ["UNCLEARED", "CLEARED"] },
            { key: 'dueDate', label: 'Due Date', type: 'date-range' },
          ]}
        />
      )}
    </div>
  );
};

export default DueInstallements;
