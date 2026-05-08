import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const { data } = await api.get('/notifications');
        setNotifications(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifs();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="card">
      <h2>Your Notifications</h2>
      {notifications.length === 0 ? <p>No notifications.</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notifications.map(n => (
            <li key={n._id} style={{ padding: '10px', borderBottom: '1px solid #ccc', opacity: n.readStatus ? 0.6 : 1 }}>
              <strong>{n.title}</strong>: {n.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
