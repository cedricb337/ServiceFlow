import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function JobForm({ customers, onJobCreated }) {
  const [customerId, setCustomerId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (customerId === "") {
      setError("Please select a customer");
      return;
    }

    if (title.trim() === "") {
      setError("Please enter a title");
      return;
    }

    try {
      setError(null);
      setIsSubmitting(true);

      const response = await fetch(`${API_URL}/api/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: customerId,
          title: title.trim(),
          description: description.trim(),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create job");
      }

      onJobCreated(data);

      setCustomerId("");
      setTitle("");
      setDescription("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>Error: {error}</p>}
      <select
        value={customerId}
        onChange={(event) => setCustomerId(event.target.value)}
      >
        <option value="">Select a customer</option>
        {customers.map((customer) => (
          <option key={customer._id} value={customer._id}>
            {customer.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Job title"
      />

      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Job description"
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Job"}
      </button>
    </form>
  );
}

export default JobForm;
