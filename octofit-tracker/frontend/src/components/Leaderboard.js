import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Processed leaderboard data:', leaderboardData);
        
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
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
          <h4 className="alert-heading">Error Loading Leaderboard</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getRankBadgeClass = (index) => {
    if (index === 0) return 'rank-badge rank-1';
    if (index === 1) return 'rank-badge rank-2';
    if (index === 2) return 'rank-badge rank-3';
    return 'rank-badge rank-other';
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="display-4">Leaderboard</h1>
          <p className="lead mb-0">Top performers and team standings</p>
        </div>
      </div>
      
      <div className="container mb-5">
        <div className="table-wrapper">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 mb-0">Rankings</h2>
            <div>
              <button className="btn btn-outline-primary me-2">This Week</button>
              <button className="btn btn-primary">All Time</button>
            </div>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th style={{width: '80px'}}>Rank</th>
                  <th>User</th>
                  <th>Total Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => (
                    <tr key={entry._id || entry.id}>
                      <td>
                        <span className={getRankBadgeClass(index)}>
                          {index + 1}
                        </span>
                      </td>
                      <td>
                        <strong>{entry.entity_name || entry.user_name || entry.name || 'Unknown'}</strong>
                      </td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          <i className="bi bi-trophy"></i> {entry.total_points} pts
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-5">
                      <p className="text-muted mb-0">No leaderboard data found</p>
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

export default Leaderboard;
