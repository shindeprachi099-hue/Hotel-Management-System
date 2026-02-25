import React, { useState, useEffect } from "react";
import "./Customer.css";

function Customer() {
  const [customers, setCustomers] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hotelCustomers")) || [];
    setCustomers(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("hotelCustomers", JSON.stringify(customers));
  }, [customers]);

  const addCustomer = () => {
    if (!name || !phone || !district) {
      alert("Please fill all fields");
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      phone,
      district,
    };

    setCustomers([...customers, newCustomer]);
    setName("");
    setPhone("");
    setDistrict("");
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  return (
    <div className="customer-wrapper">
      <h1>👤 Customer Management</h1>

      {/* Form */}
      <div className="form-card">
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />

        <button onClick={addCustomer}>Add Customer</button>
      </div>

      {/* Table */}
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>District</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="5">No Customers Found</td>
            </tr>
          ) : (
            customers.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.district}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCustomer(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Customer;