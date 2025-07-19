//this page for send inquiry 

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitInquiry, resetInquiryState } from '../redux/inquirySlice';

const Inquiry = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.inquiry);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventLocation: '',
    eventDetails: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitInquiry(formData)).then(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        eventLocation: '',
        eventDetails: '',
      });
      setTimeout(() => dispatch(resetInquiryState()), 3000);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-[#fff8e1] p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-[#f9d976]">
        <h2 className="text-3xl font-bold font-playfair text-center text-[#bfa136] mb-6">
          ✨ Plan Your Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-[#ecd9a3] bg-white rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-[#e6c65f] focus:outline-none"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-[#ecd9a3] bg-white rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-[#e6c65f] focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#ecd9a3] bg-white rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-[#e6c65f] focus:outline-none"
          />
          <input
            type="text"
            name="eventLocation"
            placeholder="Event Location"
            required
            value={formData.eventLocation}
            onChange={handleChange}
            className="w-full border border-[#ecd9a3] bg-white rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-[#e6c65f] focus:outline-none"
          />
          <textarea
            name="eventDetails"
            placeholder="Event Details"
            required
            value={formData.eventDetails}
            onChange={handleChange}
            className="w-full border border-[#ecd9a3] bg-white rounded-xl px-4 py-3 shadow-sm focus:ring-2 focus:ring-[#e6c65f] focus:outline-none resize-none"
          />

          <button
            type="submit"
            className="w-full bg-[#bfa136] hover:bg-[#a88f2e] text-white font-semibold py-3 rounded-full transition-all duration-300"
          >
            {loading ? 'Submitting...' : 'Submit Inquiry'}
          </button>

          {success && <p className="text-green-600 text-center mt-2">{success}</p>}
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Inquiry;
