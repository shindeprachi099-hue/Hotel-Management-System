import React, { useState, useEffect } from "react";
import "./Bookings.css";

function Booking() {
  const [bookings, setBookings] = useState([]);

  const [name, setName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [payment, setPayment] = useState("Pending");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("hotelBookings")) || [];
    setBookings(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("hotelBookings", JSON.stringify(bookings));
  }, [bookings]);

  const calculateDays = (inDate, outDate) => {
    const start = new Date(inDate);
    const end = new Date(outDate);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const getRoomPrice = (type) => {
    if (type === "Standard") return 1000;
    if (type === "Deluxe") return 2000;
    if (type === "Suite") return 3000;
    return 0;
  };

  const addBooking = () => {
    if (!name || !roomType || !checkIn || !checkOut) {
      alert("Fill all fields");
      return;
    }

    const days = calculateDays(checkIn, checkOut);
    const price = getRoomPrice(roomType);
    const amount = days * price;
    const gst = amount * 0.18;
    const finalAmount = amount + gst;

    const newBooking = {
      id: Date.now(),
      name,
      roomType,
      checkIn,
      checkOut,
      days,
      amount,
      gst,
      finalAmount,
      payment,
    };

    setBookings([...bookings, newBooking]);

    setName("");
    setRoomType("");
    setCheckIn("");
    setCheckOut("");
  };

  const deleteBooking = (id) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  return (
    <div className="booking-container">
      <h1>🏨 Booking Management</h1>

      {/* Booking Form */}
      <div className="form-card">
        <input
          type="text"
          placeholder="Guest Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option value="">Select Room Type</option>
          <option value="Standard">Standard - ₹1000/day</option>
          <option value="Deluxe">Deluxe - ₹2000/day</option>
          <option value="Suite">Suite - ₹3000/day</option>
        </select>

        <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />

        <select value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="Pending">Payment Pending</option>
          <option value="Paid">Payment Paid</option>
        </select>

        <button onClick={addBooking}>Add Booking</button>
      </div>

      {/* Booking Table */}
      <table className="booking-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Room</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Days</th>
            <th>Amount</th>
            <th>GST (18%)</th>
            <th>Final</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="10">No Bookings Found</td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.roomType}</td>
                <td>{b.checkIn}</td>
                <td>{b.checkOut}</td>
                <td>{b.days}</td>
                <td>₹{b.amount}</td>
                <td>₹{b.gst.toFixed(2)}</td>
                <td>₹{b.finalAmount.toFixed(2)}</td>
                <td>{b.payment}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteBooking(b.id)}
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

export default Booking;