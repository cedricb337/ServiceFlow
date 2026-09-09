import { useState } from "react";

function CustomerList({ customers, onCustomerDeleted, onCustomerUpdated }) {
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editError, setEditError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (customer) => {
    setEditCustomerId(customer._id);
    setEditName(customer.name);
    setEditEmail(customer.email);
  };

  const handleCancel = () => {
    setEditCustomerId(null);
  }

  const handleSave = async () => {
    if (editName.trim() === "") {
      setEditError("Name is required");
      return;
    }

    if (editEmail.trim() === "") {
      setEditError("Email is required");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(editEmail.trim())) {
      setEditError("Email format is invalid");
      return;
    }

    setIsSaving(true);
    
  try {
    setEditError(null);

    await onCustomerUpdated(editCustomerId, editName, editEmail);

    setEditCustomerId(null);
  } catch (error) {
    setEditError(error.message);
  } finally {
    setIsSaving(false);
  }
};

  if (customers.length === 0) {
    return <p>No customers found.</p>;
  }

  return (
    <div>
      {customers.map((customer) => (
        <div key={customer._id}>
          {editCustomerId === customer._id ? (
            <>
              <input
                type="text"
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
              />

              <input
                type="email"
                value={editEmail}
                onChange={(event) => setEditEmail(event.target.value)}
              />


              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                >
                  Cancel
                </button>

                {editError && <p>Error: {editError}</p>}
            </>
          ) : (
            <>
              <p>{customer.name}</p>
              <p>{customer.email}</p>
            </>
          )}

          <button
            type="button"
            onClick={() => onCustomerDeleted(customer._id)}
          >
            Delete
          </button>

          <button
            type="button"
            onClick={() => handleEdit(customer)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default CustomerList;