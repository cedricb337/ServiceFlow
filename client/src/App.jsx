import { useEffect, useState } from 'react'
import './App.css'
import CustomerList from './components/CustomerList';
import JobList from './components/JobList';
import CustomerForm from './components/CustomerForm';

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [customers, setCustomers] = useState([]);
  const [customersLoading, setCustomersLoading] = useState(true);
  const [customersError, setCustomersError] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);
  const [jobsError, setJobsError] = useState(null);

  const handleCustomerCreated = (newCustomer) => {
    setCustomers((previousCustomers) => [
      ...previousCustomers,
      newCustomer,
    ])
};

  const handleCustomerDeleted = async (customerId) => {
  const response = await fetch(`${API_URL}/api/customers/${customerId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete customer");
  }

  setCustomers((prev) =>
  prev.filter((customer) => customer._id !== customerId)
);
};

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
      setCustomersError(err.message);
    } finally {
      setCustomersLoading(false);
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
  <>
    <header>
      <h1>ServiceFlow</h1>
    </header>

    <main>
      <section>
        {customersLoading && <p>Loading customers...</p>}

        {customersError && <p>Error: {customersError}</p>}

        {!customersLoading && !customersError && (
          <>
            <h2>Customers</h2>
            <CustomerForm onCustomerCreated={handleCustomerCreated} />
            <CustomerList customers={customers} onCustomerDeleted={handleCustomerDeleted}/>
          </>
        )}
      </section>

      <section>
        {jobsLoading && <p>Loading jobs...</p>}

        {jobsError && <p>Error: {jobsError}</p>}

        {!jobsLoading && !jobsError && (
          <>
            <h2>Jobs</h2>
            <JobList jobs={jobs} />
          </>
        )}
      </section>
    </main>
  </>
);
}

export default App;
