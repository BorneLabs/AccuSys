import React, { useState, useMemo,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "@/components/filters/FilterSidebar"; // adjust path as needed
import { FaFilter } from "react-icons/fa";
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
    onFiltered,
}) => {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState(null);
    const [actionMenu, setActionMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilterSidebar, setShowFilterSidebar] = useState(false);
    const [filterValues, setFilterValues] = useState({});

   
    const filteredData = useMemo(() => {
        let filtered = [...data];

        // 1. Apply search
        if (search) {
            filtered = filtered.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(search.toLowerCase())
                )
            );
        }

        // 2. Apply sidebar filters
        if (filters && filters.length > 0) {
            filters.forEach((filter) => {
                const value = filterValues[filter.key];

                if (filter.type === "range") {
                    const min = parseFloat(filterValues[`${filter.key}_min`] || "");
                    const max = parseFloat(filterValues[`${filter.key}_max`] || "");

                    filtered = filtered.filter((row) => {
                        const rowVal = parseFloat(row[filter.key]);

                        if (!isNaN(min) && rowVal < min) return false;
                        if (!isNaN(max) && rowVal > max) return false;
                        return true;
                    });
                } else if (value) {
                    filtered = filtered.filter((row) => {
                        const rowVal = row[filter.key];
                        return String(rowVal).toLowerCase().includes(String(value).toLowerCase());
                    });
                }
            });
        }


        // 3. Apply sorting
        if (sortConfig) {
            filtered.sort((a, b) => {
                let valueA = a[sortConfig.key];
                let valueB = b[sortConfig.key];

                if (typeof valueA === "string" && valueA.match(/[\d,]/)) {
                    valueA = parseFloat(valueA.replace(/[^\d.]/g, ""));
                    valueB = parseFloat(valueB.replace(/[^\d.]/g, ""));
                }

                if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
                if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [data, search, sortConfig, filters, filterValues]);


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

    useEffect(() => {
        if (onFiltered) {
            onFiltered(filteredData);
        }
    }, [filteredData, onFiltered]);



    return (
        <div className="p-4 bg-white rounded-lg shadow-md   min-h-screen" >
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
                <div className="flex gap-5">
                {filters && filters.length > 0 && (
                    <button
                            className="flex items-center gap-2 border bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                        onClick={() => setShowFilterSidebar(true)}
                    >
                        <FaFilter /> Filters
                    </button>
                )}

                {addButton && (
                    <button
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
                        onClick={() => navigate(addButton.navigate)}
                    >
                        <FaPlus /> {addButton.label}
                    </button>
                )}
                </div>
            </div>
            <div className="hidden md:block overflow-x-auto min-h-screen">
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
                        </tr></thead>
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
                                        )}</td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center p-3">
                                No data found</td>
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
            <div className="md:hidden space-y-4">
              {paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => {
                        return (
                            <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-sm">
                                {columns.map((col) => (
                                    <div key={col.key} className="flex justify-between py-1 border-b last:border-b-0">
                                        <span className="font-medium text-gray-700">{col.label}:</span>
                                        <span className="text-gray-900">{row[col.key]}</span>
                                    </div>
                                ))}
                                {actions && (
                                    <div className="flex justify-end mt-3 relative">
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
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center p-4 text-gray-500">No data found</div>
                )}
            </div>

            <FilterSidebar
                isOpen={showFilterSidebar}
                onClose={() => setShowFilterSidebar(false)}
                filters={filters}
                values={filterValues}
                onChange={(key, val) => setFilterValues((prev) => ({ ...prev, [key]: val }))}
                onApply={() => setShowFilterSidebar(false)}
                onClear={() => {
                    setFilterValues({});
                    setShowFilterSidebar(false);
                }}
            />

        </div>
    );
};


export default UniversalTable;