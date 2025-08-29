import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import UniversalTable from "@/components/table/UniversalTable";
import PopupCard from "@/components/cards/Loading";

const Users = () => {
  // Fake User Data (10 records)
  const fakeData = [
    { name: "Alice Wanjiku", role: "Admin", phoneNumber: "+2547555456" },
    { name: "Brian Kamau", role: "Salesperson", phoneNumber: "+254712345678" },
    { name: "Catherine Njeri", role: "Mechanic", phoneNumber: "+254798765432" },
    { name: "David Otieno", role: "Accountant", phoneNumber: "+254701234567" },
    { name: "Esther Mwangi", role: "Customer Service", phoneNumber: "+254765432109" },
    { name: "Francis Kimani", role: "Manager", phoneNumber: "+254789012345" },
    { name: "Grace Muthoni", role: "Salesperson", phoneNumber: "+254790123456" },
    { name: "Hassan Ali", role: "Mechanic", phoneNumber: "+254723456789" },
    { name: "Irene Achieng", role: "Accountant", phoneNumber: "+254734567890" },
    { name: "James Kariuki", role: "Admin", phoneNumber: "+254745678901" },
  ];

  // State to hold user data
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Simulate fetching data with useEffect (2s delay)
  useEffect(() => {
    setTimeout(() => {
      setData(fakeData);
    }, 2000); // Simulate loading delay
  }, []);

  // Table Columns
  const columns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "phoneNumber", label: "Phone Number" },
  ];

  const handleView = (user) => {
    navigate(`/users/view/${user.name}`);
  };

  // Action Buttons
  const actions = [
    {
      label: "View",
      icon: <FaEye className="text-blue-600" />,
      onClick: (row) => handleView(row),
    },
    {
      label: "Edit",
      icon: <FaEdit className="text-yellow-600" />,
      onClick: (row) => alert(`Editing: ${row.name}`),
    },
    {
      label: "Delete",
      icon: <FaTrash className="text-red-600" />,
      onClick: (row) => alert(`Deleting: ${row.name}`),
    },
  ];

  return (
    <div className="">
      {/* Show loading state */}
      {data.length === 0 ? <PopupCard status="loading" /> : null}

      {/* Render table when data is available */}
      {data.length > 0 && (
        <UniversalTable
          columns={columns}
          data={data}
          actions={actions}
          filters={[
            {
              key: "role",
              label: "Role",
              type: "select",
              options: ["Admin", "Salesperson", "Mechanic", "Accountant", "Customer Service", "Manager"]
            },
          ]}
          sortableColumns={["name"]}
          addButton={{ label: "Add User", navigate: "/systemUsers/Add" }}
          searchPlaceholder="Search users..."
        />
      )}
    </div>
  );
};

export default Users;
