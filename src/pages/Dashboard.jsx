import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-wrapper">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Leo's Hotel🏨__ </div>

        <ul className="nav-links">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
          <li><Link to="/customers">Customers</Link></li>
        </ul>

        <div className="nav-right">
         <span className="user-name">{user.name}</span>
          <span className="user-email">{user.email} </span>
          <button onClick={handleLogout} className="logout-btn"> Logout </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="dashboard-content">
        <h1>Welcome {user.user} 👋</h1>

        <div className="card-container">
          <div className="card">
            <h3>Total Rooms</h3>
            <p>50</p>
          </div>

          <div className="card">
            <h3>Available Rooms</h3>
            <p>50</p>
          </div>

          <div className="card">
            <h3>Total Bookings</h3>
            <p>0</p>
          </div>

          <div className="card">
            <h3>Total Customers</h3>
            <p>0</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;