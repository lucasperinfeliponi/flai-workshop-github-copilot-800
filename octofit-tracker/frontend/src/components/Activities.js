import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
        
        // Fetch users first to create a mapping
        const usersResponse = await fetch(`${apiBaseUrl}/users/`);
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          const usersArray = usersData.results || usersData;
          const usersMap = {};
          usersArray.forEach(user => {
            usersMap[user._id] = user.name || user.username || user.email || 'Unknown User';
          });
          setUsers(usersMap);
        }
        
        // Fetch activities
        const activitiesResponse = await fetch(`${apiBaseUrl}/activities/`);
        if (!activitiesResponse.ok) {
          throw new Error(`HTTP error! status: ${activitiesResponse.status}`);
        }
        
        const activitiesData = await activitiesResponse.json();
        const activitiesArray = activitiesData.results || activitiesData;
        
        setActivities(Array.isArray(activitiesArray) ? activitiesArray : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserName = (activity) => {
    // Try to get the user name from various sources
    if (activity.user_name) return activity.user_name;
    
    // Check if we have user_id and can map it
    if (activity.user_id && users[activity.user_id]) {
      return users[activity.user_id];
    }
    
    // Check if 'user' field exists
    if (activity.user) {
      // If it looks like a MongoDB ObjectId (24 hex chars), try to map it
      if (typeof activity.user === 'string' && /^[a-f0-9]{24}$/i.test(activity.user)) {
        return users[activity.user] || 'Unknown User';
      }
      // Otherwise, it's probably a name
      return activity.user;
    }
    
    return 'Unknown User';
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Activities</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="display-4">Activities</h1>
          <p className="lead mb-0">Track all fitness activities and achievements</p>
        </div>
      </div>
      
      <div className="container mb-5">
        <div className="table-wrapper">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Recent Activities</h2>
            <button className="btn btn-primary">
              <i className="bi bi-plus-circle"></i> Add Activity
            </button>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Activity Type</th>
                  <th>Duration</th>
                  <th>Points</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <tr key={activity._id || activity.id}>
                      <td>
                        <strong>{getUserName(activity)}</strong>
                      </td>
                      <td>
                        <span className="badge bg-info">{activity.activity_type || activity.type || 'N/A'}</span>
                      </td>
                      <td>{activity.duration || 0} min</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          <i className="bi bi-trophy"></i> {activity.points || 0} pts
                        </span>
                      </td>
                      <td>{activity.date ? new Date(activity.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      }) : 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <p className="text-muted mb-0">No activities found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
