import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", textAlign: "center" }}>
      <h1>Welcome, {username}!</h1>
      <p>You are successfully logged in.</p>
    </div>
  );
}

export default Dashboard;
