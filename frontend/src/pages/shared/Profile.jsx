import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="card">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> <span style={{ textTransform: 'capitalize' }}>{user?.role}</span></p>
    </div>
  );
};

export default Profile;
