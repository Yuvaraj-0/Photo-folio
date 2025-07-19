import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInquiries, deleteInquiry } from '../redux/inquirySlice';

const Notify = () => {
  const dispatch = useDispatch();
  const { inquiries, status, error } = useSelector((state) => state.inquiry);

  useEffect(() => {
    dispatch(fetchInquiries());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      dispatch(deleteInquiry(id));
    }
  };

  if (status === 'loading') return <p>Loading inquiries...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 10 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Client Inquiries</h2>
      {inquiries.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No inquiries found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {inquiries.map((inq) => (
            <li
              key={inq._id}
              style={{
                position: 'relative',
                backgroundColor: '#f0f4f8',
                borderRadius: 8,
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                padding: '12px 16px',
                marginBottom: 12,
                fontSize: 14,
                color: '#333',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ marginBottom: 6 }}>
                <strong style={{ fontSize: 16 }}>{inq.name}</strong>
                <div style={{ fontSize: 12, color: '#555' }}>
                  {inq.email} &nbsp;|&nbsp; {inq.phone}
                </div>
              </div>

              <div style={{ fontSize: 13, color: '#666' }}>
                Event: {inq.eventDetails} <br />
                Location: {inq.eventLocation}
              </div>

              <button
                onClick={() => handleDelete(inq._id)}
                aria-label="Delete inquiry"
                title="Delete"
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: 'transparent',
                  border: 'none',
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#999',
                  cursor: 'pointer',
                  padding: 0,
                  lineHeight: 1,
                  userSelect: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#e00')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#999')}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notify;
