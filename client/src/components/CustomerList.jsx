function CustomerList({ customers }) {
  return (
    <div>
      {customers.map((customer) => (
        <div key={customer._id}>
          <p>{customer.name}</p>
          <p>{customer.email}</p>
        </div>
      ))}
    </div>
  );
}

export default CustomerList;
