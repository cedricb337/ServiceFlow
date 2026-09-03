import { useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL;

function CustomerForm({ onCustomerCreated }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [formError,setFormError] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null);
    setIsSubmitting(true)

  try {
    const response = await fetch(`${API_URL}/api/customers`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    const data = await response.json();
    

    if (!response.ok) {
      throw new Error(data.message);
    }

    onCustomerCreated(data);

    
    setName("");
    setEmail("");
  } catch (err) {
    setFormError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};
    return (
   <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
        />

        <input type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)} 
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating customer" : "Create Customer"};
        </button>

        {formError && <p>Error: {formError}</p>}

    </form>
    );
  
}

export default CustomerForm;