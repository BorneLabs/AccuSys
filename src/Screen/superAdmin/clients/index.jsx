import React, { useState, useEffect } from "react";
import UniversalTable from "../../../components/table/UniversalTable";
import { FaEdit, FaTrash, FaEye, FaCheckCircle } from "react-icons/fa";
import PopupCard from "@/components/cards/Loading";
import { useNavigate } from "react-router-dom";

const Clients = () => {
    const navigate = useNavigate();

    const fakeData = [
        {
            make: "Toyota",
            model: "Corolla",
            chassis_number: "2853",
            registration_no: "KDS 903T",
            fuel: "Petrol",
            mileage: "45,000 km",
            customer_name: "John Doe",
            amount_paid: "700,000",
            payment_mode: "Installment"
        },
        {
            make: "Honda",
            model: "Civic",
            chassis_number: "HND12345",
            registration_no: "KDL 456B",
            fuel: "Petrol",
            mileage: "55,000 km",
            customer_name: "Jane Smith",
            amount_paid: "900,000",
            payment_mode: "Full"
        },
        // Add more sample data as needed
    ];

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setData(fakeData);
        }, 1000);
    }, []);

    const filteredData = data.filter((car) =>
        car.registration_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.chassis_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        { key: "registration_no", label: "Number Plate" },
        { key: "chassis_number", label: "Chassis Number" },
        { key: "make", label: "Make" },
        { key: "model", label: "Model" },
        { key: "fuel", label: "Fuel" },
        { key: "mileage", label: "Mileage" },
        { key: "customer_name", label: "Customer Name" },
        { key: "amount_paid", label: "Amount Paid" },
        { key: "payment_mode", label: "Payment Mode" },
    ];

    const handleView = (row) => {
        navigate(`/clients/view/${row.registration_no}`);
    };

    const handleCompleteSale = (row) => {
        alert(`Sale completed for ${row.registration_no} to ${row.customer_name}`);
        // Optional: set status = "Sold" or update backend
    };

    const actions = [
        {
            label: "View",
            icon: <FaEye className="text-blue-600" />,
            onClick: handleView,
        },
        {
            label: "Complete Sale",
            icon: <FaCheckCircle className="text-green-600" />,
            onClick: handleCompleteSale,
        },
        {
            label: "Edit",
            icon: <FaEdit className="text-yellow-600" />,
            onClick: (row) => alert(`Editing: ${row.registration_no}`),
        },
        {
            label: "Delete",
            icon: <FaTrash className="text-red-600" />,
            onClick: (row) => alert(`Deleting: ${row.registration_no}`),
        },
    ];

    return (
        <div className="px-6 py-4">
          

            {data.length === 0 ? <PopupCard status="loading" /> : null}

            {data.length > 0 && (
                <UniversalTable
                    columns={columns}
                    data={filteredData}
                    // actions={actions}
                    sortableColumns={["amount_paid", "mileage"]}
                    // addButton={{
                    //     label: "Add Vehicle",
                    //     navigate: "/clients/add",
                    // }}
                    searchPlaceholder="Search Clients..."
                />
            )}
        </div>
    );
};

export default Clients;
