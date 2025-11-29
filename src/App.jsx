import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/home";
import Login from "./components/login";
import Contact from "./components/contact";
import AddChampion from "./components/addChampion";
import ListChampions from "./components/listChampions";
import "bootstrap/dist/css/bootstrap.min.css";

// Composant racine avec NavBar
function Root({ isAuthenticated, onLogout }) {
  return (
    <div>
      <NavBar isAuthenticated={isAuthenticated} onLogout={onLogout} />
      <div className="container mt-4">
        <Outlet /> {/* Les pages s'affichent ici */}
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Root isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      ),
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/login",
          element: <Login onLogin={handleLogin} redirectPath="/" />,
        },
        { path: "/contact", element: <Contact /> },
        {
          path: "/add",
          element: isAuthenticated ? <AddChampion /> : <Navigate to="/login" />,
        },
        { path: "/champions", element: <ListChampions /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
