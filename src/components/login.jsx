import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin, redirectPath }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "user" && password === "password") {
      onLogin();
      navigate(redirectPath || "/");
    } else {
      alert("Erreur de connexion : login ou mot de passe incorrect");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="login" className="col-sm-2 col-form-label">
            Login
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="login"
              placeholder="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
