import React, { useState } from 'react';
import TextInput from '@/components/inputs/TextInput';

const ProformaInvoice = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        idNumber: '',
        vehiclePrice: "",
        depositPaid: "",
        financeRequested: "",
        balance: "",
        bank: '',
        bankAddress: "",
        branch: "",
        salePerson: '',
        payAccount: '',
        date: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-4 sm:px-10">
            <div className=" mx-auto bg-white rounded-2xl shadow-2xl p-10">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10 uppercase tracking-wider">
                    Proforma Invoice
                </h2>
                <form>
                    {/* Customer Details */}
                    <section className="mb-10">
                        <h6 className='text-lg font-semibold text-gray-700 border-b pb-2 mb-6 uppercase tracking-wide'>
                            Customer Details
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextInput label="Name" name="name" value={formData.name} onChange={handleChange} />
                            <TextInput label="ID Number" name="idNumber" value={formData.idNumber} onChange={handleChange} />
                            <TextInput label="Address" name="address" value={formData.address} onChange={handleChange} />
                            <TextInput label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        </div>
                    </section>

                    {/* Financial Details */}
                    <section className="mb-10">
                        <h6 className='text-lg font-semibold text-gray-700 border-b pb-2 mb-6 uppercase tracking-wide'>
                            Financial Details
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextInput label="Vehicle Price" name="vehiclePrice" value={formData.vehiclePrice} onChange={handleChange} type="number" />
                            <TextInput label="Deposit Paid" name="depositPaid" value={formData.depositPaid} onChange={handleChange} />
                            <TextInput label="Finance Requested" name="financeRequested" value={formData.financeRequested} onChange={handleChange} />
                            <TextInput label="Balance" name="balance" value={formData.balance} onChange={handleChange} type="number" />
                        </div>
                    </section>

                    {/* Bank Details */}
                    <section className="mb-10">
                        <h6 className='text-lg font-semibold text-gray-700 border-b pb-2 mb-6 uppercase tracking-wide'>
                            Bank Details
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <TextInput label="Bank" name="bank" value={formData.bank} onChange={handleChange} />
                            <TextInput label="Branch" name="branch" value={formData.branch} onChange={handleChange} type="text" />
                            <TextInput label="Bank Address" name="bankAddress" value={formData.bankAddress} onChange={handleChange} />
                        </div>
                    </section>

                    {/* Other Details */}
                    <section className="mb-10">
                        <h6 className='text-lg font-semibold text-gray-700 border-b pb-2 mb-6 uppercase tracking-wide'>
                            Other Details
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <TextInput label="Date" name="date" value={formData.date} onChange={handleChange} type="date" />
                            <TextInput label="Sales Person" name="salePerson" value={formData.salePerson} onChange={handleChange} />
                            <TextInput label="Pay Account" name="payAccount" value={formData.payAccount} onChange={handleChange} />
                        </div>
                    </section>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="mt-6 bg-[#0056A6] hover:bg-[#003E7E] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Submit Invoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default ProformaInvoice;
