import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="/octofit-logo.svg" alt="OctoFit Logo" className="octofit-logo" />
            OctoFit Tracker
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/activities">Activities</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">Teams</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">Workouts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={
          <div className="fade-in">
            <div className="page-header">
              <div className="container text-center">
                <h1 className="display-3 mb-3">Welcome to OctoFit Tracker</h1>
                <p className="lead">Track your fitness journey, compete with teams, and achieve your goals!</p>
              </div>
            </div>
            
            <div className="container mt-5 mb-5">
              <div className="row g-4">
                <div className="col-md-4">
                  <div className="card text-center h-100">
                    <div className="card-body">
                      <div className="mb-3">
                        <i className="bi bi-lightning-charge-fill" style={{fontSize: '3.5rem', color: '#4F46E5'}}></i>
                      </div>
                      <h5 className="card-title">Track Activities</h5>
                      <p className="card-text">Log your workouts and monitor your daily fitness activities like a superhero!</p>
                      <Link to="/activities" className="btn btn-primary">View Activities</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card text-center h-100">
                    <div className="card-body">
                      <div className="mb-3">
                        <i className="bi bi-trophy-fill" style={{fontSize: '3.5rem', color: '#F97316'}}></i>
                      </div>
                      <h5 className="card-title">Leaderboard</h5>
                      <p className="card-text">Compete with heroes and climb the rankings to legendary status</p>
                      <Link to="/leaderboard" className="btn btn-success">View Rankings</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card text-center h-100">
                    <div className="card-body">
                      <div className="mb-3">
                        <i className="bi bi-people-fill" style={{fontSize: '3.5rem', color: '#0D9488'}}></i>
                      </div>
                      <h5 className="card-title">Join Teams</h5>
                      <p className="card-text">Assemble your squad and achieve legendary goals together</p>
                      <Link to="/teams" className="btn btn-info">Browse Teams</Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="row mt-5">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0"><i className="bi bi-fire"></i> Personalized Workouts</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Get workout recommendations tailored to your fitness level and superhero goals</p>
                      <Link to="/workouts" className="btn btn-primary">Browse Workouts</Link>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0"><i className="bi bi-shield-fill-check"></i> Community</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">Connect with fitness heroes and share your legendary journey</p>
                      <Link to="/users" className="btn btn-primary">View Community</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        } />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
