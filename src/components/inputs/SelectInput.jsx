const SelectInput = ({ label, name, value, onChange, options, error }) => {
    return (
        <div className="mb-2">
            <label className="block text-xs font-semibold text-gray-600 tracking-widest uppercase mb-1">
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={`block w-full px-4 py-3 text-gray-800 bg-gray-50 border rounded-lg shadow-sm focus:outline-none transition 
          ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
        `}
            >
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default SelectInput;
