import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobList from './pages/JobList';
import CreateJob from './pages/CreateJob';
import './App.css';
function App() {
return (
<div className="app">
<Navbar />
<div className="content">
<Routes>
<Route path="/" element={<JobList />} />
<Route path="/create-job" element={<CreateJob />} />
</Routes>
</div>
</div>
);
}

export default App;
