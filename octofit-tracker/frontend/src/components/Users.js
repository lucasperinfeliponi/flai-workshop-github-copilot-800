import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBaseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
        
        // Fetch teams first to create a mapping
        const teamsResponse = await fetch(`${apiBaseUrl}/teams/`);
        if (teamsResponse.ok) {
          const teamsData = await teamsResponse.json();
          const teamsArray = teamsData.results || teamsData;
          const teamsMap = {};
          teamsArray.forEach(team => {
            teamsMap[team._id] = team.name || 'Unknown Team';
          });
          setTeams(teamsMap);
        }
        
        // Fetch users
        const usersResponse = await fetch(`${apiBaseUrl}/users/`);
        if (!usersResponse.ok) {
          throw new Error(`HTTP error! status: ${usersResponse.status}`);
        }
        
        const usersData = await usersResponse.json();
        const usersArray = usersData.results || usersData;
        
        setUsers(Array.isArray(usersArray) ? usersArray : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTeamName = (user) => {
    if (!user.team_id) return 'No Team';
    return teams[user.team_id] || user.team_id;
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
          <h4 className="alert-heading">Error Loading Users</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="display-4">Users</h1>
          <p className="lead mb-0">Community members and their fitness profiles</p>
        </div>
      </div>
      
      <div className="container mb-5">
        <div className="table-wrapper">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">All Users</h2>
            <button className="btn btn-primary">
              <i className="bi bi-person-plus"></i> Add User
            </button>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Team</th>
                  <th>Total Points</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id || user.id}>
                      <td>
                        <strong>{user.name || user.username || 'Unknown'}</strong>
                      </td>
                      <td>{user.email || <span className="text-muted">N/A</span>}</td>
                      <td>
                        {user.team_id ? (
                          <span className="badge bg-info">{getTeamName(user)}</span>
                        ) : (
                          <span className="text-muted">No Team</span>
                        )}
                      </td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          <i className="bi bi-trophy"></i> {user.total_points || 0} pts
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <p className="text-muted mb-0">No users found</p>
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

export default Users;
