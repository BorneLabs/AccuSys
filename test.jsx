import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaSort, FaPlus, FaSearch, FaEllipsisV, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const UniversalTable = ({
    columns,
    data,
    actions,
    filters,
    sortableColumns,
    addButton,
    searchPlaceholder,
    rowsPerPage = 5,        
}) => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState(null);
    const [actionMenu, setActionMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredData = useMemo(() => {
        let filtered = data;
        if (search) {
            filtered = filtered.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(search.toLowerCase())
                )
            );
        }
        if (sortConfig) {
            filtered.sort((a, b) => {
                const valueA = a[sortConfig.key];
                const valueB = b[sortConfig.key];
                if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
                if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [data, search, sortConfig]);

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(startIndex, startIndex + rowsPerPage);
    }, [filteredData, currentPage, rowsPerPage]);

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-7xl mx-auto">
            {/* Search & Add Button */}
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <div className="relative w-full md:w-auto">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder || "Search..."}
                        className="pl-10 pr-4 py-2 border rounded-md w-full md:w-80"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                {addButton && (
                    <button
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                        onClick={() => navigate(addButton.navigate)}
                    >
                        <FaPlus /> {addButton.label}
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="p-3 text-left font-medium cursor-pointer"
                                    onClick={() => sortableColumns.includes(col.key) && requestSort(col.key)}
                                >
                                    {col.label} {sortableColumns.includes(col.key) && <FaSort className="inline ml-1" />}
                                </th>
                            ))}
                            {actions && <th className="p-3">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    {columns.map((col) => (
                                        <td key={col.key} className="p-3">{row[col.key]}</td>
                                    ))}
                                    {actions && (
                                        <td className="p-3 relative">
                                            <button
                                                className="text-gray-600 hover:text-gray-900"
                                                onClick={() => setActionMenu(actionMenu === index ? null : index)}
                                            >
                                                <FaEllipsisV />
                                            </button>
                                            {actionMenu === index && (
                                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10 flex flex-col">
                                                    {actions.map((action, i) => (
                                                        <button
                                                            key={i}
                                                            className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100"
                                                            onClick={() => action.onClick(row)}
                                                        >
                                                            {action.icon}
                                                            <span className="whitespace-nowrap">{action.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center p-3">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages} | {filteredData.length} records
                </p>
                <div className="flex items-center gap-2">
                    <button
                        className={`px-3 py-1 border rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"}`}
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UniversalTable;
