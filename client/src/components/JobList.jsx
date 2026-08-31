function JobList({ jobs }) {
  return (
    <ul>
      {jobs.map((job) => (
        <li key={job._id}>
          <h3>{job.title}</h3>
          <p>Status: {job.status}</p>
          <p>{job.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default JobList;