import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Processed workouts data:', workoutsData);
        
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
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
          <h4 className="alert-heading">Error Loading Workouts</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (level) => {
    const badges = {
      'Beginner': 'bg-success',
      'beginner': 'bg-success',
      'Intermediate': 'bg-warning text-dark',
      'intermediate': 'bg-warning text-dark',
      'Advanced': 'bg-danger',
      'advanced': 'bg-danger',
      'easy': 'bg-success',
      'medium': 'bg-warning text-dark',
      'hard': 'bg-danger'
    };
    return badges[level] || 'bg-secondary';
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="container">
          <h1 className="display-4">Workouts</h1>
          <p className="lead mb-0">Personalized workout plans and suggestions</p>
        </div>
      </div>
      
      <div className="container mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 mb-0">Available Workouts</h2>
          <div>
            <button className="btn btn-outline-primary me-2">Filter</button>
            <button className="btn btn-primary">
              <i className="bi bi-plus-circle"></i> Create Workout
            </button>
          </div>
        </div>
        
        <div className="row">
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <div key={workout._id || workout.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="mb-0">{workout.name}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{workout.description || 'No description available'}</p>
                    <hr />
                    {workout.category && (
                      <div className="mb-2">
                        <strong>Category:</strong>{' '}
                        <span className="badge bg-primary">
                          {workout.category}
                        </span>
                      </div>
                    )}
                    {workout.difficulty && (
                      <div className="mb-2">
                        <strong>Difficulty:</strong>{' '}
                        <span className={`badge ${getDifficultyBadge(workout.difficulty)}`}>
                          {workout.difficulty}
                        </span>
                      </div>
                    )}
                    {workout.estimated_duration && (
                      <div className="mb-2">
                        <strong>Duration:</strong>{' '}
                        <span className="badge bg-info">
                          <i className="bi bi-clock"></i> {workout.estimated_duration} min
                        </span>
                      </div>
                    )}
                    {workout.points_per_session !== undefined && (
                      <div className="mb-2">
                        <strong>Points:</strong>{' '}
                        <span className="badge bg-warning text-dark">
                          <i className="bi bi-trophy"></i> {workout.points_per_session} pts
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="card-footer bg-transparent">
                    <button className="btn btn-sm btn-outline-primary me-2">View Details</button>
                    <button className="btn btn-sm btn-success">Start Workout</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="alert alert-info text-center" role="alert">
                <h4 className="alert-heading">No Workouts Available</h4>
                <p>Start by creating your first workout plan!</p>
                <button className="btn btn-primary mt-2">
                  <i className="bi bi-plus-circle"></i> Create First Workout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
