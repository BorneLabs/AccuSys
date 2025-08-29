import React from 'react'

const SubmitButton = () => {

  return (
    <div className="text-center">
        <button
            type="submit"
            className="mt-6 bg-[#0056A6] hover:bg-[#003E7E] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
            Submit Invoice
        </button>
    </div>
  )
}

export default SubmitButton