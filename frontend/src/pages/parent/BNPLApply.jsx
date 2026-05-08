import React, { useState } from 'react';
import api from '../../services/api';
import AlertError from '../../components/ui/AlertError';

const BNPLApply = () => {
  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState('');
  const [linkedStudent, setLinkedStudent] = useState(null);
  
  const [feeStructures, setFeeStructures] = useState([]);
  const [selectedFee, setSelectedFee] = useState(null);
  const [months, setMonths] = useState(3);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Link Student
  const handleLinkStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/students/link', { studentId });
      setLinkedStudent(data.data);
      
      // Fetch fee structures for this student
      const feeRes = await api.get(`/fee-structure/${data.data._id}`);
      setFeeStructures(feeRes.data.data);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to link student');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Submit Application
  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!selectedFee) return setError('Please select a fee to finance');
    
    setLoading(true);
    setError('');
    try {
      const payload = {
        studentId: linkedStudent._id,
        originalFee: selectedFee.amount,
        months: Number(months)
      };
      
      const { data } = await api.post('/applications', payload);
      setSuccess('BNPL Application Approved! Your payment plan has been generated.');
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Application failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Apply for BNPL Fee Financing</h2>
      
      {error && <AlertError message={error} />}
      {success && <div style={{ color: 'green', padding: '1rem', background: '#e6ffe6', marginBottom: '1rem' }}>{success}</div>}

      {step === 1 && (
        <form onSubmit={handleLinkStudent}>
          <p style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
            Step 1: Link your child's school record by entering their internal Student ID.
          </p>
          <div className="form-group">
            <label>Student ID</label>
            <input 
              type="text" 
              className="form-control" 
              value={studentId} 
              onChange={(e) => setStudentId(e.target.value)} 
              required 
              placeholder="e.g. STU-12345"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Verifying...' : 'Link Student'}
          </button>
        </form>
      )}

      {step === 2 && linkedStudent && (
        <form onSubmit={handleSubmitApplication}>
          <div style={{ padding: '1rem', background: 'var(--background)', marginBottom: '1rem', borderRadius: '5px' }}>
            <p><strong>Student Linked:</strong> {linkedStudent.fullName}</p>
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label>Select Fee Structure</label>
            <select 
              className="form-control" 
              onChange={(e) => setSelectedFee(feeStructures.find(f => f._id === e.target.value))}
              required
            >
              <option value="">-- Choose Fee --</option>
              {feeStructures.map(fee => (
                <option key={fee._id} value={fee._id}>
                  {fee.grade} - PKR {fee.amount} (Due: {new Date(fee.dueDate).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label>Repayment Plan</label>
            <select className="form-control" value={months} onChange={(e) => setMonths(e.target.value)}>
              <option value={3}>3 Months (5% Markup)</option>
              <option value={6}>6 Months (10% Markup)</option>
              <option value={12}>12 Months (15% Markup)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading || !selectedFee}>
            {loading ? 'Processing...' : 'Submit BNPL Application'}
          </button>
        </form>
      )}

      {step === 3 && (
        <div style={{ textAlign: 'center' }}>
          <h3>All set!</h3>
          <p>Your <strong>{months}-month</strong> installment plan is active.</p>
          <button className="btn btn-secondary" onClick={() => window.location.href='/dashboard'} style={{ marginTop: '1rem' }}>
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default BNPLApply;
