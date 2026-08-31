import { useEffect, useState } from 'react'
import './App.css'
import CustomerList from './components/CustomerList';
import JobList from './components/JobList';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState(null);

  useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/customers`);

      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const data = await response.json();

      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
  try {
    const response = await fetch(`${API_URL}/api/jobs`);

    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await response.json();

    setJobs(data);
  } catch (err) {
    setJobsError(err.message);
  } finally {
    setJobsLoading(false);
  }
};

  fetchCustomers();
  fetchJobs();
}, []);

  return (
  <main>
    <h1>ServiceFlow</h1>

    {loading && <p>Loading customers...</p>}

    {error && <p>Error: {error}</p>}

    {!loading && !error && (
      <>
        <h2>Customers</h2>
        <CustomerList customers={customers} />        
      </>
    )}

    {jobsLoading && <p>Loading jobs...</p>}

    {jobsError && <p>Error: {jobsError}</p>}

    {!jobsLoading && !jobsError && (
      <>
        <h2>Jobs</h2>
        <JobList jobs={jobs} />
      </>
)}
  </main>
);
}

export default App
