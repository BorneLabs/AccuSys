import React, { useState } from 'react'
import TextInput from '@/components/inputs/TextInput'
import SubmitButton from '@/components/button/submitButton'

const LogBookDispatchForm = () => {

    const [formData, setFormData] = useState({
        logBookNumber: "",
        deliveredTo: "",
        deliveredBy: "",
        date: '',
        deliveredByIdNo: '',
        deliveredToIdNo:''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 py-10 px-4 sm:px-10">
          <div className=" mx-auto bg-white rounded-2xl shadow-2xl p-10">
              <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10 uppercase tracking-wider">
                Log Book Dispatch Form
              </h2>
          <form>
              <section className="mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <TextInput label="log Book Number" name="logBookNumber" value={formData.logBookNumber} onChange={handleChange} />
                      <TextInput label="Date" name="date" value={formData.date} onChange={handleChange} />
                      <TextInput label="Delivered To" name="deliveredTo" value={formData.deliveredTo} onChange={handleChange} />
                      <TextInput label="Delivered To Id Number" name="deliveredToIdNo" value={ formData.deliveredToIdNo} onChange={handleChange} />
                      <TextInput label="Delivered By" name="deliveredBy" value={formData.deliveredBy} onChange={handleChange} />
                      <TextInput label="Delivered By Id Number" name="deliveredByNumber" value={formData.deliveredByIdNo} onChange={handleChange} />
                  </div>
                  </section>
                  <SubmitButton/>
          </form>
          </div>
    </div>
  )
}

export default LogBookDispatchForm