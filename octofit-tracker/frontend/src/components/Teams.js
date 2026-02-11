import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Processed teams data:', teamsData);
        
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

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
          <h4 className="alert-heading">Error Loading Teams</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="display-4">Teams</h1>
          <p className="lead mb-0">Join a team and compete together</p>
        </div>
      </div>
      
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 mb-0">All Teams</h2>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle"></i> Create Team
          </button>
        </div>
        
        <div className="row">
          {teams.length > 0 ? (
            teams.map((team) => (
              <div key={team._id || team.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="mb-0">{team.name}</h5>
                  </div>
                  <div className="card-body">
                    {team.total_points !== undefined && (
                      <p className="mb-0">
                        <span className="badge bg-warning text-dark">
                          <i className="bi bi-trophy"></i> {team.total_points} points
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="card-footer bg-transparent">
                    <div className="mt-2">
                      <button className="btn btn-sm btn-outline-primary me-2">View Details</button>
                      <button className="btn btn-sm btn-success">Join Team</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info text-center" role="alert">
                <h4 className="alert-heading">No Teams Yet</h4>
                <p>Be the first to create a team and start competing!</p>
                <button className="btn btn-primary mt-2">
                  <i className="bi bi-plus-circle"></i> Create First Team
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
