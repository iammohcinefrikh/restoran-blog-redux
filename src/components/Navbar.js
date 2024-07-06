import { Link } from "react-router-dom";
import navbarLogo from "../assets/images/navbarLogo.svg";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-elements">
        <img alt="Logo" src={navbarLogo} className="navbar-logo"></img>
        <Link to="/" className="navbar-link">Accueil</Link>
        <Link to="/ajouter-article" className="navbar-link">Publier</Link>
        <Link to="/a-propos" className="navbar-link">À propos</Link>
      </div>
    </nav>
  )
}

export default Navbar;