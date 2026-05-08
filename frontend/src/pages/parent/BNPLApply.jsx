import React, { useState } from 'react';

const BNPLApply = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ student: '', amount: '', plan: '' });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Apply for BNPL Plan</h1>
      
      <div className="card">
        {step === 1 && (
          <div>
            <h3>Step 1: Details</h3>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Select Student</label>
              <select className="form-input" value={formData.student} onChange={e => setFormData({...formData, student: e.target.value})}>
                <option value="">-- Choose Student --</option>
                <option value="student1">John Doe</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fee Amount (Max: 200,000 PKR)</label>
              <input type="number" className="form-input" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
            </div>
            <button className="btn btn-primary" onClick={handleNext}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Step 2: Repayment Plan</h3>
            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label>Select Plan (Months)</label>
              <select className="form-input" value={formData.plan} onChange={e => setFormData({...formData, plan: e.target.value})}>
                <option value="">-- Choose Plan --</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </select>
            </div>
            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={handlePrev}>Back</button>
              <button className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3>Step 3: Review & Confirm</h3>
            <div style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              <p><strong>Student:</strong> {formData.student || 'N/A'}</p>
              <p><strong>Amount:</strong> PKR {formData.amount || 0}</p>
              <p><strong>Plan:</strong> {formData.plan || 'N/A'} Months</p>
            </div>
            <div className="flex gap-4">
              <button className="btn btn-secondary" onClick={handlePrev}>Back</button>
              <button className="btn btn-primary" onClick={() => alert('Plan submitted!')}>Confirm & Setup Plan</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BNPLApply;
