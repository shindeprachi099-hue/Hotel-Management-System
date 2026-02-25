import React, { useState, useEffect } from "react";
import "./Rooms.css";

function Rooms() {

  // 50 Rooms Create
  const initialRooms = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    status: "Available"
  }));

  const [rooms, setRooms] = useState(initialRooms);

  // Load booked rooms from localStorage (booking page connect)
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("hotelBookings")) || [];

    const updatedRooms = initialRooms.map(room => {
      const isBooked = savedBookings.some(
        booking => parseInt(booking.roomNumber) === room.id
      );
      return { ...room, status: isBooked ? "Booked" : "Available" };
    });

    setRooms(updatedRooms);
  }, []);

  const toggleRoom = (id) => {
    const updated = rooms.map(room =>
      room.id === id
        ? { ...room, status: room.status === "Available" ? "Booked" : "Available" }
        : room
    );
    setRooms(updated);
  };

  return (
    <div className="rooms-wrapper">
      <h1>🏨 Room Status (50 Rooms)</h1>

      <div className="room-grid">
        {rooms.map(room => (
          <div
            key={room.id}
            className={`room-card ${room.status === "Booked" ? "booked" : "available"}`}
            onClick={() => toggleRoom(room.id)}
          >
            Room {room.id}
            <span>{room.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;