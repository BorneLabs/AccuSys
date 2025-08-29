import React, { useState, useEffect } from "react";
import UniversalTable from "../../../components/table/UniversalTable";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import PopupCard from "@/components/cards/Loading";
import { useNavigate } from "react-router-dom";

const Inventory = () => {
  // Fake Data (10 records)
  const fakeData = [
    { make: "Toyota", model: "Corolla", chassis_number: "ABC12345", registration_no: "KDH 001A", fuel: "Petrol", mileage: "45,000 km" },
    { make: "Honda", model: "Civic", chassis_number: "DEF67890", registration_no: "KDJ 456B", fuel: "Petrol", mileage: "55,000 km" },
    { make: "Ford", model: "Focus", chassis_number: "GHI11223", registration_no: "KDE 789C", fuel: "Diesel", mileage: "60,500 km" },
    { make: "Nissan", model: "X-Trail", chassis_number: "JKL33445", registration_no: "KCN 321D", fuel: "Hybrid", mileage: "30,000 km" },
    { make: "Mazda", model: "CX-5", chassis_number: "MNO55667", registration_no: "KBX 567E", fuel: "Petrol", mileage: "42,000 km" },
    { make: "Subaru", model: "Forester", chassis_number: "PQR77889", registration_no: "KDA 890F", fuel: "Petrol", mileage: "65,200 km" },
    { make: "BMW", model: "X5", chassis_number: "STU99001", registration_no: "KCZ 234G", fuel: "Diesel", mileage: "80,000 km" },
    { make: "Mercedes", model: "C-Class", chassis_number: "VWX11223", registration_no: "KDG 678H", fuel: "Petrol", mileage: "39,800 km" },
    { make: "Audi", model: "Q7", chassis_number: "YZA33445", registration_no: "KDA 901J", fuel: "Diesel", mileage: "92,300 km" },
    { make: "Hyundai", model: "Tucson", chassis_number: "BCD55667", registration_no: "KCV 234K", fuel: "Hybrid", mileage: "28,600 km" },
  ];

  // State to hold inventory data
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  // Simulate fetching data with useEffect (2s delay)
  useEffect(() => {
    setTimeout(() => {
      setData(fakeData);
    }, 2000); // Simulate loading delay
  }, []);

  // Table Columns
  const columns = [
    { key: "make", label: "Make" },
    { key: "model", label: "Model" },
    { key: "chassis_number", label: "Chassis Number" },
    { key: "registration_no", label: "Registration Number" },
    { key: "fuel", label: "Fuel" },
    { key: "mileage", label: "Mileage" },
  ];

  const handleView =(id)=>{
    navigate(`/inventory/view/${id}`)
  }

  // Action Buttons
  const actions = [
    {
      label: "View",
      icon: <FaEye className="text-blue-600" />,
      onClick: (row) =>{handleView(row.make)},
    },
    {
      label: "Edit",
      icon: <FaEdit className="text-yellow-600" />,
      onClick: (row) => alert(`Editing: ${row.make} - ${row.model}`),
    },
    {
      label: "Delete",
      icon: <FaTrash className="text-red-600" />,
      onClick: (row) => alert(`Deleting: ${row.make} - ${row.model}`),
    },
  ];

  return (
    <div className="">
      {/* Show loading state */}
      {data.length === 0 ? <PopupCard status="loading"/> : null}

      {/* Render table when data is available */}
      {data.length > 0 && (
        <UniversalTable
          columns={columns}
          data={data}
          actions={actions}
          // filters={[
          //   { key: 'paymentMode', label: 'Payment Mode', type: 'select', options: ['M-PESA', 'CHEQUE', 'CASH'] },
          //   { key: 'date', label: 'Transaction Date', type: 'date' },
          //   { key: 'agent', label: 'Agent', type: 'text' }
          // ]}
          sortableColumns={["mileage"]}
          addButton={{ label: "Add Vehicle", navigate: "/inventory/add  " }}
          searchPlaceholder="Search inventory..."
        />
      )}
    </div>
  );
};

export default Inventory;
