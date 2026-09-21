import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function JobList({ jobs, onJobDeleted, onJobUpdated }) {
  const [editingJobId, setEditingJobId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState(null);

  const handleEdit = (job) => {
    setEditingJobId(job._id);
    setEditTitle(job.title);
    setEditDescription(job.description || "");
    setEditStatus(job.status);
    setEditError(null);
  };

  const handleCancel = () => {
    setEditingJobId(null);
    setEditError(null);
  };

  const handleSave = async (jobId) => {
    setEditError(null);

    if (editTitle.trim() === "") {
      setEditError("Please enter a title");
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle.trim(),
          description: editDescription.trim(),
          status: editStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      const updatedJob = await response.json();

      onJobUpdated(updatedJob);
      setEditingJobId(null);
    } catch (error) {
      setEditError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (jobs.length === 0) {
    return <p>No jobs found.</p>;
  }
  return (
    <ul>
      {jobs.map((job) => (
        <li key={job._id}>
          {editingJobId === job._id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button onClick={() => handleSave(job._id)} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
              </button>

              <button onClick={handleCancel} disabled={isSaving}>
                Cancel
              </button>

              {editError && <p>Error: {editError}</p>}

              <p>Customer: {job.customer.name}</p>
              <p>Email: {job.customer.email}</p>
            </>
          ) : (
            <>
              <h3>{job.title}</h3>
              <p>Status: {job.status}</p>
              <p>Customer: {job.customer.name}</p>
              <p>Email: {job.customer.email}</p>
              <p>{job.description}</p>
            </>
          )}

          <button onClick={() => onJobDeleted(job._id)} disabled={isSaving}>
            Delete
          </button>
          <button onClick={() => handleEdit(job)} disabled={isSaving}>
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
}

export default JobList;
