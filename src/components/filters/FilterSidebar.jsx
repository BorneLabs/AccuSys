import React from "react";
import { FaTimes } from "react-icons/fa";

const FilterSidebar = ({ isOpen, onClose, filters = [], values, onChange, onApply, onClear }) => {
    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-50 transform transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"}
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    {filters.map((filter) => {
                        const value = values[filter.key] || "";

                        // RANGE filter
                        if (filter.type === "range") {
                            const min = values[`${filter.key}_min`] || "";
                            const max = values[`${filter.key}_max`] || "";

                            return (
                                <div key={filter.key}>
                                    <label className="block text-sm font-medium mb-1">{filter.label}</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={min}
                                            onChange={(e) => onChange(`${filter.key}_min`, e.target.value)}
                                            className="w-1/2 border rounded px-3 py-2"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={max}
                                            onChange={(e) => onChange(`${filter.key}_max`, e.target.value)}
                                            className="w-1/2 border rounded px-3 py-2"
                                        />
                                    </div>
                                </div>
                            );
                        }

                        // SELECT filter
                        if (filter.type === "select") {
                            return (
                                <div key={filter.key}>
                                    <label className="block text-sm font-medium mb-1">{filter.label}</label>
                                    <select
                                        value={value}
                                        onChange={(e) => onChange(filter.key, e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    >
                                        <option value="">All</option>
                                        {filter.options.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        }

                        // DATE filter
                        if (filter.type === "date") {
                            return (
                                <div key={filter.key}>
                                    <label className="block text-sm font-medium mb-1">{filter.label}</label>
                                    <input
                                        type="date"
                                        value={value}
                                        onChange={(e) => onChange(filter.key, e.target.value)}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>
                            );
                        }

                        if (filter.type === "date-range") {
                            const min = values[`${filter.key}_min`] || "";
                            const max = values[`${filter.key}_max`] || "";

                            return (
                                <div key={filter.key}>
                                    <label className="block text-sm font-medium mb-1">{filter.label}</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="date"
                                            value={min}
                                            onChange={(e) => onChange(`${filter.key}_min`, e.target.value)}
                                            className="w-1/2 border rounded px-3 py-2"
                                        />
                                        <input
                                            type="date"
                                            value={max}
                                            onChange={(e) => onChange(`${filter.key}_max`, e.target.value)}
                                            className="w-1/2 border rounded px-3 py-2"
                                        />
                                    </div>
                                </div>
                            );
                        }


                        // DEFAULT TEXT/NUMBER
                        return (
                            <div key={filter.key}>
                                <label className="block text-sm font-medium mb-1">{filter.label}</label>
                                <input
                                    type={filter.type || "text"}
                                    value={value}
                                    onChange={(e) => onChange(filter.key, e.target.value)}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                        );
                    })}

                </div>

                <div className="p-4 flex justify-between border-t">
                    <button onClick={onClear} className="text-sm text-gray-600">
                        Clear
                    </button>
                    <button
                        onClick={onApply}
                        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transitiontext-sm"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </>
    );
};

export default FilterSidebar;
