function JobList({ jobs, onJobDeleted }) {
  if (jobs.length === 0) {
    return <p>No jobs found.</p>;
  }
  return (
    <ul>
      {jobs.map((job) => (
        <li key={job._id}>
          <h3>{job.title}</h3>
          <p>Status: {job.status}</p>
          <p>Customer: {job.customer.name}</p>
          <p>Email: {job.customer.email}</p>
          <p>{job.description}</p>

          <button onClick={() => onJobDeleted(job._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default JobList;
