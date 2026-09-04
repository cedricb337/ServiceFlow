function CustomerList({ customers, onCustomerDeleted }) {
  if (customers.length === 0) {
    return <p>No customers found.</p>;
  }
  return (
    <div>
      {customers.map((customer) => (
        <div key={customer._id}>
          <p>{customer.name}</p>
          <p>{customer.email}</p>
          <button type="button"
           onClick={() => onCustomerDeleted(customer._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default CustomerList;
