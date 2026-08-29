import { useEffect, useState } from 'react'
import './App.css'
import CustomerList from './components/CustomerList';

function App() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customers");

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

  fetchCustomers();
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
  </main>
);
}

export default App
