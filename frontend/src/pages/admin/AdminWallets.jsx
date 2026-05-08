import React from 'react';

const AdminWallets = () => {
  const wallets = [
    { id: '1', user: 'Parent One', email: 'parent1@test.com', balance: 150000 },
    { id: '2', user: 'Parent Two', email: 'parent2@test.com', balance: 5000 },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Admin Wallets View</h1>
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Email</th>
                <th>Current Demo Balance (PKR)</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map(w => (
                <tr key={w.id}>
                  <td>{w.user}</td>
                  <td>{w.email}</td>
                  <td>{w.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWallets;
