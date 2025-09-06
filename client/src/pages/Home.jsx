import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to <span className="brand">EcomApp</span></h1>
        <p>
          Your simple shopping platform. Browse items, add to your cart,
          and enjoy a smooth shopping experience.
        </p>
        <div className="home-actions">
          <Link to="/register" className="btn btn-green">Get Started</Link>
          <Link to="/login" className="btn btn-blue">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
