import React from 'react';
import { useParams } from 'react-router-dom';

const TransactionReceipt = () => {
  const { id } = useParams();
  return (
    <div className="card">
      <h2>Transaction Receipt</h2>
      <p>Receipt ID: {id}</p>
      <button className="btn btn-primary" onClick={() => window.print()}>Print Receipt</button>
    </div>
  );
};

export default TransactionReceipt;
